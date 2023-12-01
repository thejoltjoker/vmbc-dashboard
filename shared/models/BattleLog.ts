interface Team extends Array<Player> {}
import mongoose, { Schema, Document, Model } from "mongoose";

interface Brawler {
  id: number;
  name: string;
  power: number;
  trophies: number;
}

interface Player {
  tag: string;
  name: string;
  brawler?: Brawler;
  brawlers?: Brawler[];
}

interface Event {
  id: number;
  mode: string;
  map: string;
}

interface Battle {
  mode: string;
  type: string;
  rank?: number;
  result?: string;
  duration?: number;
  trophyChange?: number;
  starPlayer?: Player;
  teams?: Team[];
  players?: Player[];
}

interface BattleLog extends Document {
  battleTime: Date | string;
  event: Event;
  battle: Battle;
}

const battleLogSchema: Schema<BattleLog> = new Schema({
  _id: Number,
  battleTime: { type: Date, required: true },
  event: { type: Object, required: true },
  battle: { type: Object, required: true },
});

const BattleLogModel: Model<BattleLog> = mongoose.model<BattleLog>(
  "BattleLog",
  battleLogSchema,
);

export { BattleLog, BattleLogModel };
