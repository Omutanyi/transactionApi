const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !['psp', 'dev'].includes(role)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const user = await userService.createUser(email, password, role);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
let { email, password } = req.body;
email = email ? email.trim() : '';
if (!email || !password) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', success: true, token: token, user: user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
