/* eslint-disable no-use-before-define */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import auctionRoutes from './routes/auctions.js';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';


dotenv.config(); 

const app = express();
const port = process.env.PORT || 5001;
// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'access.log'),
  { flags: 'a' }
);


// Middleware and CORS setup
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3001', // React's default dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auctions', auctionRoutes);
app.use(errorHandler); // Error handling middleware
app.use(morgan('dev')); // Logging middleware
// Setup the logger to write to the file
app.use(morgan('combined', { stream: accessLogStream }));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
