const express = require('express');
const router = express.Router();
const openController = require('../controllers/openController');

router.get('/search', openController.search);
router.get('/book-info-from-id', openController.book_info_from_id);
router.get('/recent-public-booklists', openController.recent_public_booklists);
router.get('/list-book-ids', openController.get_book_ids_from_list);

module.exports = router;