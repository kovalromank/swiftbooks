const express = require('express');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/get-users', verifyAdmin, adminController.get_users); //not tested
router.put('/change-user-status', verifyAdmin, adminController.change_user_status); //not tested
router.put('/change-user-active', verifyAdmin, adminController.change_user_active); //not tested