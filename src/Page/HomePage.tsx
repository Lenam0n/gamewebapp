// src/component/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  text-align: center;
  max-width: 600px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Willkommen zu unserem Spiel!</Title>
      <Description>
        Erlebe die besten Online-Spiele, treffe Freunde und erstelle deine
        eigenen Lobbys. Lass uns anfangen!
      </Description>
      <Button to="/lobby">Zur Lobby</Button>
      <Button to="/friends" style={{ marginTop: "10px" }}>
        Freunde anzeigen
      </Button>
    </HomeContainer>
  );
};

export default HomePage;
