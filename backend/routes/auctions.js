/* eslint-disable import/first */
// routes/auctions.js
import express from 'express';
const router = express.Router();
// eslint-disable-next-line import/first
import Auction from '../models/Auction.js';
//import jwt from 'jsonwebtoken';  // You are not using this, so commented it out
import authMiddleware from '../middleware/authMiddleware.js';

// GET all auctions
router.get('/', async (req, res, next) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});

// GET one auction
router.get('/:id', getAuction, (req, res) => {
    res.json(res.auction);
});

// POST create an auction (protected route, requires authentication)
router.post('/', authMiddleware, async (req, res, next) => {
    const auction = new Auction({
        itemName: req.body.itemName,
        description: req.body.description,
        startingBid: req.body.startingBid,
        currentBid: req.body.startingBid,
        // Assuming you have user information in the request from the authMiddleware
        seller: req.user._id, // Associate the auction with the logged-in user
    });

    try {
        const newAuction = await auction.save();
        res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
    } catch (err) {
        return next(err); // Pass the error to the error handling middleware
    }
});

// Middleware function to get a single auction
async function getAuction(req, res, next) {
    let auction;
    try {
        auction = await Auction.findById(req.params.id);
        if (auction == null) {
            const error = new Error('Cannot find auction');
            error.status = 404;
            return next(error);
        }
    } catch (err) {
        return next(err);
    }

    res.auction = auction;
    next();
}

export default router;
