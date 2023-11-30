import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

const getMembers = async () => {
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
  return response.data;
};

const getPlayer = async (tag) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
  const url = `https://api.brawlstars.com/v1/players/${encodeURIComponent(
    tag,
  )}`;
  
  let reqOptions = {
    url: url,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  return response.data;
};

export async function members(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  //   const members = await getMembers();
  //   const playerTags = members.items.map((member) => member.tag);

  //   const promises = await playerTags.map((tag: string) => getPlayer(tag));
  //   const response = await Promise.all(promises);
  //   console.log(response);
  const response = await getMembers();

  return { jsonBody: response };
}

app.http("members", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: members,
});
