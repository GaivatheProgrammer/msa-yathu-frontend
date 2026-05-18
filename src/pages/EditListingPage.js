import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
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
    landlordName: '',
    landlordEmail: '',
    landlordPhone: ''
  });

  const universities = [
    'University of Malawi',
    'Mzuzu University',
    'Lilongwe University of Agriculture and Natural Resources',
    'Malawi University of Science and Technology',
    'Malawi University of Business and Applied Sciences'
  ];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/listings/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error('Error fetching listing:', err);
      alert('Failed to load listing');
      navigate('/dashboard');
    } finally {
      setFetchLoading(false);
    }
  };

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

    try {
      await axios.put(`http://localhost:5001/api/listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Listing updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating listing:', err);
      alert('Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="spinner"></div>;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Edit Listing</h1>
      
      <form onSubmit={handleSubmit} className="card" style={{ padding: '30px' }}>
        <div className="input-group">
          <label>Property Title *</label>
          <input 
            type="text" 
            name="title" 
            required 
            value={formData.title} 
            onChange={handleChange}
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
              <input type="checkbox" value="wifi" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('wifi')} /> 
              WiFi
            </label>
            <label>
              <input type="checkbox" value="utilities_included" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('utilities_included')} /> 
              Utilities Included
            </label>
            <label>
              <input type="checkbox" value="furnished" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('furnished')} /> 
              Furnished
            </label>
            <label>
              <input type="checkbox" value="parking" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('parking')} /> 
              Parking
            </label>
            <label>
              <input type="checkbox" value="security" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('security')} /> 
              Security
            </label>
            <label>
              <input type="checkbox" value="water_included" onChange={handleAmenitiesChange} checked={formData.amenities?.includes('water_included')} /> 
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
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading} 
          style={{ width: '100%' }}
        >
          {loading ? 'Updating...' : 'Update Listing'}
        </button>
      </form>
    </div>
  );
};

export default EditListingPage;