import React, { useState } from 'react';
import styled from 'styled-components';

const SignInFormContainer = styled.div`
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 0.3125em;
`;

function SignInForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');

    let isValid = true;
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      onSubmit({ username, password });
    }
  };

  return (
    <SignInFormContainer>
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
        <SignInButton type="submit">Signin</SignInButton>
      </form>
    </SignInFormContainer>
  );
}

export default SignInForm;
