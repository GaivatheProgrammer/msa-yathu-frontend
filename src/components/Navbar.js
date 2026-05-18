import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            🏠 MSA Yathu
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            {/* Removed duplicate About link - only keep one */}
            {isAuthenticated ? (
              <>
                {user?.userType === 'landlord' && (
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/add-listing">Add Listing</Link>
                  </>
                )}
                <span>👋 {user?.name}</span>
                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">
                  <button className="btn-primary" style={{ padding: '8px 20px' }}>
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;