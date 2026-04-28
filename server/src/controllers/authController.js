const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

async function register(req, res, next) {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, 'employee')
       RETURNING id, full_name, email, role`,
      [full_name, email, passwordHash]
    );

    await pool.query(
      `INSERT INTO housing_profiles (user_id, public_bio)
       VALUES ($1, 'New roommate finder profile.')`,
      [userResult.rows[0].id]
    );

    res.status(201).json({ message: 'Registered successfully.', user: userResult.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid login.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Invalid login.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.json({ message: 'Logout successful.' });
}

module.exports = { register, login, logout };
