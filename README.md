# Online Auction Platform

This is a full-stack online auction platform built with React (frontend), Express and Node.js (backend), and MongoDB (database).

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Setup & Installation](#setup--installation)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Development Scripts](#development-scripts)
- [Additional Resources](#additional-resources)

---

## Project Overview

This application allows users to register, log in, create auctions, and view auction items. It features secure authentication, input validation, rate limiting, and user-auction relationships.

---

## Features

- User registration and login with JWT authentication
- Secure password hashing
- Rate limiting on login
- Create, view, and fetch auction items
- Seller-user relationship for auctions
- Input validation and security headers
- Centralized error handling and logging
- Modern React frontend

---

## Directory Structure
```
justharshit-online-auction-platform/
├── backend/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── ...
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ └── ...
├── package.json
├── README.md
└── ...
```

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the Repository

`git clone <your-repo-url>`  
`cd justharshit-online-auction-platform`


### 2. Backend Setup

`cd backend`  
`npm install`


Create a `.env` file in the `backend` directory with the following content:

PORT=5001
MONGODB_URI=mongodb://localhost:27017/auction-db
JWT_SECRET=your_super_secret_key


Start the backend server:

`npm start`

### 3. Frontend Setup

`cd ..`  
`npm install`  
`npm start`

- The React app runs on [http://localhost:3000](http://localhost:3000)
- The backend runs on [http://localhost:5001](http://localhost:5001)

---

## Running the App

- Register a user via the frontend or `POST /auth/register`
- Log in to receive a JWT token
- Use the token to create auctions or access protected routes
- View all auctions or a single auction via the frontend or API

---

## API Documentation

### Auth

#### Register

- **POST** `/auth/register`
- **Body:**
{
"username": "yourname",
"password": "yourpassword"
}


- **Response:**  
`201 Created`  
`{ "message": "User created successfully" }`

#### Login

- **POST** `/auth/login`
- **Body:**
{
"username": "yourname",
"password": "yourpassword"
}


- **Response:**  
`200 OK`  
`{ "token": "JWT_TOKEN", "message": "Logged in successfully" }`

---

### Auctions

#### Get All Auctions

- **GET** `/auctions`
- **Response:**  
`200 OK`  
[
{
"_id": "...",
"itemName": "Item",
"description": "Desc",
"startingBid": 100,
"currentBid": 150,
"seller": { "_id": "...", "username": "sellername" }
}
]

#### Get Single Auction

- **GET** `/auctions/:id`
- **Response:**  
`200 OK`  
Auction object

#### Create Auction

- **POST** `/auctions`
- **Headers:**  
`Authorization: Bearer <JWT_TOKEN>`
- **Body:**
{
"itemName": "Item",
"description": "Desc",
"startingBid": 100
}

- **Response:**  
`201 Created`  
`{ "message": "Auction created successfully", "auction": { ... } }`

---

## Development Scripts

In the project directory, you can run:

- `npm start` — Runs the app in development mode.
- `npm test` — Launches the test runner in interactive watch mode.
- `npm run build` — Builds the app for production.
- `npm run eject` — Ejects the Create React App configuration (irreversible).

---

## Additional Resources

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Note:**  
This is a private project. For questions, contact the project owner.
