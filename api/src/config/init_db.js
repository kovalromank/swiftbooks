const pool = require('./db');


const initDB = async () => {
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            active BOOLEAN NOT NULL,
            status VARCHAR(20) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        );
    `;


    const createBookTable = `
        CREATE TABLE IF NOT EXISTS books (
            id TEXT PRIMARY KEY, -- google id of book
        );
    `;


    const createBooklistTable = `
        CREATE TABLE IF NOT EXISTS booklists (
            id SERIAL PRIMARY KEY,
            list_name VARCHAR(100) NOT NULL,
            is_public BOOLEAN DEFAULT FALSE,
            created_by_id INT REFERENCES users(id) ON DELETE CASCADE,
            created_by_username VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createBooklistBooksTable = `
        CREATE TABLE IF NOT EXISTS booklists_books (
            booklist_id INT REFERENCES booklists(id) ON DELETE CASCADE,
            book_id INT REFERENCES books(id) ON DELETE CASCADE,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (booklist_id, book_id)
        );
    `;

    const createBooklistReviewsTable = `
        CREATE TABLE IF NOT EXISTS booklists_reviews (
            id SERIAL PRIMARY KEY,
            booklist_id INT REFERENCES booklists(id) ON DELETE CASCADE,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            content TEXT,
            stars INT NOT NULL,
            hidden BOOLEAN NOT NULL,
        );
    `;


    const createCartTable = `
        CREATE TABLE IF NOT EXISTS carts (
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
            quantity INT NOT NULL,
            price FLOAT NOT NULL,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, book_id)
        );
    `;

    const createOrderTable = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            price FLOAT NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(50),
            address VARCHAR(200),
            country VARCHAR(100),
            province VARCHAR(100),
            city VARCHAR(100),
            postal_code VARCHAR(20),
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );
    `;

    const createOrderItemsTable = `
        CREATE TABLE IF NOT EXISTS order_items (
            order_id INT REFERENCES orders(id) ON DELETE CASCADE,
            book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
            quantity INT NOT NULL,
            unit_price FLOAT NOT NULL,
            PRIMARY KEY (order_id, book_id)
        );
    `;


    try {
        await pool.query(createUserTable);
        await pool.query(createBookTable);
        await pool.query(createBooklistTable);
        await pool.query(createBooklistBooksTable);
        await pool.query(createBooklistReviewsTable);
        await pool.query(createCartTable);
        await pool.query(createOrderTable);
        await pool.query(createOrderItemsTable);
        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables", error);
    }
};


module.exports = {initDB};
