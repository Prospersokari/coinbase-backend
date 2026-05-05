const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });
        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);
        res.status(201).cookie('token', token, { httpOnly: true }).json({ success: true, token, data: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.status(200).cookie('token', token, { httpOnly: true }).json({ success: true, token, data: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', 'none', { expires: new Date(Date.now() + 1000), httpOnly: true });
    res.status(200).json({ success: true, message: 'Logged out' });
};