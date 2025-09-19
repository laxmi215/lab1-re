import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', password: '', givenName: '', familyName: '', phone: ''
  });
  const [error, setError] = useState('');

  const validate = () => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^(\+\d{1,2}\s?)?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!emailRegex.test(form.email)) return 'Invalid email address.';
    if (!passwordRegex.test(form.password)) return 'Password must be 8+ chars, include upper, lower, digit.';
    if (!form.givenName || !form.familyName) return 'Name fields required.';
    if (!phoneRegex.test(form.phone)) return 'Invalid phone number.';
    return '';
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const text = await res.text();
      if (!res.ok) return setError(text);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        {error && <div className="register-error">{error}</div>}
        <input className="register-input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="register-input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input className="register-input" name="givenName" placeholder="Given Name(s)" value={form.givenName} onChange={handleChange} />
        <input className="register-input" name="familyName" placeholder="Family Name(s)" value={form.familyName} onChange={handleChange} />
        <input className="register-input" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        <div className="register-buttons">
          <button className="register-btn" type="submit">Submit</button>
          <button className="register-btn" type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
