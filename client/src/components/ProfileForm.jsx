import React, { useEffect, useState } from 'react';
import { getMyProfile, saveMyProfile } from '../api.js';

function ProfileForm() {
  const [profile, setProfile] = useState({
    age: '',
    city: '',
    budget_min: '',
    budget_max: '',
    move_in_date: '',
    pets: false,
    smoking: false,
    cleanliness_level: '',
    sleep_schedule: '',
    roommate_preference: '',
    public_bio: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getMyProfile();
      setProfile({
        age: data.age || '',
        city: data.city || '',
        budget_min: data.budget_min || '',
        budget_max: data.budget_max || '',
        move_in_date: data.move_in_date ? data.move_in_date.substring(0, 10) : '',
        pets: data.pets || false,
        smoking: data.smoking || false,
        cleanliness_level: data.cleanliness_level || '',
        sleep_schedule: data.sleep_schedule || '',
        roommate_preference: data.roommate_preference || '',
        public_bio: data.public_bio || ''
      });
    }

    load();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setProfile({ ...profile, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await saveMyProfile(profile);
    setMessage('Profile saved.');
  }

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2>My Housing Profile</h2>
        <p className="text-muted">Employees can update their roommate finder information.</p>

        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Age</label>
              <input className="form-control" name="age" value={profile.age} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>City</label>
              <input className="form-control" name="city" value={profile.city} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Move-in Date</label>
              <input className="form-control" type="date" name="move_in_date" value={profile.move_in_date} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Minimum Budget</label>
              <input className="form-control" name="budget_min" value={profile.budget_min} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Maximum Budget</label>
              <input className="form-control" name="budget_max" value={profile.budget_max} onChange={handleChange} />
            </div>
          </div>

          <label>Cleanliness Level</label>
          <input className="form-control mb-3" name="cleanliness_level" value={profile.cleanliness_level} onChange={handleChange} />

          <label>Sleep Schedule</label>
          <input className="form-control mb-3" name="sleep_schedule" value={profile.sleep_schedule} onChange={handleChange} />

          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" name="pets" checked={profile.pets} onChange={handleChange} />
            <label className="form-check-label">I have pets</label>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="smoking" checked={profile.smoking} onChange={handleChange} />
            <label className="form-check-label">I smoke</label>
          </div>

          <label>Roommate Preference</label>
          <textarea className="form-control mb-3" name="roommate_preference" value={profile.roommate_preference} onChange={handleChange}></textarea>

          <label>Public Bio</label>
          <textarea className="form-control mb-3" name="public_bio" value={profile.public_bio} onChange={handleChange}></textarea>

          <button className="btn btn-primary">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
