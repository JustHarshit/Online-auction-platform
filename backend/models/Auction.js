// models/Auction.js
const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingBid: {
        type: Number,
        required: true
    },
    currentBid: {
        type: Number,
        default: 0
    },
    highestBidder: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Auction', auctionSchema);
