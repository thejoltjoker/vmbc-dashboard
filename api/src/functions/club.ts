import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios, { AxiosResponse } from "axios";

export async function club(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${process.env.API_KEY}`,
    };

    const reqOptions = {
      url: "https://api.brawlstars.com/v1/clubs/%23289VC0U29",
      method: "GET",
      headers: headersList,
    };

    const response: AxiosResponse = await axios.request(reqOptions);

    // Assuming you want to handle specific HTTP status codes as errors, you can customize this check.
    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return { jsonBody: response.data };
  } catch (error) {
    // Handle the error appropriately, you can log it, throw a custom error, or perform any other necessary actions.
    console.error("Error during API request:", error.message);
    return { body: error.message };
  }
}

app.http("club", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: club,
});
