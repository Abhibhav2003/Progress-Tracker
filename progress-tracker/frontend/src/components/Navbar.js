import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';
import $ from 'jquery';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  $(document).ready(() => {
    $('.navbar a').hover(
      function () { $(this).css('color', theme === 'light' ? '#3b82f6' : '#93c5fd'); },
      function () { $(this).css('color', theme === 'light' ? '#1e40af' : '#60a5fa'); }
    );
    $('.logout-btn').hover(
      function () {
        $(this).css('animation', 'shake 0.5s');
        $(this).css('transform', 'scale(1.05)');
      },
      function () {
        $(this).css('animation', 'none');
        $(this).css('transform', 'scale(1)');
      }
    );
  });

  return (
    <nav className="navbar">
      <ul>
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><button className="theme-toggle" onClick={toggleTheme}>{theme === 'light' ? '🌙 Dark' : '☀ Light'}</button></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(style);

export default Navbar;