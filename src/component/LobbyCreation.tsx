// src/component/LobbyCreation.tsx
import React, { useState } from "react";
import axios from "axios";
import { useLobbyContext } from "../Utils/LobbyContext";
import { useApiContext } from "../Utils/ApiProvider";

const LobbyCreation: React.FC = () => {
  const { setLobbyCode } = useLobbyContext();
  const [loading, setLoading] = useState(false);
  const { apiUrl } = useApiContext();

  const createLobby = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/lobbies/create`);
      setLobbyCode(response.data.lobbyCode);
    } catch (error) {
      console.error("Error creating lobby:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Lobby</h2>
      <button onClick={createLobby} disabled={loading}>
        {loading ? "Creating..." : "Create Lobby"}
      </button>
    </div>
  );
};

export default LobbyCreation;
