const pool = require('../db');

async function getMyProfile(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name, u.email, u.role, p.*
       FROM users u
       JOIN housing_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateMyProfile(req, res, next) {
  try {
    const p = req.body;

    const result = await pool.query(
      `UPDATE housing_profiles
       SET age=$1, city=$2, budget_min=$3, budget_max=$4, move_in_date=$5,
           pets=$6, smoking=$7, cleanliness_level=$8, sleep_schedule=$9,
           roommate_preference=$10, public_bio=$11, updated_at=CURRENT_TIMESTAMP
       WHERE user_id=$12
       RETURNING *`,
      [
        p.age || null,
        p.city || null,
        p.budget_min || null,
        p.budget_max || null,
        p.move_in_date || null,
        p.pets || false,
        p.smoking || false,
        p.cleanliness_level || null,
        p.sleep_schedule || null,
        p.roommate_preference || null,
        p.public_bio || null,
        req.user.id
      ]
    );

    res.json({ message: 'Profile updated.', profile: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function getAllProfiles(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name, u.email, u.role, p.age, p.city, p.budget_min, p.budget_max,
              p.move_in_date, p.pets, p.smoking, p.cleanliness_level, p.sleep_schedule,
              p.roommate_preference, p.public_bio, p.updated_at
       FROM users u
       JOIN housing_profiles p ON u.id = p.user_id
       ORDER BY u.id`
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { getMyProfile, updateMyProfile, getAllProfiles };
