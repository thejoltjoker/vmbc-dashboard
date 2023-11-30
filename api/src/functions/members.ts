import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

export async function members(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };

  let reqOptions = {
    url: "https://api.brawlstars.com/v1/clubs/%23289VC0U29/members",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  return { jsonBody: response.data };
}

app.http("members", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: members,
});