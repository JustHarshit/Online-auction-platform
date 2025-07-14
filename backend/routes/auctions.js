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
        const auctions = await Auction.find().populate('seller', 'username'); // Populate seller field with username
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
        auction = await Auction.findById(req.params.id).populate('seller', 'username'); // Populate seller field with username
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

// Place a bid on an auction
router.post('/:id/bid', authMiddleware, async (req, res, next) => {
    const bidAmount = req.body.bidAmount;
    try {
        // Validate bidAmount
        if (typeof bidAmount !== 'number' || bidAmount <= 0) {
            const error = new Error('Bid amount must be a positive number.');
            error.status = 400;
            return next(error);
        }

        // Find auction
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            const error = new Error('Auction not found.');
            error.status = 404;
            return next(error);
        }

        // Check if bid is higher than currentBid
        if (bidAmount <= auction.currentBid) {
            const error = new Error('Bid must be higher than the current bid.');
            error.status = 400;
            return next(error);
        }

        if (auction.seller.equals(req.user._id)) {
            const error = new Error('Sellers cannot bid on their own auctions.');
            error.status = 403;
            return next(error);
        }


        // Update auction
        auction.currentBid = bidAmount;
        auction.highestBidder = req.user._id;

        // Optional: add to bid history
        // auction.bids.push({ bidder: req.user._id, amount: bidAmount });

        await auction.save();

        res.status(200).json({
            message: 'Bid placed successfully.',
            auction
        });
    } catch (err) {
        next(err);
    }
});


export default router;
