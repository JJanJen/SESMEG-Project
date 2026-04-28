import React, { useState } from 'react';
import ProfileForm from './ProfileForm.jsx';
import HRPanel from './HRPanel.jsx';

function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState('profile');
  const canViewHR = user.role === 'hr' || user.role === 'admin';

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Housing Roommate Finder</span>
          <div>
            <span className="text-white me-3">{user.full_name} | {user.role}</span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <button className="btn btn-primary me-2" onClick={() => setTab('profile')}>My Profile</button>
        {canViewHR && <button className="btn btn-outline-primary" onClick={() => setTab('hr')}>HR View</button>}

        <div className="mt-4">
          {tab === 'profile' && <ProfileForm />}
          {tab === 'hr' && canViewHR && <HRPanel />}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
