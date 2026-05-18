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
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const universities = [
    'University of Malawi',
    'Mzuzu University',
    'Lilongwe University of Agriculture and Natural Resources',
    'Malawi University of Science and Technology',
    'Malawi University of Business and Applied Sciences'
  ];

  return (
    <div className="container" style={{ 
      minHeight: 'calc(100vh - 80px)', 
      padding: '40px 20px'
    }}>
      <div className="card" style={{ maxWidth: '550px', width: '100%', margin: '0 auto', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📝</div>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Create an Account</h2>
          <p style={{ color: '#666' }}>Join our community today</p>
        </div>

        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Daniel Gaiva White"
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Whitedaniel381@gmail.com"
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0886606571"
            />
          </div>

          <div className="input-group">
            <label>I am a:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="student">Student looking for accommodation</option>
              <option value="landlord">Landlord with property to rent</option>
            </select>
          </div>

          {formData.userType === 'student' && (
            <div className="input-group">
              <label>University</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
              >
                <option value="">Select your university</option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
              </select>
            </div>
          )}

          {formData.userType === 'landlord' && (
            <div className="input-group">
              <label>Property Information</label>
              <textarea
                name="propertyInfo"
                value={formData.propertyInfo}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Describe your properties or portfolio..."
              />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;