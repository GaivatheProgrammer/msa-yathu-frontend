import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LandlordDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/listings/landlord/my-listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(response.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await axios.delete(`http://localhost:5001/api/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMyListings();
      } catch (err) {
        console.error('Error deleting listing:', err);
      }
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Dashboard</h1>
        <Link to="/add-listing">
          <button className="btn-primary">+ Add New Listing</button>
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{listings.length}</h3>
          <p>Total Listings</p>
        </div>
        <div className="stat-card">
          <h3>{listings.filter(l => l.isActive).length}</h3>
          <p>Active Listings</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : listings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <p>You haven't posted any listings yet.</p>
          <Link to="/add-listing">
            <button className="btn-primary" style={{ marginTop: '20px' }}>Create Your First Listing</button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          {listings.map(listing => (
            <div key={listing._id} className="card">
              <img 
                src={listing.photos?.[0] || 'https://via.placeholder.com/400x200?text=Property'} 
                alt={listing.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3>{listing.title}</h3>
                <p>MK{listing.price?.toLocaleString()}/month</p>
                <p>{listing.location}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <Link to={`/edit-listing/${listing._id}`}>
                    <button className="btn-secondary">Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(listing._id)} className="btn-secondary" style={{ background: '#dc3545' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordDashboard;