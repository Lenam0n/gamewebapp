// src/Utils/ApiProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Definiere den Typ für den API-Kontext
interface ApiContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

// Erstelle den Kontext
const ApiContext = createContext<ApiContextType | null>(null);

// Erstelle einen Provider für den API-Kontext
export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apiUrl, setApiUrl] = useState<string>("http://localhost:5004"); // Setze die Standard-API-URL hier

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom Hook, um den API-Kontext zu verwenden
export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
