DROP TABLE IF EXISTS housing_profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'employee',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE housing_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  age INTEGER,
  city VARCHAR(100),
  budget_min INTEGER,
  budget_max INTEGER,
  move_in_date DATE,
  pets BOOLEAN DEFAULT false,
  smoking BOOLEAN DEFAULT false,
  cleanliness_level VARCHAR(50),
  sleep_schedule VARCHAR(50),
  roommate_preference TEXT,
  public_bio TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
