import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import axios from 'axios'
export async function map(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const response = await axios.get(`https://api.brawlapi.com/v1/maps/${request.params.id}`, {
      headers: { 'Cache-Control': 'max-age=600' }
    })
    console.log(response.status)

    // Assuming the response should be returned in the success case
    return { jsonBody: response.data }
  } catch (error) {
    // Log the error for debugging purposes
    context.error(`Error fetching map: ${error.message}`)

    // Return an appropriate error response with a string body
    return {
      status: 500, // Internal Server Error
      jsonBody: { error: 'Internal Server Error' }
    }
  }
}

app.http('map', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'maps/{id}',
  handler: map
})
