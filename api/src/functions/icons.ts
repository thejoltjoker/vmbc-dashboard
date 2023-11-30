import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

export async function icons(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: "https://api.brawlapi.com/v1/icons",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  return { jsonBody: response.data };
}

app.http("icons", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: icons,
});
