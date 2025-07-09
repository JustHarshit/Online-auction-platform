/* eslint-disable no-use-before-define */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import auctionRoutes from './routes/auctions.js';
import helmet from 'helmet';

app.use(helmet());
dotenv.config(); 

const app = express();
const port = process.env.PORT || 5001;

// Middleware and CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // React's default dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auctions', auctionRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
