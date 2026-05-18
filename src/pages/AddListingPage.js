import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AddListingPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    address: '',
    nearestUniversity: '',
    distanceFromCampus: '',
    roomType: 'single',
    amenities: [],
    description: '',
    landlordName: user?.name || '',
    landlordEmail: user?.email || '',
    landlordPhone: ''
  });

  const universities = [
    'University of Malawi',
    'Mzuzu University',
    'Lilongwe University of Agriculture and Natural Resources',
    'Malawi University of Science and Technology',
    'Malawi University of Business and Applied Sciences'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value]
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(a => a !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.title || !formData.price || !formData.location || !formData.address || 
        !formData.nearestUniversity || !formData.distanceFromCampus || !formData.description || 
        !formData.landlordPhone) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/listings', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Listing created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating listing:', err);
      alert('Failed to create listing. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Add New Listing</h1>
      
      <form onSubmit={handleSubmit} className="card" style={{ padding: '30px' }}>
        <div className="input-group">
          <label>Property Title *</label>
          <input 
            type="text" 
            name="title" 
            required 
            value={formData.title} 
            onChange={handleChange}
            placeholder="e.g., Cozy Studio Apartment"
          />
        </div>

        <div className="input-group">
          <label>Price (MK per month) *</label>
          <input 
            type="number" 
            name="price" 
            required 
            value={formData.price} 
            onChange={handleChange}
            placeholder="e.g., 150000"
          />
        </div>

        <div className="input-group">
          <label>Location/Area *</label>
          <input 
            type="text" 
            name="location" 
            required 
            value={formData.location} 
            onChange={handleChange}
            placeholder="e.g., Area 47, Lilongwe"
          />
        </div>

        <div className="input-group">
          <label>Full Address *</label>
          <input 
            type="text" 
            name="address" 
            required 
            value={formData.address} 
            onChange={handleChange}
            placeholder="e.g., House Number 123, Street Name"
          />
        </div>

        <div className="input-group">
          <label>Nearest University *</label>
          <select 
            name="nearestUniversity" 
            required 
            value={formData.nearestUniversity} 
            onChange={handleChange}
          >
            <option value="">Select University</option>
            {universities.map((uni, index) => (
              <option key={index} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Distance from Campus *</label>
          <input 
            type="text" 
            name="distanceFromCampus" 
            required 
            placeholder="e.g., 500m, 1km" 
            value={formData.distanceFromCampus} 
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Room Type *</label>
          <select name="roomType" value={formData.roomType} onChange={handleChange}>
            <option value="single">Single Room</option>
            <option value="shared">Shared Room</option>
            <option value="apartment">Apartment</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div className="input-group">
          <label>Amenities</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <label>
              <input type="checkbox" value="wifi" onChange={handleAmenitiesChange} /> 
              WiFi
            </label>
            <label>
              <input type="checkbox" value="utilities_included" onChange={handleAmenitiesChange} /> 
              Utilities Included
            </label>
            <label>
              <input type="checkbox" value="furnished" onChange={handleAmenitiesChange} /> 
              Furnished
            </label>
            <label>
              <input type="checkbox" value="parking" onChange={handleAmenitiesChange} /> 
              Parking
            </label>
            <label>
              <input type="checkbox" value="security" onChange={handleAmenitiesChange} /> 
              Security
            </label>
            <label>
              <input type="checkbox" value="water_included" onChange={handleAmenitiesChange} /> 
              Water Included
            </label>
          </div>
        </div>

        <div className="input-group">
          <label>Description *</label>
          <textarea 
            name="description" 
            rows="5" 
            required 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Describe the property, nearby facilities, terms, etc."
          />
        </div>

        <div className="input-group">
          <label>Landlord Phone *</label>
          <input 
            type="tel" 
            name="landlordPhone" 
            required 
            value={formData.landlordPhone} 
            onChange={handleChange}
            placeholder="e.g., 0888123456"
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading} 
          style={{ width: '100%' }}
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;