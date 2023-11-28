const booklistModel = require('../models/booklistModel');
const userModel = require('../src/models/userModel');


exports.create_booklist = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        let user_id = userModel.getUserIdFromToken(token);
        let num_lists = booklistModel.num_booklists_by_user(user_id);

        if (num_lists >= 20) {
            res.status(403).json({'message': 'Too many lists already. Maximum number of lists already exist.'})
        }


        const { list_name, is_public = false   } = req.body;

        let username = userModel.getUsernameFromId(user_id);
        booklistModel.create_booklist_db(user_id, username, list_name, is_public);


        res.status(200).json({'message': 'Booklist created.'});
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to create booklist'});
    }
};