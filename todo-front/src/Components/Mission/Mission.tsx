import { useState } from "react";
import axios from "axios";
import { MissionProps } from "../../Utils/Interfaces";
import ActionButton from "../ActionButton/ActionButton";
import { MissionStatus } from "../../Utils/enums";
import moment from "moment";
import SelectStatus from "../SelectStatus/SelectStatus";

const Mission: React.FC<MissionProps & { refreshMissions: () => void }> = ({
  text,
  date,
  _id: id,
  status,
  refreshMissions,
}) => {
  const formattedDate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [missionText, setMissionText] = useState<string>(text);
  const [missionStatus, setMissionStatus] = useState<MissionStatus>(status);

  const updateMission = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/mission/${id}`,
        {
          text: missionText,
          status: missionStatus,
        }
      );
      setIsEditting(false);
      console.log("Updated:", response.data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const deleteHandler = async (missionID: string) => {
    try {
      axios.delete(`http://localhost:3000/api/mission/${missionID}`);
      console.log("Mission deleted successfully");
      refreshMissions();
    } catch (error) {
      console.error("Failed to delete mission:", error);
    }
  };

  return (
    <div
      className={`${
        status == MissionStatus.Pending ? "bg-white" : "bg-green-100"
      } p-4 rounded-lg shadow-md mb-4`}
    >
      <div className="flex items-center justify-between">
        <input
          value={missionText}
          onChange={(e) => setMissionText(e.target.value)}
          readOnly={!isEditting}
          className={`${
            status == MissionStatus.Pending ? "bg-white" : "bg-green-100"
          } w-full  rounded-md p-2 mb-2 focus:outline-none ${
            isEditting && "border-2 border-gray-300 focus:border-blue-500"
          }`}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="space-x-2">
          {isEditting && (
            <SelectStatus
              missionStatus={missionStatus}
              setMissionStatus={setMissionStatus}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="space-x-2">
          {isEditting ? (
            <ActionButton
              color={"bg-blue-500"}
              hoverColor={"bg-blue-500"}
              func={() => updateMission(id)}
              text="Save"
            />
          ) : (
            <ActionButton
              color={"bg-yellow-500"}
              hoverColor={"bg-yellow-500"}
              func={() => setIsEditting(true)}
              text="Edit"
            />
          )}
          <ActionButton
            color={"bg-red-500"}
            hoverColor={"bg-red-500"}
            func={() => deleteHandler(id)}
            text="Delete"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
