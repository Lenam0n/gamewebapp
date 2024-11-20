// src/Utils/LobbyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Definiere die Typen für den Kontext
interface LobbyContextType {
  lobbyCode: string;
  setLobbyCode: React.Dispatch<React.SetStateAction<string>>;
}

// Erstelle den LobbyContext mit einem Standardwert von null
const LobbyContext = createContext<LobbyContextType | null>(null);

// Hook, um den LobbyContext zu verwenden
export const useLobbyContext = () => {
  const context = useContext(LobbyContext);
  if (!context) {
    throw new Error("useLobbyContext must be used within a LobbyProvider");
  }
  return context;
};

// LobbyProvider Komponente
export const LobbyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lobbyCode, setLobbyCode] = useState<string>("");

  return (
    <LobbyContext.Provider value={{ lobbyCode, setLobbyCode }}>
      {children}
    </LobbyContext.Provider>
  );
};
