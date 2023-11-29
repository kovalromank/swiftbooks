const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const secureController = require('../controllers/secureController');


//booklist operations
router.post('/create-booklist', verifyToken, secureController.create_booklist);
router.post('/get-user-booklists', verifyToken, secureController.get_user_booklists);
router.post('/delete-user-booklist', verifyToken, secureController.delete_user_booklist);
router.post('/add-book-to-list', verifyToken, secureController.add_book_to_booklist);
router.post('/delete-book-from-list', verifyToken, secureController.delete_book_from_booklist);
router.post('/get-booklist-books', verifyToken, secureController.get_book_info_from_list);


module.exports = router;
