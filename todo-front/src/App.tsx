import { useEffect, useState } from "react";
import "./App.css";
import Mission from "./Components/Mission/Mission";
import { MissionProps } from "./Utils/Interfaces";
import axios from "axios";

function App() {
  const [missionText, setMissionText] = useState<string>("");
  const [missions, setMissions] = useState<MissionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/missions")
      .then((data) => setMissions(data.data));
  }, [loading]);
  const refreshMissions = () => setLoading(!loading);

  const createMission = () => {
    axios.post("http://localhost:3000/api/mission", { text: missionText });
    setLoading(!loading);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md flex flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Tell me what is your next mission..."
          value={missionText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMissionText(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={createMission}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          ADD
        </button>
      </div>
      <div>
        {missions?.map((mission: MissionProps) => (
          <Mission
            key={mission._id}
            status={mission.status}
            _id={mission._id}
            text={mission.text}
            date={mission.date}
            refreshMissions={refreshMissions}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
