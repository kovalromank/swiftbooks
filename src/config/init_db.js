const pool = require('./db.js');

const createTables = async () => {
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createUserTable);
        console.log("User table created successfully.");
    } catch (error) {
        console.error("Error creating tables", error);
    }
};

createTables();
