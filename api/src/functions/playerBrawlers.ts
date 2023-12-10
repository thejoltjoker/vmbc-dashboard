import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'
import Player from '../models/player.model'
export async function playerBrawlers(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string
    await mongoose.connect(mongoURL)

    // Store data in MongoDB
    const response = await Player.findOne({ tag: request.params.tag })

    // YourModel.aggregate([
    //     {
    //       $match: {
    //         playerTag: '#Y8JLQYRQP'
    //       }
    //     },
    //     {
    //       $group: {
    //         _id: '$brawlerId',
    //         totalWins: {
    //           $sum: {
    //             $cond: ['$win', 1, 0]
    //           }
    //         },
    //         totalBattles: {
    //           $sum: 1
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         brawlerId: '$_id',
    //         winRate: {
    //           $divide: ['$totalWins', '$totalBattles']
    //         }
    //       }
    //     }
    //   ], (err, result) => {
    //     if (err) {
    //       console.error(err);
    //       // Handle error
    //     } else {
    //       console.log(result);
    //       // Process the result
    //     }
    //   });

    // await mongoose.disconnect()
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
