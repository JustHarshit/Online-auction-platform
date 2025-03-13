// models/Auction.js
import mongoose from 'mongoose';

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

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
