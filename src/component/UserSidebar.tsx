// src/component/UserSidebar.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../Utils/UserProvider";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FriendsList = styled.div`
  margin-top: 10px;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FriendAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

const AddFriendInput = styled.input`
  margin-bottom: 10px;
`;

const Sidebar: React.FC = () => {
  const { user, friends, addFriend } = useUserContext();
  const [friendId, setFriendId] = useState("");

  const handleAddFriend = () => {
    const id = parseInt(friendId);
    if (!isNaN(id)) {
      addFriend(id);
      setFriendId("");
    }
  };

  return (
    <SidebarContainer>
      {user && (
        <UserSection>
          <Avatar src={user.avatar} alt={`${user.name}'s avatar`} />
          <span>{user.name}</span>
        </UserSection>
      )}
      <AddFriendInput
        type="text"
        placeholder="Friend ID"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <button onClick={handleAddFriend}>Add Friend</button>
      <h3>Friends</h3>
      <FriendsList>
        {friends.map((friend) => (
          <FriendItem key={friend.id}>
            <FriendAvatar src={friend.avatar} alt={`${friend.name}'s avatar`} />
            <span>{friend.name}</span>
          </FriendItem>
        ))}
      </FriendsList>
    </SidebarContainer>
  );
};

export default Sidebar;
