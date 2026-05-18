import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    loginCard: {
      maxWidth: '480px',
      width: '100%',
      background: '#111111',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid #2A2A2A',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    logo: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logoIcon: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      fontSize: '32px'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    tagline: {
      textAlign: 'center',
      color: '#A0A0A0',
      fontSize: '14px',
      marginTop: '8px'
    },
    header: {
      marginBottom: '32px',
      textAlign: 'center'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#A0A0A0',
      fontSize: '14px'
    },
    errorAlert: {
      background: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid rgba(244, 67, 54, 0.3)',
      borderRadius: '12px',
      padding: '14px 16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    errorIcon: {
      fontSize: '20px'
    },
    errorText: {
      color: '#F44336',
      fontSize: '14px',
      flex: 1
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#CCCCCC',
      fontSize: '14px',
      fontWeight: '500'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px'
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      background: '#1A1A1A',
      border: '1px solid #2A2A2A',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#FFFFFF',
      transition: 'all 0.3s ease'
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#A0A0A0',
      cursor: 'pointer',
      fontSize: '18px'
    },
    checkboxGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '28px'
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    checkboxInput: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#FFD700'
    },
    checkboxLabel: {
      color: '#A0A0A0',
      fontSize: '14px',
      cursor: 'pointer'
    },
    forgotLink: {
      color: '#FFD700',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.3s ease'
    },
    loginButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '16px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '24px'
    },
    loginButtonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    registerLink: {
      textAlign: 'center',
      color: '#A0A0A0',
      fontSize: '14px'
    },
    link: {
      color: '#FFD700',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '8px'
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#FFD700';
    e.target.style.boxShadow = '0 0 0 3px rgba(255, 215, 0, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#2A2A2A';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🏠</div>
          <div style={styles.logoText}>MSA Yathu</div>
          <div style={styles.tagline}>Malawi Student Accommodation</div>
        </div>

        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to continue your housing journey</p>
        </div>

        {error && (
          <div style={styles.errorAlert}>
            <span style={styles.errorIcon}>⚠️</span>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                placeholder="Enter your email"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                placeholder="Enter your password"
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div style={styles.checkboxGroup}>
            <label style={styles.checkbox}>
              <input type="checkbox" style={styles.checkboxInput} />
              <span style={styles.checkboxLabel}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              ...(loading ? styles.loginButtonDisabled : {})
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.registerLink}>
          Don't have an account?
          <Link to="/register" style={styles.link}>
            Create Account →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;