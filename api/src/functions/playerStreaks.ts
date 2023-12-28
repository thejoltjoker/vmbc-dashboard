import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'
import BattleModel from '../models/battle.model'

interface Streaks {
  win: {
    current: number
    best: number
  }
  starPlayer: {
    current: number
    best: number
  }
}

export async function playerWinStreak(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string
    const tag = request.params.tag
    await mongoose.connect(mongoURL)
    const promises = []
    // Current win streak and star player streak
    promises.push(BattleModel.findOne({ playerTag: tag }).sort({ battleTime: -1 }).limit(1))
    // Best win streak
    promises.push(BattleModel.findOne({ playerTag: tag }).sort({ winStreak: -1 }).limit(1))
    // Current win streak
    promises.push(BattleModel.findOne({ playerTag: tag }).sort({ starPlayerStreak: -1 }).limit(1))
    const documents = await Promise.all(promises)
    context.log(documents)
    const data = {}

    return { jsonBody: documents }
  } catch (error) {
    // Log the error for debugging purposes
    context.error(`Error fetching data: ${error.message}`)

    // Return an appropriate error response with a string body
    return {
      status: 500, // Internal Server Error
      jsonBody: { error: 'Internal Server Error' }
    }
  }
}

app.http('playerStreaks', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'player/{tag}/streaks',
  handler: playerWinStreak
})
