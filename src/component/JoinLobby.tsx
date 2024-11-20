// src/component/LobbyJoin.tsx
import React, { useState } from "react";
import axios from "axios";
import { useLobbyContext } from "../Utils/LobbyContext";
import { useApiContext } from "../Utils/ApiProvider";

const LobbyJoin: React.FC = () => {
  const { setLobbyCode } = useLobbyContext();
  const [lobbyCode, setLobbyCodeInput] = useState("");
  const [userName, setUserName] = useState("");
  const { apiUrl } = useApiContext();

  const joinLobby = async () => {
    try {
      const response = await axios.post(`${apiUrl}/lobbies/join`, {
        lobbyCode,
        userName,
      });
      setLobbyCode(lobbyCode);
      alert(response.data.message);
    } catch (error) {
      console.error("Error joining lobby:", error);
    }
  };

  return (
    <div>
      <h2>Join Lobby</h2>
      <input
        type="text"
        placeholder="Lobby Code"
        value={lobbyCode}
        onChange={(e) => setLobbyCodeInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={joinLobby}>Join</button>
    </div>
  );
};

export default LobbyJoin;
