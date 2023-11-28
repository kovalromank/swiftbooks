const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const secureController = require('../controllers/secureController');

router.get('/some-protected-route', verifyToken, secureController.create_booklist);

module.exports = router;
