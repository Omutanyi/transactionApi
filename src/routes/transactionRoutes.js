const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/transactions', authMiddleware, transactionController.getTransactions);
router.post('/send', authMiddleware, transactionController.sendTransaction);

module.exports = router;
