import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import mongoose from "mongoose";
import { ClubModel, Club } from "../models/Club";

export async function club(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const mongoURL = process.env.MONGO_URL as string;
    await mongoose.connect(mongoURL);
    // Store data in MongoDB

    const response = await ClubModel.findOne();

    return { jsonBody: response };
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
