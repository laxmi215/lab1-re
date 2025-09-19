import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) return setError(data || 'Login failed');
      alert('Login successful! Token: ' + data.token);
      // You can store token in localStorage/sessionStorage if needed
      navigate('/');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <form className="bg-white p-4 rounded shadow" style={{ maxWidth: 400, width: '100%' }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-primary" style={{ fontSize: '2rem', textAlign: 'center' }}>Login</h2>
        {error && <div className="alert alert-danger text-center" style={{ fontSize: '1.1rem' }}>{error}</div>}
        <input
          className="form-control mb-3"
          style={{ fontSize: '1.15rem', padding: '0.7rem 1rem' }}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          style={{ fontSize: '1.15rem', padding: '0.7rem 1rem' }}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <div className="d-flex gap-3 justify-content-center mt-3">
          <button type="submit" className="btn btn-success btn-lg px-4">Submit</button>
          <button type="button" className="btn btn-danger btn-lg px-4" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
