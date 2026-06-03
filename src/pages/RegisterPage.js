import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'student',
    university: '',
    propertyInfo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      userType: formData.userType,
    };

    if (formData.userType === 'student') {
      userData.university = formData.university;
    } else {
      userData.propertyInfo = formData.propertyInfo;
    }

    const result = await register(userData);
    
    if (result.success) {
      // ✅ SUCCESS - Redirect to homepage
      navigate('/');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const universities = [
    'University of Malawi (UNIMA)',
    'Mzuzu University (MZUNI)',
    'Lilongwe University of Agriculture and Natural Resources (LUANAR)',
    'Malawi University of Science and Technology (MUST)',
    'Malawi University of Business and Applied Sciences (MUBAS)',
    'Kamuzu University of Health Sciences (KUHeS)'
  ];

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: '#000000',
    },
    card: {
      maxWidth: '550px',
      width: '100%',
      background: '#0A0A0A',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(255,215,0,0.2)',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#FFFFFF',
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
      marginBottom: '8px',
      color: '#CCCCCC',
      fontSize: '14px',
      fontWeight: '500',
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
    select: {
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
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '14px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
    },
    errorAlert: {
      background: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid #F44336',
      borderRadius: '8px',
      padding: '12px',
      color: '#F44336',
      marginBottom: '20px',
      textAlign: 'center',
    },
    link: {
      color: '#FFD700',
      textDecoration: 'none',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#A0A0A0',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join MSA Yathu today</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="0888 123 456"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>I am a:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="student">Student looking for accommodation</option>
              <option value="landlord">Landlord with property to rent</option>
            </select>
          </div>

          {formData.userType === 'student' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>University</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select your university</option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
              </select>
            </div>
          )}

          {formData.userType === 'landlord' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Property Information</label>
              <textarea
                name="propertyInfo"
                value={formData.propertyInfo}
                onChange={handleChange}
                required
                rows="3"
                style={styles.input}
                placeholder="Describe your properties..."
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Minimum 6 characters"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div style={styles.registerLink}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;