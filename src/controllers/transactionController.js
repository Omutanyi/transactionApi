const transactionService = require('../services/transactionService');
const axios = require('axios');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactionsByUser(req.user.id);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

exports.sendTransaction = async (req, res) => {
  const { recipient_id, amount, currency, type } = req.body;
  if (!recipient_id || !amount || !currency || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const transaction = await transactionService.createTransaction(req.user.id, recipient_id, amount, currency, type);
    // Trigger webhook
    await axios.post('https://usewebhook.com/146d51b59f3525bac3b551b2d11f1435', { transaction });
    res.status(201).json({ message: 'Transaction sent', transaction });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send transaction' });
  }
};
