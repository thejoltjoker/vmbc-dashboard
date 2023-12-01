import mongoose, { Schema, Document } from "mongoose";

interface Battle extends Document {
  playerTag: string;
  battleLogId: string;
  brawlerId: string;
  eventId: string;
  clubMatch: boolean;
  win: boolean;
  starPlayer: boolean;
}

const battleSchema: Schema<Battle> = new Schema({
  _id: String,
  playerTag: { type: String, required: true },
  battleLogId: { type: String, required: true },
  brawlerId: { type: String, required: true },
  eventId: { type: String, required: true },
  clubMatch: { type: Boolean, required: true },
  win: { type: Boolean, required: true },
  starPlayer: { type: Boolean, required: true },
});

const BattleModel = mongoose.model("Battle", battleSchema);

export { Battle, BattleModel };
