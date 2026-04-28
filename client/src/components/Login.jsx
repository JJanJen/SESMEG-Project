import React, { useState } from 'react';
import { loginUser } from '../api.js';

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('syncs@example.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const user = await loginUser(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card shadow mx-auto form-card">
      <div className="card-body">
        <h2 className="text-center mb-3">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Email</label>
          <input className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="form-label">Password</label>
          <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <button className="btn btn-link w-100 mt-3" onClick={onSwitch}>
          Create an account
        </button>

        <p className="small text-muted mt-3">
          Demo: janisis@example.com / Password123!
          <br />
          HR: hr@example.com / Password123!
          <br />
          Admin: admin@example.com / Password123!
        </p>
      </div>
    </div>
  );
}

export default Login;
