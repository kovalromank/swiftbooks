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
        RETURNING *; // This line will return the deleted rows
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


const does_book_exist = async (book_obj) => {
    const query = `
        SELECT * FROM books
        WHERE id = $1
    `;
    const result = await pool.query(query, [book_obj.id]);

    return result.rows.length > 0;
}


const add_book = async (book_obj) => {
    const result = await pool.query(
        `INSERT INTO books 
            (id, title, subtitle, author, publisher, published_date, language, description, thumbnail, full_image, added_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) 
            RETURNING id`, 
        [book_obj.id, book_obj.title, book_obj.subtitle, book_obj.author, book_obj.publisher, book_obj.published_date, book_obj.language, book_obj.description, book_obj.thumbnail, book_obj.full_image]
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




module.exports = { get_list_data, is_list_public, delete_book_from_booklist, add_book_to_booklist, add_book, does_book_exist, does_user_own_list, ten_most_recent_public_lists, num_booklists_by_user, create_booklist_db, get_booklists, delete_booklist };