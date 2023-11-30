// Club.ts
import ClubMember from "./ClubMember";

interface Club {
  tag: string;
  name: string;
  description: string;
  trophies: number;
  requiredTrophies: number;
  members: ClubMember[];
  type: "open" | "inviteOnly" | "closed" | "unknown";
  badgeId: number;
}

export default Club;
