const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');
//const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware').default;

// GET all auctions
router.get('/', async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one auction
router.get('/:id', getAuction, (req, res) => {
    res.json(res.auction);
});

// POST create an auction (protected route, requires authentication)
router.post('/', authMiddleware, async (req, res) => {
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
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get a single auction
async function getAuction(req, res, next) {
    let auction;
    try {
        auction = await Auction.findById(req.params.id);
        if (auction == null) {
            return res.status(404).json({ message: 'Cannot find auction' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.auction = auction;
    next();
}

module.exports = router;
