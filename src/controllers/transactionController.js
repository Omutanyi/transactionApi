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
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await axios.post(webhookUrl, { transaction });
    }
    res.status(201).json({ message: 'Transaction sent', transaction });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send transaction' });
  }
};
