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

const Instructions = styled.p`
  font-size: 0.9em;
  margin-bottom: 1em;
  text-align: left;
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
  const [generalError, setGeneralError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setItemNameError('');
    setDescriptionError('');
    setStartingBidError('');
    setMessage('');
      setGeneralError('');
    setIsLoading(true);  // Set loading to true at the start

    let isValid = true;

    // Item Name Validation
    if (!itemName) {
      setItemNameError('Item name is required');
      isValid = false;
    } else if (itemName.length < 3) {
      setItemNameError('Item name must be at least 3 characters');
      isValid = false;
    }

    // Description Validation
    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    } else if (description.length < 10) {
      setDescriptionError('Description must be at least 10 characters');
      isValid = false;
    }

    // Starting Bid Validation
    if (!startingBid) {
      setStartingBidError('Starting bid is required');
      isValid = false;
    } else if (isNaN(startingBid) || parseFloat(startingBid) <= 0) {
      setStartingBidError('Starting bid must be a positive number');
      isValid = false;
    } else if (parseFloat(startingBid) <= 100) {
        setStartingBidError('Starting bid must be more than 100');
        isValid = false;
    }

    if (isValid) {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Make a POST request to /auctions with JWT token
        await axios.post(
          'http://localhost:5001/auctions',
          {
            itemName,
            description,
            startingBid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage('Auction created successfully!');

        // Reset form
        setItemName('');
        setDescription('');
        setStartingBid('');

        // Redirect to Dashboard
        navigate('/dashboard');
      } catch (error) {
        setMessage(
          'Error creating auction: ' + (error.response?.data?.message || error.message)
        );
          setGeneralError(error.response?.data?.message || 'An unexpected error occurred.');
          console.error(error);
      } finally {
          setIsLoading(false);
      }
    } else {
        setIsLoading(false);  // Reset loading state if validation fails
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
        <ClickableDiv onClick={() => handleClick('/dashboard')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <PostAuctionSection>
        <h2>Post an Auction</h2>

        <Instructions>
          Please fill out the following information to create your auction listing:
          <ul>
            <li><b>Item Name:</b> Enter a descriptive name for your item (at least 3 characters).</li>
            <li><b>Description:</b> Provide detailed information about the item (at least 10 characters).</li>
            <li><b>Starting Bid:</b> Set a starting bid amount greater than 100.</li>
          </ul>
        </Instructions>

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

          <PostAuctionButton type="submit" disabled={isLoading}>
            {isLoading ? 'Posting Auction...' : 'Post Auction'}
          </PostAuctionButton>
          {message && <p>{message}</p>}
            {generalError && <ErrorMessage>{generalError}</ErrorMessage>}
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
