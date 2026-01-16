import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import auctionRoutes from './routes/auctions.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// CORS: use FRONTEND_ORIGIN or allow all if not set (be careful in production)
const frontendOrigin = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({
  origin: frontendOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(helmet());
app.use(express.json());

// Use morgan to log to stdout (serverless: logs go to Vercel logs)
app.use(morgan('combined'));

// Routes
app.use('/auth', authRoutes);
app.use('/auctions', auctionRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Database connection helper for serverless (connection caching)
let isConnected = false; // cached connection flag

export async function connectToDatabase() {
  if (isConnected) {
    // Already connected
    return;
  }
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.warn('MONGODB_URI is not set; skipping DB connection.');
    return;
  }

  // Use mongoose.connect promise to establish connection
  try {
    await mongoose.connect(mongoURI, {
      // recommended options can go here if needed
      // useNewUrlParser: true, useUnifiedTopology: true - not needed with mongoose >= 6
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default app;
