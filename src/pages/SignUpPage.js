import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
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

const SignUpSection = styled.div`
  text-align: center;
  margin-bottom: 1.25em;
  width: 80%;
  max-width: 37.5em;
  padding: 1.25em;
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

const SignUpButton = styled.button`
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

const Instructions = styled.p`
  font-size: 0.9em;
  margin-bottom: 1em;
  text-align: left;
`;

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'hotmail.com']; // adding valid email address

  const isValidEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }
    const domain = email.split('@')[1];
    return validEmailDomains.includes(domain);
  };

  const isValidPassword = (password) => {
    if (password.length < 8) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[^a-zA-Z0-9\s]/.test(password)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    }
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address from domains like gmail.com, yahoo.com, outlook.com, aol.com or hotmail.com');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain alphabets, numbers, and special characters'
      );
      isValid = false;
    }

    if (isValid) {
      localStorage.setItem('username', name); // storing username because we dont have name field on signin page.
      localStorage.setItem('password', password);

      console.log("Signing up with:", name, email, password);
      navigate('/signin'); // After sign up go to sign in page
    }
  };

  const handleClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <SignUpContainer>
      <Header>
        <ClickableDiv onClick={() => handleClick('/')}>Auction App</ClickableDiv>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <ClickableDiv onClick={() => handleClick('/dashboard')}>Dashboard</ClickableDiv>
        <NavLink to="/postauction">Post Auction</NavLink>
        <NavLink to="/auctionitem">Auction Items</NavLink>
      </Header>

      <SignUpSection>
        <h2>Sign Up</h2>

        <Instructions>
          Please fill out the following information to create an account:
          <ul>
            <li><b>Name:</b> Enter your full name.</li>
            <li><b>Email:</b> Use a valid email address from <b>gmail.com</b>, <b>yahoo.com</b>, <b>outlook.com</b>, <b>aol.com</b>, or <b>hotmail.com</b>.</li>
            <li><b>Password:</b> Must be at least 8 characters long and contain at least one alphabet, one number, and one special character.</li>
          </ul>
        </Instructions>

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </form>
      </SignUpSection>

      <WelcomeSection>
        <p>Welcome to Auction App</p>
      </WelcomeSection>

      <Footer>
        &copy; 2024 Auction App. All rights reserved.<br />
        Welcome to the best place to buy and sell items through auctions!
      </Footer>
    </SignUpContainer>
  );
}

export default SignUp;
