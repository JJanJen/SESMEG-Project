import React, { useState } from 'react';
import { registerUser } from '../api.js';

function Register({ onSwitch }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password123!');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await registerUser(fullName, email, password);
      setMessage('Account created. You can login now.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card shadow mx-auto form-card">
      <div className="card-body">
        <h2 className="text-center mb-3">Register</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Full Name</label>
          <input className="form-control mb-3" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label className="form-label">Email</label>
          <input className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="form-label">Password</label>
          <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-success w-100">Register</button>
        </form>

        <button className="btn btn-link w-100 mt-3" onClick={onSwitch}>
          Back to login
        </button>
      </div>
    </div>
  );
}

export default Register;
