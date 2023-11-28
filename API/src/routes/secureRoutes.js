const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const secureController = require('../controllers/secureController');

//booklist operations
router.get('/create-booklist', verifyToken, secureController.create_booklist);
router.get('/get-user-booklists', verifyToken, secureController.get_user_booklists);
router.get('/delete-user-booklist', verifyToken, secureController.delete_user_booklist);
router.get('/get-user-booklists', verifyToken, secureController.get_user_booklists);
router.get('/add-book-to-list', verifyToken, secureController.add_book_to_booklist);
router.get('/delete-book-from-list', verifyToken, secureController.delete_book_from_booklist);


module.exports = router;
