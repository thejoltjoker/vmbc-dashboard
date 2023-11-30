import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

export async function player(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
  const tag = request.params.tag;
  let reqOptions = {
    url: `https://api.brawlstars.com/v1/players/%23${tag}`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  return { jsonBody: response.data };
}

app.http("player", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "player/{tag}",
  handler: player,
});
