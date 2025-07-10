import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'User already exists or error occurred');
    }
  };

  $(document).ready(() => {
    $('.signup-btn').hover(
      function () { $(this).css('transform', 'scale(1.05)'); },
      function () { $(this).css('transform', 'scale(1)'); }
    );
  });

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <div className="auth-links">
        <a href="/login" className="login-link">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Signup;
