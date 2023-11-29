const express = require('express');
const router = express.Router();
const openController = require('../controllers/openController');

router.post('/search', openController.search);
router.post('/book-info-from-id', openController.book_info_from_id);
router.post('/recent-public-booklists', openController.recent_public_booklists);
router.post('/list-book-info', openController.get_book_info_from_list);

module.exports = router;