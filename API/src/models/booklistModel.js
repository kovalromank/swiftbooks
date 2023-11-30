const pool = require('../config/db');


const ten_most_recent_public_lists = async () => {
    const query = `
        SELECT * FROM booklists 
        WHERE is_public = TRUE 
        ORDER BY updated_at DESC 
        LIMIT 10
    `;
    const result = await pool.query(query);
    return result.rows;
};


const num_booklists_by_user = async (user_id) => {
    const query = `
        SELECT * FROM booklists
        WHERE created_by_id = $1
    `;
    const result = await pool.query(query, [user_id]);

    return result.rows.length;
}


const create_booklist_db = async (user_id, username, list_name, is_public) => {
    const result = await pool.query(
        'INSERT INTO booklists (list_name, is_public, created_by_id, created_by_username, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id', 
        [list_name, is_public, user_id, username]
    );
    return result.rows[0];
};


const get_booklists = async (user_id) => {
    const query = `
        SELECT * FROM booklists
        WHERE created_by_id = $1
    `;
    const result = await pool.query(query, [user_id]);

    return result.rows;
}


const delete_booklist = async (user_id, booklist_id) => {
    const query = `
        DELETE FROM booklists
        WHERE created_by_id = $1 AND id = $2
        RETURNING *; 
    `;
    const result = await pool.query(query, [user_id, booklist_id]);

    return result.rows; // Contains the rows that were deleted
}


const does_user_own_list = async (user_id, booklist_id) => {
    const query = `
        SELECT * FROM booklists
        WHERE created_by_id = $1 AND id = $2
    `;
    const result = await pool.query(query, [user_id, booklist_id]);

    return result.rows.length > 0;
}


const does_book_exist = async (book_id) => {
    const query = `
        SELECT * FROM books
        WHERE id = $1
    `;
    const result = await pool.query(query, [book_id]);

    return result.rows.length > 0;
}


const add_book = async (book_id) => {
    const result = await pool.query(
        `INSERT INTO books 
            (id) 
            VALUES ($1) 
            RETURNING id`, 
        [book_id]
    );
    return result.rows[0];
};


const add_book_to_booklist = async (list_id, book_id) => {
    const result = await pool.query(
        `INSERT INTO booklists_books 
            (booklist_id, book_id, added_at) 
            VALUES ($1, $2, NOW()) 
            RETURNING id`, 
        [list_id, book_id]
    );
    await pool.query( //update updated time for list
        `UPDATE booklists 
            SET updated_at = NOW() 
            WHERE id = $1`,
        [list_id]
    );
    return result.rows[0];
};


const delete_book_from_booklist = async (list_id, book_id) => {
    const result = await pool.query(
        `DELETE FROM booklists_books 
            WHERE booklist_id = $1 and book_id = $2
            RETURNING *`, 
        [list_id, book_id]
    );
    await pool.query( //update updated time for list
        `UPDATE booklists 
            SET updated_at = NOW() 
            WHERE id = $1`,
        [list_id]
    );
    return result.rows[0];
};


const is_list_public = async (list_id) => {
    const query = `
        SELECT * FROM booklists
        WHERE id = $1 and is_public = $2
    `;
    const result = await pool.query(query, [list_id, true]);

    return result.rows.length > 0;
}



const get_list_data = async (list_id) => {
    const query = `
        SELECT b.* FROM books b
        INNER JOIN booklists_books bb ON b.id = bb.book_id
        WHERE bb.booklist_id = $1
    `;
    const result = await pool.query(query, [list_id]);

    return result.rows; 
};



const add_review = async (user_id, list_id, stars, text_content) => {
    const result = await pool.query(
        `INSERT INTO booklist_reviews 
            (booklist_id, user_id, added_at, updated_at, content, stars, hidden) 
            VALUES ($1, $2, NOW(), NOW(), $3, $4, $5) 
            RETURNING id`, 
        [list_id, user_id, text_content, stars, false]
    );

    return result.rows; 
};



const update_booklist_name = async (list_id, name) => {
    await pool.query( //update updated time for list
        `UPDATE booklists 
            SET updated_at = NOW(),
                list_name = $2
            WHERE id = $1`,
        [list_id, name]
    );
    return result.rows[0];
};



const toggle_hide_review = async (review_id) => {
    await pool.query( //update updated time for list
        `UPDATE booklists_reviews 
            SET updated_at = NOW(),
                hidden = NOT hidden
            WHERE id = $1`,
        [review_id]
    );
    return result.rows[0];
};


const is_book_in_cart = async (user_id, book_id) => {
    await pool.query( //update updated time for list
        `SELECT * FROM carts
        WHERE user_id = $1 and book_id = $2`,
        [user_id, book_id]
    );
    return result.rows.length > 0;
};


const update_book_quantity = async (user_id, book_id, quantity) => {
    await pool.query( //update updated time for list
        `UPDATE carts 
            SET updated_at = NOW(),
                quantity = $3
            WHERE user_id = $1 and book_id = $2`,
        [user_id, book_id, quantity]
    );
    return result.rows[0];
};


const add_book_to_cart = async (user_id, book_id, quantity) => {
    await pool.query( //update updated time for list
        `INSERT INTO carts 
        (user_id, book_id, quantity, added_at, updated_at) 
        VALUES ($1, $2, $3, NOW(), NOW()) 
        RETURNING id`,
        [user_id, book_id, quantity]
    );
    return result.rows[0];
};


const delete_book_from_cart = async (user_id, book_id) => {
    const query = `
        DELETE FROM carts
        WHERE user_id = $1 AND book_id = $2
        RETURNING *;
    `;
    const result = await pool.query(query, [user_id, book_id]);

    return result.rows; // Contains the rows that were deleted
}


const clear_cart = async (user_id) => {
    const query = `
        DELETE FROM carts
        WHERE user_id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [user_id]);

    return result.rows; // Contains the rows that were deleted
}



module.exports = { 
    toggle_hide_review, update_booklist_name, add_review, get_list_data, is_list_public, delete_book_from_booklist, add_book_to_booklist, add_book, does_book_exist, 
    does_user_own_list, ten_most_recent_public_lists, num_booklists_by_user, create_booklist_db, get_booklists, delete_booklist, is_book_in_cart, update_book_quantity,
    add_book_to_cart, delete_book_from_cart, clear_cart
};