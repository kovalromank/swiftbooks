const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id', 
        [username, email, hashedPassword, true, 'user']
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


const getUserDetails = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [id]
    );
    const { password, ...userDetails } = result.rows[0]; //destruct password before returning details
    return userDetails;
};


const isAdmin = async (id) => {
    const query = `
        SELECT * FROM users
        WHERE id = $1 and status = $2
    `;
    const result = await pool.query(query, [id, 'admin']);

    return result.rows.length > 0;
}


const isManager = async (id) => {
    const query = `
        SELECT * FROM users
        WHERE id = $1 and status = $2
    `;
    const result = await pool.query(query, [id, 'manager']);

    return result.rows.length > 0;
}


const userExists = async (username) => {
    const query = `
        SELECT * FROM users
        WHERE LOWER(username) = LOWER($1)
    `;
    const result = await pool.query(query, [username]);

    return result.rows.length > 0;
}


const getUsers = async () => {
    const query = `
        SELECT * FROM users
        ORDER BY username
    `;
    const result = await pool.query(query);

    return result.rows;
}



const changeUserStatus = async (user_id, status_string) => {
    const query = `
        UPDATE users
        SET status = $2
        WHERE id = $1
        RETURNING *;  
    `;
    const result = await pool.query(query, [user_id, status_string]);

    return result.rows;
};


const changeUserActive = async (user_id, active) => {
    const query = `
        UPDATE users
        SET active = $2
        WHERE id = $1
        RETURNING *;  
    `;
    const result = await pool.query(query, [user_id, active]);

    return result.rows;
};


module.exports = { createUser, findUserByEmail, getUserIdFromToken, getUsernameFromId, getUserDetails, isAdmin, isManager, userExists, getUsers, changeUserStatus, changeUserActive };
