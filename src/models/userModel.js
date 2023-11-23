const pool = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id', 
        [username, email, hashedPassword]
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

module.exports = { createUser, findUserByEmail };
