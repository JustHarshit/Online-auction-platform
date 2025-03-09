import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostAuctionContainer = styled.div`
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

const PostAuctionSection = styled.div`
  text-align: center;
  margin-bottom: 1.25em;
  width: 80%;
  max-width: 37.5em;
  padding: 1.25em;
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0px 0.125em 0.25em rgba(0, 0, 0, 0.1);
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

const TextAreaField = styled.textarea`
  padding: 0.625em;
  margin: 0.3125em 0;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  width: 100%;
  outline: none;
  font-size: 1em;
  resize: vertical;
`;

const PostAuctionButton = styled.button`
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

const Footer = styled.div`
  text-align: center;
  padding: 0.625em;
  background-color: white;
  width: 100%;
  font-size: 0.8em;
  margin-top: auto;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 0.3125em;
`;

function PostAuction() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [itemNameError, setItemNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [startingBidError, setStartingBidError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setItemNameError('');
    setDescriptionError('');
    setStartingBidError('');
    setMessage('');

    let isValid = true;
    if (!itemName) {
      setItemNameError('Item name is required');
      isValid = false;
    }
    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    }
    if (!startingBid) {
      setStartingBidError('Starting bid is required');
      isValid = false;
    } else if (isNaN(startingBid) || parseFloat(startingBid) <= 0) {
      setStartingBidError('Starting bid must be a positive number');
      isValid = false;
    }

    if (isValid) {
      try {
        const res = await axios.post('http://localhost:5001/auctions', {
          itemName,
          description,
          startingBid,
        });
        setMessage(res.data.message);
        // Reset form
        setItemName('');
        setDescription('');
        setStartingBid('');
      } catch (error) {
        setMessage('Error creating auction: ' + error.response?.data?.message || error.message);
        console.error(error);
      }
    }
  };

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <PostAuctionContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
      </Header>

      <PostAuctionSection>
        <h2>Post an Auction</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          {itemNameError && <ErrorMessage>{itemNameError}</ErrorMessage>}

          <TextAreaField
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}

          <InputField
            type="number"
            placeholder="Starting Bid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
          />
          {startingBidError && <ErrorMessage>{startingBidError}</ErrorMessage>}

          <PostAuctionButton type="submit">Post Auction</PostAuctionButton>
          {message && <p>{message}</p>}
        </form>
      </PostAuctionSection>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.<br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </PostAuctionContainer>
  );
}

export default PostAuction;
