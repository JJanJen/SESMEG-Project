const pool = require('../db');

async function updateUserRole(req, res, next) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['employee', 'hr', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role.' });
    }

    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, full_name, email, role',
      [role, userId]
    );

    res.json({ message: 'Role updated.', user: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

module.exports = { updateUserRole };
