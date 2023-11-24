const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

//router.get('/some-protected-route', verifyToken, //func goes here);

module.exports = router;
