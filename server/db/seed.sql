INSERT INTO users (full_name, email, password_hash, role)
VALUES
('Syncs Account', 'syncs@example.com', '$2a$10$8qE6Zy7XM0QVdFqMyuU6n.7oubsIqAVt1f6gB5TrSZCmDP2EWv6Yu', 'employee'),
('HR Manager', 'hr@example.com', '$2a$10$8qE6Zy7XM0QVdFqMyuU6n.7oubsIqAVt1f6gB5TrSZCmDP2EWv6Yu', 'hr'),
('Admin Account', 'admin@example.com', '$2a$10$8qE6Zy7XM0QVdFqMyuU6n.7oubsIqAVt1f6gB5TrSZCmDP2EWv6Yu', 'admin');

INSERT INTO housing_profiles
(user_id, age, city, budget_min, budget_max, move_in_date, pets, smoking, cleanliness_level, sleep_schedule, roommate_preference, public_bio)
VALUES
(1, 22, 'Union, NJ', 700, 1100, '2026-06-01', false, false, 'Very clean', 'Night owl', 'Looking for respectful roommate.', 'Employee profile.'),
(2, 35, 'Elizabeth, NJ', 1000, 1600, '2026-08-01', false, false, 'Very clean', 'Early bird', 'HR can view profiles.', 'HR profile.'),
(3, 40, 'Jersey City, NJ', 1200, 2000, '2026-09-01', false, false, 'Clean', 'Flexible', 'Admin controls system.', 'Admin profile.');