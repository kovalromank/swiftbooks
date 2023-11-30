const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return next();
};


const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    let user_id = userModel.getUserIdFromToken(token);
    if (userModel.isAdmin(user_id)) {
        return next();
    }

    return res.status(401).json({ message: 'Not admin.' });
};


module.exports = { verifyToken, verifyAdmin };
