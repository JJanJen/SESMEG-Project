import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../api.js';

function HRPanel() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAllProfiles();
      setProfiles(data);
    }

    load();
  }, []);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2>HR / Manager View</h2>
        <p className="text-muted">HR and admin users can view all roommate finder profiles.</p>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>City</th>
                <th>Budget</th>
                <th>Move In</th>
                <th>Pets</th>
                <th>Smoking</th>
                <th>Preference</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id}>
                  <td>{p.full_name}</td>
                  <td>{p.role}</td>
                  <td>{p.city}</td>
                  <td>${p.budget_min} - ${p.budget_max}</td>
                  <td>{p.move_in_date ? p.move_in_date.substring(0, 10) : ''}</td>
                  <td>{p.pets ? 'Yes' : 'No'}</td>
                  <td>{p.smoking ? 'Yes' : 'No'}</td>
                  <td>{p.roommate_preference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default HRPanel;
