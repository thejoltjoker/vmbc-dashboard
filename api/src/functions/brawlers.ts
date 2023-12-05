import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import axios from 'axios'
export async function brawlers(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const response = await axios.get('https://api.brawlapi.com/v1/brawlers', {
      headers: { 'Cache-Control': 'max-age=600' }
    })

    // Assuming the response should be returned in the success case
    return { jsonBody: response.data.list }
  } catch (error) {
    // Log the error for debugging purposes
    context.error(`Error fetching brawlers: ${error.message}`)

    // Return an appropriate error response with a string body
    return {
      status: 500, // Internal Server Error
      jsonBody: { error: 'Internal Server Error' }
    }
  }
}

app.http('brawlers', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: brawlers
})
