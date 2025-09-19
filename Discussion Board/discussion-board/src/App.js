import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function ProtectedPage() {
  return <div>Welcome to the protected page!</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={
          <ProtectedRoute>
            <ProtectedPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
