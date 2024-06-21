import {ObjectId} from 'mongodb'
import databaseService from '~/services/database.service'

class ConversationService {
  async getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        {sender_id: new ObjectId(sender_id), receiver_id: new ObjectId(receiver_id)},
        {sender_id: new ObjectId(receiver_id), receiver_id: new ObjectId(sender_id)}
      ]
    }
    const [conversations, totals] = await Promise.all([
      databaseService.conversations
        .find(match)
        .sort({created_at: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseService.conversations.countDocuments(match)
    ])
    return {conversations, totals}
  }
}

const conversationService = new ConversationService()
export default conversationService
