import "dotenv/config";
import cron from "node-cron";
import axios from "axios";
import mongoose from "mongoose";
import ClubModel from "./src/models/Club";

// Log the external IP address to determine Brawl Stars api key
axios
  .get("https://api.ipify.me")
  .then((response) => console.log("IP address:", response.data))
  .catch((error) => {
    console.error("Error retrieving external IP address:", error.message);
  });

// Run every 15 minutes
// cron.schedule("* * * * *", async () => {
const start = async () => {
  try {
    // Define your MongoDB connection URL
    const mongoURL = process.env.MONGO_URL as string;

    // Connect to MongoDB
    console.log("Connecting to DB");
    await mongoose.connect(mongoURL);

    // Get club data
    const response = await axios.get(
      "https://api.brawlstars.com/v1/clubs/%23289VC0U29",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    );

    const data = response.data;

    // Store data in MongoDB
    console.log(`Storing club ${data.name}(${data.tag})`);
    await ClubModel.updateOne({ _id: data.tag }, data, { upsert: true });
    console.log("Club stored successfully.");
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    // Disconnect from MongoDB after operations
    console.log("Disconnecting from DB");
    mongoose.disconnect();
  }
  // });
};
start();
