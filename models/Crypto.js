const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a crypto name'],
        trim: true
    },
    symbol: {
        type: String,
        required: [true, 'Please add a symbol'],
        uppercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        default: 'default-crypto.png'
    },
    change24h: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crypto', cryptoSchema);