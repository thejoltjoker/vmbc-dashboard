import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'
import Battle from '../models/battle.model'
export async function playerBrawlers(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string
    await mongoose.connect(mongoURL)

    // Store data in MongoDB
    const pipeline = [
      {
        $match: {
          playerTag: request.params.tag
        }
      },
      {
        $group: {
          _id: '$brawlerId',
          totalWins: {
            $sum: {
              $cond: ['$win', 1, 0]
            }
          },
          totalBattles: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          brawlerId: '$_id',
          winRate: {
            $divide: ['$totalWins', '$totalBattles']
          }
        }
      }
    ]
    const response = await Battle.aggregate(pipeline)

    return { jsonBody: response }
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

app.http('playerBrawlers', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'player/{tag}/brawlers',
  handler: playerBrawlers
})
