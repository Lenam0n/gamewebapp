// src/Utils/UserProvider.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { User, Friend } from "./UserTypes";
import { useApiContext } from "./ApiProvider";

const UserContext = createContext<{
  user: User | null;
  friends: Friend[];
  addFriend: (friendId: number) => Promise<void>;
} | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const { apiUrl } = useApiContext(); // Get the API URL from context
  const [socket, setSocket] = useState<Socket | null>(null); // Socket state

  useEffect(() => {
    // Initialize socket only when apiUrl is available
    if (apiUrl) {
      const newSocket = io(apiUrl);
      setSocket(newSocket);

      newSocket.on("friendAdded", (newFriend: Friend) => {
        setFriends((prev) => [...prev, newFriend]);
      });

      return () => {
        newSocket.disconnect(); // Clean up on unmount
      };
    }
  }, [apiUrl]); // Run effect when apiUrl changes

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/1`); // Fetch user with ID 1
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/friends`);
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (apiUrl) {
      fetchUser();
      fetchFriends();
    }
  }, [apiUrl]); // Fetch data when apiUrl changes

  const addFriend = async (friendId: number) => {
    try {
      const response = await axios.post(`${apiUrl}/api/friends`, { friendId });
      setFriends((prev) => [...prev, response.data]);

      // Emit friendAdded event to the server
      if (socket) {
        socket.emit("friendAdded", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, friends, addFriend }}>
      {children}
    </UserContext.Provider>
  );
};
