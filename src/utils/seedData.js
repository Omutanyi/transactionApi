const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = new sqlite3.Database(process.env.DB_PATH);

async function seedUsers() {
    const users = [
        { email: 'psp1@example.com', password: 'password1', role: 'psp' },
        { email: 'dev1@example.com', password: 'password2', role: 'dev' },
        { email: 'psp2@example.com', password: 'password3', role: 'psp' },
        { email: 'dev2@example.com', password: 'password4', role: 'dev' }
    ];
    for (const user of users) {
        const hash = await bcrypt.hash(user.password, 10);
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT OR IGNORE INTO users (email, password, role) VALUES (?, ?, ?)',
                [user.email, hash, user.role],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }
}

function seedTransactions() {
    const transactions = [
        { user_id: 1, recipient_id: 2, amount: 100, currency: 'USD', type: 'refund' },
        { user_id: 2, recipient_id: 1, amount: 50, currency: 'USD', type: 'refund' },
        { user_id: 3, recipient_id: 4, amount: 200, currency: 'EUR', type: 'payment' }
    ];
    transactions.forEach(tx => {
        db.run(
            'INSERT INTO transactions (user_id, recipient_id, amount, currency, type) VALUES (?, ?, ?, ?, ?)',
            [tx.user_id, tx.recipient_id, tx.amount, tx.currency, tx.type]
        );
    });
}

async function seedAll() {
    await seedUsers();
    seedTransactions();
    console.log('Seeded users and transactions');
    db.close();
}

if (require.main === module) {
    seedAll();
}

module.exports = { seedUsers, seedTransactions, seedAll };
