import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'
import Club from '../models/club.model'
export async function club(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string
    await mongoose.connect(mongoURL)

    // Store data in MongoDB
    const response = await Club.findOne()

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

app.http('club', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: club
})
