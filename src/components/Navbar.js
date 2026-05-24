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

  const styles = {
    nav: {
      background: '#0A0A0A',
      borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '0 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none',
    },
    navLinks: {
      display: 'flex',
      gap: '24px',
      alignItems: 'center',
    },
    link: {
      color: '#E0E0E0',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'color 0.3s',
    },
    registerBtn: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '8px 20px',
      borderRadius: '9999px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600,
      marginLeft: '8px',
    },
    logoutBtn: {
      background: 'transparent',
      border: '1px solid #FFD700',
      color: '#FFD700',
      padding: '6px 16px',
      borderRadius: '9999px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
    },
    userName: {
      color: '#FFD700',
      marginRight: '12px',
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo - Only ONE */}
        <Link to="/" style={styles.logo}>
          MSA Yathu
        </Link>

        {/* Navigation Links - No duplicates */}
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/search" style={styles.link}>Search</Link>
          
          {isAuthenticated ? (
            <>
              {user?.userType === 'landlord' && (
                <>
                  <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                  <Link to="/add-listing" style={styles.link}>Add Listing</Link>
                </>
              )}
              <span style={styles.userName}>👋 {user?.name}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;