const express = require('express');
const router = express.Router();
const openController = require('../controllers/openController');

router.get('/search', openController.search); // no test cases
router.get('/book-info-from-id', openController.book_info_from_id); // no test cases
router.get('/recent-public-booklists', openController.recent_public_booklists); // no test cases
router.get('/list-book-ids', openController.get_book_ids_from_list); // no test cases
router.get('/booklist-info-by-id', openController.booklist_info_from_id); //no test cases
router.get('/get-reviews-for-list', openController.get_reviews_for_list); 


module.exports = router;