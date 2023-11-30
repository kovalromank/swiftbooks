const booklistModel = require('../models/booklistModel');
const userModel = require('../models/userModel');


//BOOKLIST STUFF

/**
 * Creates a new booklist for a user.
 * 
 * This asynchronous function handles a request to create a new booklist. It first
 * extracts the user's token from the request headers and retrieves the user's ID from it.
 * It then checks if the user has already created the maximum allowed number of booklists (20).
 * If not, it proceeds to create a new booklist with the given name and privacy status.
 * 
 * @param {object} req - The HTTP request object, containing the user's token in headers
 *                          and booklist details (name and privacy status) in the body.
 * @param {object} res - The HTTP response object used to send back the status and messages.
 * 
 * The function performs the following steps:
 * 1. Extracts the authorization token from the request headers.
 * 2. Retrieves the user's ID from the token.
 * 3. Checks the number of booklists already created by the user. If 20 or more, it sends
 *    a 403 (Forbidden) response.
 * 4. Extracts the new booklist's name and privacy status from the request body.
 * 5. Retrieves the username associated with the user ID.
 * 6. Creates a new booklist in the database with the provided details.
 * 7. Sends a 200 (OK) response upon successful creation of the booklist.
 * 8. Catches and handles any errors that occur during the process, sending a 500 (Internal Server Error) response.
 * 
 * @returns {Promise} - The promise resulting from the asynchronous operation.
 */
exports.create_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);
        let num_lists = await booklistModel.num_booklists_by_user(user_id);

        if (num_lists >= 20) {
            return res.status(403).json({message: 'Too many lists already. Maximum number of lists already exist.'})
        }

        const { list_name, is_public = false } = req.body;

        let username = await userModel.getUsernameFromId(user_id);
        await booklistModel.create_booklist_db(user_id, username, list_name, is_public);

        return res.status(200).json({message: 'Booklist created.'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to create booklist'});
    }
};


/**
 * Retrieves a user's booklists.
 * 
 * This asynchronous function is responsible for fetching booklists associated with a specific user. 
 * It first extracts the user's token from the request headers. Then, it decodes the token to retrieve 
 * the user's ID. With the user ID, it calls the `booklistModel.get_booklists` function to fetch all 
 * booklists associated with this user. If successful, it returns these booklists with a 200 status code.
 * In case of an error, such as an invalid token or a failure in fetching the booklists, it catches 
 * the error and returns a 500 status code with an error message.
 * 
 * @param {Object} req - The request object containing the user's authorization token.
 * @param {Object} res - The response object used to return the status and data (or error message).
 * @returns {Promise} A promise that resolves with the HTTP response containing the user's booklists or an error message.
 */
exports.get_user_booklists = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        let my_lists = await booklistModel.get_booklists(user_id);

        return res.status(200).json(my_lists);
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to find booklists'});
    }
};


/**
 * Deletes a user's booklist.
 *
 * This asynchronous function handles the request to delete a specific booklist
 * associated with a user. It first retrieves the authorization token from the
 * request headers to identify the user. Using this token, it extracts the user's
 * ID. Then, it gets the 'list_id' from the request body, which specifies the
 * booklist to be deleted. The function calls 'delete_booklist' method from the
 * 'booklistModel' to perform the deletion in the database. If successful, it
 * sends a 200 HTTP status response with a success message. In case of any error
 * (e.g., invalid token, database issues), it catches the exception and sends a
 * 500 HTTP status response with an error message.
 *
 * @param {Object} req - The HTTP request object, containing the authorization
 *                       token in headers and the 'list_id' in the body.
 * @param {Object} res - The HTTP response object used to send back the status
 *                       and message.
 */
exports.delete_user_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id } = req.body;

        await booklistModel.delete_booklist(user_id, list_id);

        return res.status(200).json({message: 'Booklist deleted.'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to delete booklist'});
    }
};


/**
 * Adds a book to a specific booklist.
 * 
 * This asynchronous function handles a request to add a book to a user's booklist.
 * It first extracts the authorization token from the request headers to identify the user.
 * Then, it retrieves the list ID and book object from the request body. The book object is 
 * expected to be obtained from open endpoints, either by book ID or book search utilizing the Google books api.
 * 
 * The function checks if the user owns the specified booklist. If not, it responds with a 401 
 * unauthorized error. Next, it checks if the book already exists in the database; if not, it adds the book.
 * Finally, it adds the book to the specified booklist and returns a success message. 
 * 
 * If any error occurs during the process, it catches the error and returns a 500 internal server error.
 * 
 * @param {Object} req - The request object, containing the list ID, book object, and user's authorization token.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
exports.add_book_to_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, book_id } = req.body; //expect google book id

        let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
        if (!is_user_list) {
            return res.status(401).json({message: 'Tried adding book to list that user does not own.'});
        }

        let book_exists = await booklistModel.does_book_exist(book_id);
        if (!book_exists) {
            await booklistModel.add_book(book_id);
        }

        await booklistModel.add_book_to_booklist(list_id, book_id);

        return res.status(200).json({message: 'Added book to list.'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to add book to booklist'});
    }
};


/**
 * Deletes a book from a user's booklist.
 * 
 * This asynchronous function handles a request to remove a book from a user's booklist.
 * It first retrieves the user's ID from the token provided in the request's authorization header.
 * It then extracts the list ID and book object (expected from open endpoints) from the request body.
 * The function checks if the user owns the list in question; if not, it responds with a 401 unauthorized status.
 * If the user owns the list, it proceeds to delete the specified book from the booklist and responds with a 200 status,
 * indicating successful deletion. In case of any errors, it catches them and responds with a 500 server error status.
 *
 * @param {object} req - The request object, containing the user's token, list ID, and book id.
 * @param {object} res - The response object used to send back the HTTP response.
 */
