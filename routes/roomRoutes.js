const express = require('express');
const { createRoom } = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createRoom);

module.exports = router;