import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`https://msa-yathu-api.onrender.com/api/listings/${id}`);
      setListing(response.data);
    } catch (err) {
      console.error('Error fetching listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => {
    if (listing?.landlordPhone) {
      window.location.href = `tel:${listing.landlordPhone}`;
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!listing) return <div className="container">Listing not found</div>;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <button onClick={() => navigate(-1)} className="btn-secondary" style={{ marginBottom: '20px' }}>
        ← Back
      </button>
      
      <div className="card" style={{ padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <img 
              src={listing.photos?.[0] || 'https://via.placeholder.com/500x400?text=Property+Image'} 
              alt={listing.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div>
            <h1 style={{ marginBottom: '15px' }}>{listing.title}</h1>
            <p style={{ fontSize: '32px', color: '#667eea', fontWeight: 'bold', marginBottom: '20px' }}>
              MK{listing.price?.toLocaleString()}/month
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <p><strong>📍 Location:</strong> {listing.location}</p>
              <p><strong>🏢 Address:</strong> {listing.address}</p>
              <p><strong>🏫 Nearest University:</strong> {listing.nearestUniversity}</p>
              <p><strong>🚶 Distance:</strong> {listing.distanceFromCampus}</p>
              <p><strong>🏠 Room Type:</strong> {listing.roomType}</p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3>Amenities</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                {listing.amenities?.map((amenity, index) => (
                  <span key={index} style={{ background: '#f0f0f0', padding: '5px 15px', borderRadius: '20px' }}>
                    ✅ {amenity.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3>Description</h3>
              <p>{listing.description}</p>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
              <h3>Contact Landlord</h3>
              <p><strong>Name:</strong> {listing.landlordName}</p>
              <p><strong>Phone:</strong> {listing.landlordPhone}</p>
              <p><strong>Email:</strong> {listing.landlordEmail}</p>
              <button onClick={handleContact} className="btn-primary" style={{ marginTop: '10px' }}>
                📞 Call Landlord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;