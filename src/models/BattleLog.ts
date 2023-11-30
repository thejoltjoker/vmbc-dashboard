import Event from "./Event";
import Battle from "./Battle";

export default interface BattleLog {
  battleTime: string;
  event: Event;
  battle: Battle;
}
