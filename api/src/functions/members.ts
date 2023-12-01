import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import mongoose from "mongoose";
import { MemberModel, Member } from "../models/Member";

export async function members(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const mongoURL = process.env.MONGO_URL as string;
  await mongoose.connect(mongoURL);
  let response = [];
  try {
    response = await MemberModel.find();
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    mongoose.disconnect();
    return { jsonBody: response };
  }
}

app.http("members", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: members,
});
