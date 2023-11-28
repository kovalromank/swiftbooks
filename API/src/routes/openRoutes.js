const express = require('express');
const router = express.Router();
const openController = require('../controllers/openController');

router.post('/search', openController.search);

module.exports = router;