import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Utils/UserProvider"; // Import your UserProvider
import Sidebar from "./component/UserSidebar"; // Your Sidebar component
import ChessGame from "./component/chess/chessgame"; // Your ChessGame component
import { ApiProvider } from "./Utils/ApiProvider";
import { LobbyProvider } from "./Utils/LobbyContext";
import HomePage from "./Page/HomePage";

const App: React.FC = () => {
  return (
    <ApiProvider>
      <UserProvider>
        <LobbyProvider>
          <Router>
            <div className="App" style={{ display: "flex" }}>
              <Sidebar />
              <Routes>
                <Route path="/chess" element={<ChessGame />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
          </Router>
        </LobbyProvider>
      </UserProvider>
    </ApiProvider>
  );
};

export default App;
