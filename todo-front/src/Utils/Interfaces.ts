import { MissionStatus } from "./enums";

export interface MissionProps {
  _id: string;
  text: string;
  date: string;
  status: MissionStatus;
}
