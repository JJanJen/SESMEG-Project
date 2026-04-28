const express = require('express');
const { getMyProfile, updateMyProfile, getAllProfiles } = require('../controllers/profileController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticateToken, getMyProfile);
router.put('/me', authenticateToken, updateMyProfile);
router.get('/all', authenticateToken, authorizeRoles('hr', 'admin'), getAllProfiles);

module.exports = router;
