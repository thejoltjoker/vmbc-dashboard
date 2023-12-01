import "dotenv/config";
import cron from "node-cron";
import axios from "axios";
import mongoose from "mongoose";
import { ClubModel, Club } from "./src/models/Club";
import { PlayerModel, Player } from "./src/models/Player";

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
    const clubData: Club = await getClub();

    // Store data in MongoDB
    console.log(`Storing club ${clubData.name}(${clubData.tag})`);
    await ClubModel.updateOne({ _id: clubData.tag }, clubData, {
      upsert: true,
    });

    console.log("Club stored successfully.");

    // Delete all non club players
    const allPlayers = await PlayerModel.find();
    const memberTags = clubData.members.map((member) => member.tag);
    console.log(`Deleting non member players`);
    await PlayerModel.deleteMany({
      tag: {
        $nin: memberTags,
      },
    });

    for (const member of clubData.members) {
      const player: Player = await getPlayer(member.tag);

      console.log(`Storing player ${player.name}(${player.tag})`);
      await PlayerModel.updateOne({ _id: player.tag }, player, {
        upsert: true,
      });
      console.log("Player stored successfully.");
    }
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

async function getClub(): Promise<Club> {
  const response = await axios.get(
    "https://api.brawlstars.com/v1/clubs/%23289VC0U29",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );

  const data = response.data;
  return data;
}

async function getPlayer(tag: string): Promise<Player> {
  const response = await axios.get(
    `https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );

  const data = response.data;
  return data;
}

// Iterate over each club member
// Update player
// Get battle logs
// for each battle log create player battle
