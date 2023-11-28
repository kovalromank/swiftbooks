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


module.exports = { ten_most_recent_public_lists, num_booklists_by_user, create_booklist_db };