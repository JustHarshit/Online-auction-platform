import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Styled Components
const LandingPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  font-size: 16px;
  padding-bottom: 2em;
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

const HeroSection = styled.div`
  text-align: center;
  padding: 3em 1em;
  max-width: 800px;
  margin-bottom: 2em;
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  color: #6a00ff;
  margin-bottom: 0.5em;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2em;
  color: #333;
  line-height: 1.6;
`;

const HowItWorksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 1em;
  max-width: 1000px;
  margin-bottom: 2em;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2em;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: 1.5em;
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0px 0.125em 0.25em rgba(0, 0, 0, 0.1);
  width: 30%;
  min-width: 250px;
  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 1.5em;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5em;
  color: #6a00ff;
  margin-bottom: 0.5em;
`;

const StepDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const GraphChartSection = styled.div`
  text-align: center;
  padding: 2em 1em;
  max-width: 800px;
  margin-bottom: 2em;
`;

const GraphImage = styled.img`
  width: 100%;
  max-width: 600px;
  margin-top: 1em;
`;

const VideoSection = styled.div`
  text-align: center;
  padding: 2em 1em;
  margin-bottom: 2em;
`;

const Video = styled.iframe`
  width: 80%;
  height: 400px;
  max-width: 800px;
  border: none;
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Footer = styled.div`
  text-align: center;
  padding: 0.625em;
  background-color: white;
  width: 100%;
  font-size: 0.8em;
  margin-top: auto;
`;

// Functional Component
function LandingPage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <LandingPageContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/dashboard')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <HeroSection>
        <SectionTitle>Discover a New Way to Buy and Sell</SectionTitle>
        <SectionSubtitle>Join our auction platform and experience the thrill of bidding, selling, and discovering unique items.</SectionSubtitle>
      </HeroSection>

      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <SectionSubtitle>Follow these simple steps to get started:</SectionSubtitle>
        <StepsContainer>
          <StepCard>
            <StepTitle>Sign Up</StepTitle>
            <StepDescription>Create an account to start bidding or listing items.</StepDescription>
          </StepCard>
          <StepCard>
            <StepTitle>Browse Auctions</StepTitle>
            <StepDescription>Explore a wide range of items up for auction.</StepDescription>
          </StepCard>
          <StepCard>
            <StepTitle>Bid or Sell</StepTitle>
            <StepDescription>Place your bids or list your own items for auction.</StepDescription>
          </StepCard>
        </StepsContainer>
      </HowItWorksSection>

      <GraphChartSection>
        <SectionTitle>Auction Market Trends</SectionTitle>
        <SectionSubtitle>Stay informed with the latest trends in the auction market.</SectionSubtitle>
        <GraphImage src="https://img.freepik.com/free-vector/business-growth-concept-with-rising-arrow_23-2147743939.jpg" alt="Auction Market Trends" />
      </GraphChartSection>

      <VideoSection>
        <SectionTitle>Watch How Auctions Work</SectionTitle>
        <Video
          src="https://www.youtube.com/embed/A-dmU53Y02Y"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoSection>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.
        <br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </LandingPageContainer>
  );
}

export default LandingPage;
