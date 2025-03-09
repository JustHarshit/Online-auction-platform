import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuctionItemContainer = styled.div`
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

const ItemSection = styled.div`
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0px 0.125em 0.25em rgba(0, 0, 0, 0.1);
  padding: 1.25em;
  margin-bottom: 1.25em;
  width: 80%;
  max-width: 50em;
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

const InputField = styled.input`
  padding: 0.625em;
  margin: 0.3125em 0;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  width: 100%;
  outline: none;
  font-size: 1em;
`;

const BidButton = styled.button`
  background-color: #6a00ff;
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 0.3125em;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  &:hover {
    background-color: #6a00ff;
  }
  margin-top: 0.625em;
`;

const Message = styled.p`
  color: ${(props) => (props.isError ? 'red' : 'green')};
  font-size: 0.9em;
  margin-top: 0.625em;
`;

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage('Error fetching auction item: ' + error.response?.data?.message || error.message);
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    const username = prompt('Enter your username to place a bid:');

    if (!username) {
      setMessage('Username is required.');
      return;
    }

    if (bid <= item.currentBid) {
      setMessage('Bid must be higher than the current bid.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5001/bid/${id}`, { bid, username });
      setMessage(res.data.message);
      if (res.data.winner) {
        setMessage(`Auction closed. Winner: ${res.data.winner}`);
      }
    } catch (error) {
      setMessage('Error placing bid.');
      console.error(error);
    }
  };

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <AuctionItemContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <ItemSection>
        <h2>{item.itemName}</h2>
        <p>{item.description}</p>
        <p>Current Bid: ${item.currentBid}</p>
        <p>Highest Bidder: {item.highestBidder || 'No bids yet'}</p>
        <InputField
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Enter your bid"
        />
        <BidButton onClick={handleBid}>Place Bid</BidButton>
        {message && <Message className="message">{message}</Message>}
      </ItemSection>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.<br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </AuctionItemContainer>
  );
}

export default AuctionItem;
