import { MissionStatus } from "../../Utils/enums";

interface StatusProps {
  missionStatus: MissionStatus;
  setMissionStatus: (status: MissionStatus) => void;
}

const SelectStatus: React.FC<StatusProps> = ({
  missionStatus,
  setMissionStatus,
}) => {
  return (
    <select
      value={missionStatus}
      onChange={(e) => setMissionStatus(e.target.value as MissionStatus)}
      className="border-2 border-gray-300 rounded-md p-2"
    >
      {Object.values(MissionStatus).map((statusValue) => (
        <option key={statusValue} value={statusValue}>
          {statusValue}
        </option>
      ))}
    </select>
  );
};

export default SelectStatus;
