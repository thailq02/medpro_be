import {Server as ServerHttp} from 'http'
import {ObjectId} from 'mongodb'
import {Server} from 'socket.io'
import {envConfig} from '~/constants/config'
import {UserVerifyStatus} from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import Conversation from '~/models/schemas/Conversation.schema'
import conversationService from '~/services/conversations.service'
import databaseService from '~/services/database.service'
import {verifyAccessToken} from '~/utils/common'
import {TokenPayload} from '~/utils/jwt'

interface IConversationBody {
  sender_id: string
  receiver_id: string
  content: string
  imgUrl: string
}

const emitOnlineUsers = (io: Server, onlineUser: Map<string, {last_online: Date | null}>) => {
  io.emit(
    'online_users',
    Array.from(onlineUser.entries()).map(([user_id, {last_online}]) => ({
      user_id,
      last_online
    }))
  )
}

export const initSocket = (httpServer: ServerHttp) => {
  const io = new Server(httpServer, {
    cors: {origin: envConfig.clientUrl, credentials: true}
  })

  const users: {
    [key: string]: {
      socket_id: string
    }
  } = {}
  const onlineUser = new Map<string, {last_online: Date | null}>()

  io.use(async (socket, next) => {
    const {Authorization} = socket.handshake.auth
    const access_token = Authorization?.split(' ')[1]
    try {
      const decoded_authorization = await verifyAccessToken(access_token)
      const {verify} = decoded_authorization as TokenPayload
      if (verify !== UserVerifyStatus.Verified) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGE.USER_NOT_VERIFIED,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      socket.handshake.auth.decoded_authorization = decoded_authorization
      socket.handshake.auth.access_token = access_token
      next()
    } catch (error) {
      next({
        message: 'Unauthorized',
        name: 'UnauthorizedError',
        data: error
      })
    }
  })

  io.on('connection', (socket) => {
    const {user_id} = socket.handshake.auth.decoded_authorization as TokenPayload
    if (user_id) {
      users[user_id] = {
        socket_id: socket.id
      }

      socket.join(user_id)
      onlineUser.set(user_id, {last_online: null})
      emitOnlineUsers(io, onlineUser)

      socket.use(async (_, next) => {
        const {access_token} = socket.handshake.auth
        try {
          await verifyAccessToken(access_token)
          next()
        } catch (error) {
          next(new Error('Unauthorized'))
        }
      })

      socket.on('error', (error) => {
        if (error.message === 'Unauthorized') {
          socket.disconnect()
        }
      })

      socket.on('send_message', async (data: {payload: IConversationBody}) => {
        const {receiver_id, sender_id, content, imgUrl} = data.payload
        const receiver_socket_id = users[receiver_id]?.socket_id
        const conversation = new Conversation({
          sender_id: new ObjectId(sender_id),
          receiver_id: new ObjectId(receiver_id),
          content: content.trim(),
          imgUrl
        })
        const result = await databaseService.conversations.insertOne(conversation)
        conversation._id = result.insertedId
        if (receiver_socket_id) {
          socket.to(receiver_socket_id).emit('receive_message', {
            payload: conversation
          })
        }
        //send conversation
        const [conversationSender, conversationReceiver] = await Promise.all([
          conversationService.getConversationsWithSocket(sender_id),
          conversationService.getConversationsWithSocket(receiver_id)
        ])
        io.to(sender_id).emit('conversation', conversationSender)
        io.to(receiver_id).emit('conversation', conversationReceiver)
      })
    }

    socket.on('sidebar', async (currentUserId: string) => {
      const conversation = await conversationService.getConversationsWithSocket(currentUserId)
      socket.emit('conversation', conversation)
      emitOnlineUsers(io, onlineUser)
    })

    socket.on('disconnect', () => {
      delete users[user_id]
      onlineUser.delete(user_id)
      onlineUser.set(user_id, {last_online: new Date()})
      emitOnlineUsers(io, onlineUser)
    })
  })
}
