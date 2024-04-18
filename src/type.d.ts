import User from '~/models/schemas/User.schema'
import {Request} from 'express'
import {TokenPayload} from '~/models/request/User.requests'

declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
  }
}
