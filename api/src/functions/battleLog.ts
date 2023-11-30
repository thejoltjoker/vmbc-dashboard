import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";
export async function battleLog(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
  const tag = request.params.tag;
  let reqOptions = {
    url: `https://api.brawlstars.com/v1/players/${encodeURIComponent(
      tag,
    )}/battlelog`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  return { jsonBody: response.data };
}

app.http("battleLog", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "player/{tag}/battles",
  handler: battleLog,
});
