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
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