exports.delete_book_from_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, book_id } = req.body; //expect the list_id and the book_object returned from open endpoints book from id or book search

        let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
        if (!is_user_list) {
            return res.status(401).json({message: 'Tried removing book from list that user does not own.'});
        }

        await booklistModel.delete_book_from_booklist(list_id, book_id);

        return res.status(200).json({message: 'Added book to list.'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to remove book from booklist'});
    }
};


/**
 * Retrieves book information from a specified list.
 * 
 * The function first extracts the authorization token from the request headers to identify
 * the user. It then retrieves the list ID from the request body. The function checks if
 * the list is public; if not, it verifies whether the requesting user owns the list.
 * If the list is private and not owned by the user, a 401 Unauthorized response is sent.
 * Otherwise, it fetches the data of the list and returns it in the response.
 * 
 * If any errors occur during the process, a 500 Internal Server Error response is sent.
 * 
 * @param {object} req - The request object, containing the request headers
 *                        and body with the user's token and the list ID.
 * @param {object} res - The response object used for sending back the
 *                        retrieved list data or error messages.
 * @returns {Promise<void>} A promise that resolves to sending a response to the client.
 */
exports.get_book_ids_from_list = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id } = req.body;


        let is_list_public = await booklistModel.is_list_public(list_id);
        if (!is_list_public) {
            let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
            if (!is_user_list) {
                return res.status(401).json({message: 'Tried accessing private list that isnt owned by user.'});  
            }
        }

        const list_data = await booklistModel.get_list_data(list_id);

        return res.status(200).json(list_data);       
    } catch (error) {
        return res.status(500).json({message: 'Failed to open list.'});   
    }
};


exports.add_review_to_list = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, stars, text_content } = req.body;


        let is_list_public = await booklistModel.is_list_public(list_id);
        if (!is_list_public) {
            return res.status(401).json({message: 'Tried adding comment to private list.'});  
        }

        await booklistModel.add_review(user_id, list_id, stars, text_content);

               
    } catch (error) {
        return res.status(500).json({message: 'Failed to open list.'});   
    }
};


exports.update_booklist_name = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, name } = req.body;

        let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
        if (!is_user_list) {
            return res.status(401).json({message: 'Tried adding book to list that user does not own.'});
        }

        await booklistModel.update_booklist_name(list_id, name);

        return res.status(200).json({message: 'updated booklist.'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to update booklist'});
    }
};


//AUTH USER INFO FETCH

exports.get_user_details = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const user_details = await userModel.getUserDetails(user_id);
        
        return res.status(200).json(user_details);
    } catch (error) {
        return res.status(500).json();
    }
}



//MANAGER / ADMIN REVIEW HIDING

exports.toggle_hide_review = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        let is_admin = await userModel.isAdmin(user_id);
        let is_manager = await userModel.isManager(user_id);

        if (!is_admin && !is_manager) {
            return res.status(401).json({message: 'Only manager or admin can do this.'});
        }

        const { review_id } = req.body; 

        await booklistModel.toggle_hide_review(review_id);

        return res.status(200).json({message: 'Changed review hidden status.'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to update review status'});
    }
};



//CART AND CHECKOUT

exports.add_book_to_cart = async (req, res) => { //endpoint can be used for adding book initially or updating quantity in cart
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { book_id, quantity } = req.body; 

        if (await booklistModel.is_book_in_cart(user_id, book_id)) {
            await booklistModel.update_book_quantity(user_id, book_id, quantity);
        } else {
            await booklistModel.add_book_to_cart(user_id, book_id, quantity);
        }

        return res.status(200).json({message: 'updated cart'});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to update cart'});
    }
};

exports.delete_book_from_cart = async (req, res) => { 
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { book_id } = req.body; 

        await booklistModel.delete_book_from_cart(user_id, cart_id);

        return res.status(200).json({message: 'deleted book from cart'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to delete book from cart'});
    }
};


exports.clear_cart = async (req, res) => { 
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        await booklistModel.clear_cart(user_id);

        return res.status(200).json({message: 'cleared cart'});
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to clear cart'});
    }
};


exports.get_cart = async (req, res) => { 
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const cart_details = await booklistModel.get_cart(user_id);

        return res.status(200).json(cart_details);
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to get cart'});
    }
};



exports.checkout = async (req, res) => { 
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const cart_details = await booklistModel.get_cart(user_id);

        const { total_price, first_name, last_name, email, phone, address, country, province, city, postal_code } = req.body; 

        const order_id = await booklistModel.create_order(user_id, total_price, first_name, last_name, email, phone, address, country, province, city, postal_code);

        return res.status(200).json();
        
    } catch (error) {
        return res.status(500).json({message: 'Failed to get cart'});
    }
};
