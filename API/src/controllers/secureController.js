const booklistModel = require('../models/booklistModel');
const userModel = require('../src/models/userModel');


exports.create_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);
        let num_lists = await booklistModel.num_booklists_by_user(user_id);

        if (num_lists >= 20) {
            res.status(403).json({'message': 'Too many lists already. Maximum number of lists already exist.'})
        }


        const { list_name, is_public = false   } = req.body;

        let username = await userModel.getUsernameFromId(user_id);
        await booklistModel.create_booklist_db(user_id, username, list_name, is_public);


        res.status(200).json({'message': 'Booklist created.'});
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to create booklist'});
    }
};


exports.get_user_booklists = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        let my_lists = await booklistModel.get_booklists(user_id);

        res.status(200).json(my_lists);
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to find booklists'});
    }
};



exports.delete_user_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id } = req.body;

        await booklistModel.delete_booklist(user_id, list_id);

        res.status(200).json({'message': 'Booklist deleted.'});
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to delete booklist'});
    }
};


exports.add_book_to_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, book_object } = req.body; //expect the list_id and the book_object returned from open endpoints book from id or book search

        let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
        if (!is_user_list) {
            res.status(401).json({'message': 'Tried adding book to list that user does not own.'});
        }

        let book_exists = await booklistModel.does_book_exist(book_object);
        if (!book_exists) {
            await booklistModel.add_book(book_object);
        }

        await booklistModel.add_book_to_booklist(list_id, book_object.id);

        res.status(200).json({'message': 'Added book to list.'});
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to add book to booklist'});
    }
};


exports.delete_book_from_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id, book_object } = req.body; //expect the list_id and the book_object returned from open endpoints book from id or book search

        let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
        if (!is_user_list) {
            res.status(401).json({'message': 'Tried removing book from list that user does not own.'});
        }

        await booklistModel.delete_book_from_booklist(list_id, book_object.id);

        res.status(200).json({'message': 'Added book to list.'});
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to remove book from booklist'});
    }
};


exports.get_book_info_from_list = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);

        const { list_id } = req.body;


        let is_list_public = await booklistModel.is_list_public(list_id);
        if (!is_list_public) {
            let is_user_list = await booklistModel.does_user_own_list(user_id, list_id);
            if (!is_user_list) {
                return res.status(401).json({'message': 'Tried accessing private list that isnt owned by user.'});  
            }
        }

        const list_data = await booklistModel.get_list_data(list_id);

        res.status(200).json(list_data);       
    } catch (error) {
        res.status(500).json({'message': 'Failed to open list.'});   
    }
};