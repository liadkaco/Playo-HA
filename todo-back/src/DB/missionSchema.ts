import mongoose, { Schema, Document } from "mongoose";
import { MissionStatus } from "../utils/enum";


interface IMission extends Document {
  title: string;
  description: string;
  status: MissionStatus;
}

const missionSchema:Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: Object.values(MissionStatus),
     default: MissionStatus.PENDING
  },
});

const Mission = mongoose.model<IMission>("Mission", missionSchema);

export default Mission;
