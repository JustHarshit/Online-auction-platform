import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import Axios for API calls

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
    opacity: 0.9; /* Slight hover effect */
  }
  margin-top: 0.625em;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 0.3125em;
`;

function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState(''); // For backend error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setServerError('');

    let isValid = true;

    // Frontend validation
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      try {
        // Send a POST request to /auth/login
        const response = await axios.post('http://localhost:5001/auth/login', {
          username,
          password,
        });

        // Save the JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect to Dashboard
        window.location.href = '/dashboard';
      } catch (err) {
        // Handle server errors (e.g., invalid credentials)
        if (err.response && err.response.data.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError('An error occurred while trying to sign in.');
        }
      }
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
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>} {/* Display server error */}
      </form>
    </SignInFormContainer>
  );
}

export default SignInForm;
