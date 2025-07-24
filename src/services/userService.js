const db = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (email, password, role) => {
  const hash = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hash, role],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, email, role });
      }
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, email FROM users', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = { createUser, findUserByEmail, getAllUsers };
