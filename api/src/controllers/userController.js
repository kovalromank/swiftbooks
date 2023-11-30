const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


/**
 * Handles the registration of a new user.
 * It first extracts the username, email, and password from the request body.
 * It checks if the username already exists using the userModel's userExists method.
 * If the username exists, it responds with a 401 status and an error message.
 * If the username is unique, it hashes the password, creates a new user,
 * generates a JWT token, and responds with a 201 status and the token.
 * 
 * @param {Object} req - The Express request object containing user data
 * @param {Object} res - The Express response object for sending responses
 * @returns {Promise} - The asynchronous operation of registering a user
 */
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (userModel.userExists(username)) {
            return res.status(401).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser(username, email, hashedPassword);
        
        // Create JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering new user' });
    }
};

/**
 * Handles user login.
 * It extracts the email and password from the request body and 
 * finds the user by email using the userModel's findUserByEmail method.
 * If the user doesn't exist or the password doesn't match, 
 * it responds with a 401 status and an error message.
 * If the credentials are valid and the user's account is active, 
 * it generates a JWT token and responds with the token and success message.
 * 
 * @param {Object} req - The Express request object containing user credentials
 * @param {Object} res - The Express response object for sending responses
 * @returns {Promise} - The asynchronous operation of user login
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findUserByEmail(email);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.active) {
            return res.status(401).json({ message: 'account not active' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.json({ message: 'User logged in successfully', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user' });
    }
};



