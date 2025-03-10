import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  font-size: 16px;
`;

const Header = styled.div`
  background: linear-gradient(to right, #6a00ff, #8e2de2);
  color: white;
  text-align: center;
  padding: 1.25em 0;
  width: 100%;
  font-size: 1.2em;
  box-shadow: 0px 0.25em 0.375em rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5em 1em;
  border-radius: 0.3125em;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ClickableDiv = styled.div`
  color: white;
  text-decoration: none;
  padding: 0.5em 1em;
  border-radius: 0.3125em;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  padding: 1.25em;
  margin-bottom: 1.25em;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 50em;
`;

const Section = styled.div`
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0px 0.125em 0.25em rgba(0, 0, 0, 0.1);
  padding: 1.25em;
  margin-bottom: 1.25em;
  width: 100%;
  text-align: left;
`;

const Footer = styled.div`
  text-align: center;
  padding: 0.625em;
  background-color: white;
  width: 100%;
  font-size: 0.8em;
  margin-top: auto;
`;

function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <DashboardContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/dashboard')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <WelcomeSection>
        <h2>Welcome to Your Dashboard!</h2>
        <p>Here you can manage your auctions, view your bids, and more.</p>
      </WelcomeSection>

      <DashboardContent>
        <Section>
          <h3>Your Active Auctions</h3>
          <p>No active auctions at the moment.</p>
        </Section>

        <Section>
          <h3>Your Bids</h3>
          <p>No current bids.</p>
        </Section>

        <Section>
          <h3>Account Settings</h3>
          <p>Manage your profile and preferences.</p>
        </Section>
      </DashboardContent>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.<br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </DashboardContainer>
  );
}

export default Dashboard;
