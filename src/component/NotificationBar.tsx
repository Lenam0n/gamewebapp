import React from "react";
import styled from "styled-components";

type NotificationBarProps = {
  message: string;
};

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff5555;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
`;

const NotificationBar: React.FC<NotificationBarProps> = ({ message }) => {
  return <NotificationContainer>{message}</NotificationContainer>;
};

export default NotificationBar;
