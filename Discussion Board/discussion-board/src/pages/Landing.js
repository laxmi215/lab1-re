import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="landing-card text-center p-5 rounded shadow">
        <h2 className="mb-4 landing-title">Welcome to the Authentication Demo</h2>
        <div className="d-flex gap-4 justify-content-center">
          <button className="landing-btn btn btn-primary btn-lg" onClick={() => navigate('/register')}>Register</button>
          <button className="landing-btn btn btn-success btn-lg" onClick={() => navigate('/login')}>Login</button>
          <button className="landing-btn btn btn-danger btn-lg" onClick={() => window.location.href = 'https://www.google.ca'}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;