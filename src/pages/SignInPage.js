import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls

const SignInContainer = styled.div`
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

const SignInSection = styled.div`
  text-align: center;
  margin-bottom: 1.25em;
  width: 80%;
  max-width: 37.5em;
  padding: 1.25em;
  border-bottom: 1px solid #ccc;
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

const SignInButton = styled.button`
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

const WelcomeSection = styled.div`
  text-align: center;
  padding: 1.25em;
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

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
      setUsernameError('');
      setPasswordError('');

    // Input Validation
      let isValid = true;
      if (!username) {
          setUsernameError('Username is required');
          isValid = false;
      } else if (username.length < 3) {
          setUsernameError('Username must be at least 3 characters');
          isValid = false;
      }

      if (!password) {
          setPasswordError('Password is required');
          isValid = false;
      } else if (password.length < 6) {
          setPasswordError('Password must be at least 6 characters');
          isValid = false;
      }

      if (!isValid) {
          setIsLoading(false);
          return;
      }

    try {
      // Send a POST request to /auth/login
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to the Dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('An error occurred while trying to sign in.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <SignInContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/dashboard')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <SignInSection>
        <h2>Signin</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <SignInButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Signin'}
          </SignInButton>
        </form>
      </SignInSection>

      <WelcomeSection>
        <p>Welcome to Auction App</p>
      </WelcomeSection>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.<br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </SignInContainer>
  );
}

export default SignIn;
