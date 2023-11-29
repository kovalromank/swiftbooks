const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id', 
        [username, email, hashedPassword, true, false]
    );
    return result.rows[0];
};


const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1', 
        [email]
    );
    return result.rows[0];
};


const getUsernameFromId = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [id]
    );
    return result.rows[0].username;
};


const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        return userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};


module.exports = { createUser, findUserByEmail, getUserIdFromToken, getUsernameFromId };
