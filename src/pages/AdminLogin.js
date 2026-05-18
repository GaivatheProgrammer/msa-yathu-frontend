import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
    },
    card: {
      background: '#111111',
      padding: '48px',
      borderRadius: '24px',
      border: '1px solid #FFD700',
      maxWidth: '450px',
      width: '90%',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#FFD700',
      marginBottom: '8px',
      textAlign: 'center',
    },
    subtitle: {
      color: '#A0A0A0',
      textAlign: 'center',
      marginBottom: '32px',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      color: '#CCCCCC',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      background: '#1A1A1A',
      border: '1px solid #2A2A2A',
      borderRadius: '8px',
      color: '#FFFFFF',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    error: {
      background: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid #F44336',
      borderRadius: '8px',
      padding: '12px',
      color: '#F44336',
      marginBottom: '20px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Portal</h1>
        <p style={styles.subtitle}>Secure access for administrators</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;