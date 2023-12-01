import { Schema, Document } from "mongoose";

interface ClubMember extends Document {
  tag: string;
  name: string;
  nameColor: string;
  role:
    | "notMember"
    | "member"
    | "president"
    | "senior"
    | "vicePresident"
    | "unknown"
    | string;
  trophies: number;
  icon: {
    id: number;
  };
}

const clubMemberSchema: Schema<ClubMember> = new Schema({
  tag: { type: String, required: true },
  name: { type: String, required: true },
  nameColor: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "notMember",
      "member",
      "president",
      "senior",
      "vicePresident",
      "unknown",
    ],
    required: true,
  },
  trophies: { type: Number, required: true },
  icon: {
    id: { type: Number, required: true },
  },
});

export { ClubMember, clubMemberSchema };
