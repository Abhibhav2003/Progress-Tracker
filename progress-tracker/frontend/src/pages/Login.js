import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };

  $(document).ready(() => {
    $('.login-btn').hover(
      function () { $(this).css('transform', 'scale(1.05)'); },
      function () { $(this).css('transform', 'scale(1)'); }
    );
  });

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="auth-links">
        <a href="/signup" className="signup-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
