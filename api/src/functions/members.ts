import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'
import Member from '../models/member.model'
export async function members(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string
    await mongoose.connect(mongoURL)

    // Store data in MongoDB
    const response = await Member.find()

    await mongoose.disconnect()

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

app.http('members', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: members
})
