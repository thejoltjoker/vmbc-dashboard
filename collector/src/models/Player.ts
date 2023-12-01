import mongoose, { Schema, Document } from "mongoose";

interface PlayerBrawler {
  id: number;
  name: string;
  power: number;
  rank: number;
  trophies: number;
  highestTrophies: number;
  gears: {
    id: number;
    name: string;
    level: number;
  }[];
  starPowers: {
    id: number;
    name: string;
  }[];
  gadgets: {
    id: number;
    name: string;
  }[];
}

interface Player extends Document {
  tag: string;
  name: string;
  nameColor: string;
  icon: {
    id: number;
  };
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  expPoints: number;
  isQualifiedFromChampionshipChallenge: boolean;
  "3vs3Victories": number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  club: {
    tag: string;
    name: string;
  };
  brawlers: PlayerBrawler[];
}

const playerBrawlerSchema: Schema<PlayerBrawler> = new Schema({
  id: Number,
  name: String,
  power: Number,
  rank: Number,
  trophies: Number,
  highestTrophies: Number,
  gears: [
    {
      id: Number,
      name: String,
      level: Number,
    },
  ],
  starPowers: [
    {
      id: Number,
      name: String,
    },
  ],
  gadgets: [
    {
      id: Number,
      name: String,
    },
  ],
});

const playerSchema: Schema<Player> = new Schema({
  _id: String,
  tag: String,
  name: String,
  nameColor: String,
  icon: {
    id: Number,
  },
  trophies: Number,
  highestTrophies: Number,
  expLevel: Number,
  expPoints: Number,
  isQualifiedFromChampionshipChallenge: Boolean,
  "3vs3Victories": Number,
  soloVictories: Number,
  duoVictories: Number,
  bestRoboRumbleTime: Number,
  bestTimeAsBigBrawler: Number,
  club: {
    tag: String,
    name: String,
  },
  brawlers: [playerBrawlerSchema],
});

const PlayerModel = mongoose.model<Player>("Player", playerSchema);

export { Player, PlayerModel };
