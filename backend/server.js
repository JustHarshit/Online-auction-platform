/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.js'; // Import the auth routes
app.use('/auth', authRoutes); // Use the auth routes for any requests starting with /auth

import auctionRoutes from './routes/auctions.js'; // Import the auction routes
app.use('/auctions', auctionRoutes); // Use the auction routes for any requests starting with /auctions

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
