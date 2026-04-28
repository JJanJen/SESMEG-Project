const express = require('express');
const { updateUserRole } = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/users/:userId/role', authenticateToken, authorizeRoles('admin'), updateUserRole);

module.exports = router;
