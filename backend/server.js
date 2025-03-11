const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies  <--- THIS LINE IS IMPORTANT

// Routes
const authRoutes = require('./routes/auth'); // Import the auth routes
app.use('/auth', authRoutes); // Use the auth routes for any requests starting with /auth

const auctionRoutes = require('./routes/auctions'); // Import the auction routes
app.use('/auctions', auctionRoutes); // Use the auction routes for any requests starting with /auctions

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
