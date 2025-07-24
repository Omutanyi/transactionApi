const db = require('../models/transactionModel');
const userDb = require('../models/userModel');

const getTransactionsByUser = async (user_id) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM transactions WHERE user_id = ?', [user_id], async (err, rows) => {
            if (err) return reject(err);
            try {
                const transactionsWithRecipient = await Promise.all(
                    rows.map(async (tx) => {
                        const userRow = await new Promise((res, rej) => {
                            userDb.get('SELECT email FROM users WHERE id = ?', [tx.recipient_id], (userErr, userRow) => {
                                if (userErr) return rej(userErr);
                                res({ ...tx, recipient: userRow });
                            });
                        });
                        return userRow;
                    })
                );
                resolve(transactionsWithRecipient);
            } catch (e) {
                reject(e);
            }
        });
    });
};

const createTransaction = (user_id, recipient_id, amount, currency, type) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO transactions (user_id, recipient_id, amount, currency, type) VALUES (?, ?, ?, ?, ?)',
      [user_id, recipient_id, amount, currency, type],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, user_id, recipient_id, amount, currency, type });
      }
    );
  });
};

module.exports = { getTransactionsByUser, createTransaction };
