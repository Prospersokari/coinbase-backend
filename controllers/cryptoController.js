const Crypto = require('../models/Crypto');

exports.getAllCrypto = async (req, res) => {
    try {
        const crypto = await Crypto.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: crypto.length,
            data: crypto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTopGainers = async (req, res) => {
    try {
        const crypto = await Crypto.find().sort({ change24h: -1 }).limit(10);
        res.status(200).json({
            success: true,
            count: crypto.length,
            data: crypto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getNewListings = async (req, res) => {
    try {
        const crypto = await Crypto.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            count: crypto.length,
            data: crypto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.addCrypto = async (req, res) => {
    try {
        const { name, symbol, price, image, change24h } = req.body;

        const cryptoExists = await Crypto.findOne({ symbol: symbol.toUpperCase() });
        if (cryptoExists) {
            return res.status(400).json({
                success: false,
                message: 'Cryptocurrency with this symbol already exists'
            });
        }

        const crypto = await Crypto.create({
            name,
            symbol: symbol.toUpperCase(),
            price,
            image: image || 'default-crypto.png',
            change24h: change24h || 0
        });

        res.status(201).json({
            success: true,
            data: crypto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};