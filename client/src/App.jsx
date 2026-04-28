import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import { getUser, logoutUser } from './api.js';

function App() {
  const [user, setUser] = useState(getUser());
  const [showRegister, setShowRegister] = useState(false);

  function handleLogout() {
    logoutUser();
    setUser(null);
  }

  if (!user) {
    return (
      <div className="app-bg">
        <div className="container py-5">
          <div className="text-center text-white mb-4">
            <h1>Housing Roommate Finder</h1>
            <p>Secure roommate profile system for employees, HR, and admins.</p>
          </div>

          {showRegister ? (
            <Register onSwitch={() => setShowRegister(false)} />
          ) : (
            <Login onLogin={setUser} onSwitch={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
