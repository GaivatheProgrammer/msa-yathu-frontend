import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`https://msa-yathu-api.onrender.com/api/listings/${id}`);
      setListing(response.data);
    } catch (err) {
      console.error('Error fetching listing:', err);
      setListing(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContactLandlord = () => {
    const hostelName = listing?.title || 'Hostel';
    window.location.href = `mailto:whitedaniel381@gmail.com?subject=Accommodation Inquiry: ${hostelName}&body=Hello Gaiva,%0D%0A%0D%0AI'm interested in the following accommodation:%0D%0A%0D%0AHostel: ${hostelName}%0D%0ALocation: ${listing?.location}%0D%0APrice: MK${listing?.price?.toLocaleString()}%0D%0A%0D%0APlease connect me with the landlord.%0D%0A%0D%0AThank you!`;
  };

  const defaultImage = 'https://via.placeholder.com/600x400?text=MSA+Yathu';

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF'
    },
    backButton: {
      background: 'transparent',
      border: '1px solid rgba(255,215,0,0.3)',
      color: '#FFD700',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '24px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    card: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      background: '#111111',
      padding: '40px',
      borderRadius: '20px',
      border: '1px solid rgba(255,215,0,0.15)'
    },
    imageWrapper: {
      width: '100%'
    },
    image: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '12px',
      backgroundColor: '#1A1A1A'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#FFD700',
      marginBottom: '12px'
    },
    price: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '16px'
    },
    priceSpan: {
      fontSize: '16px',
      color: '#A0A0A0',
      fontWeight: '400'
    },
    infoRow: {
      color: '#CCCCCC',
      marginBottom: '4px',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    sectionTitle: {
      color: '#FFD700',
      fontSize: '18px',
      fontWeight: '600',
      marginTop: '16px',
      marginBottom: '8px'
    },
    amenitiesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
      marginBottom: '16px'
    },
    amenityBadge: {
      background: '#1A1A1A',
      padding: '6px 14px',
      borderRadius: '100px',
      color: '#CCCCCC',
      fontSize: '13px'
    },
    description: {
      color: '#CCCCCC',
      lineHeight: '1.8',
      marginBottom: '16px'
    },
    contactCard: {
      background: '#0A0A0A',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid rgba(255,215,0,0.15)',
      marginTop: '16px'
    },
    contactName: {
      color: '#FFFFFF',
      marginBottom: '4px'
    },
    contactDetail: {
      color: '#CCCCCC',
      marginBottom: '2px',
      fontSize: '14px'
    },
    contactButton: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '14px 24px',
      border: 'none',
      borderRadius: '10px',
      fontWeight: '700',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '12px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    notFound: {
      textAlign: 'center',
      padding: '60px 20px'
    },
    notFoundTitle: {
      fontSize: '36px',
      marginBottom: '12px',
      color: '#FFD700'
    },
    notFoundText: {
      color: '#A0A0A0',
      marginBottom: '24px'
    },
    notFoundButton: {
      background: '#FFD700',
      color: '#000000',
      padding: '12px 32px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '3px solid rgba(255,215,0,0.15)',
      borderTop: '3px solid #FFD700',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h2 style={styles.notFoundTitle}>🏠 Listing Not Found</h2>
          <p style={styles.notFoundText}>
            We couldn't find this accommodation. It may have been removed or is no longer available.
          </p>
          <button 
            onClick={() => navigate('/search')} 
            style={styles.notFoundButton}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Browse Other Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate(-1)} 
        style={styles.backButton}
        onMouseEnter={(e) => e.target.style.borderColor = '#FFD700'}
        onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,215,0,0.3)'}
      >
        ← Back to Search
      </button>

      <div style={styles.card}>
        {/* Image Section */}
        <div style={styles.imageWrapper}>
          <img
            src={!imageError && listing.photos && listing.photos.length > 0 
              ? listing.photos[0] 
              : defaultImage}
            alt={listing.title}
            style={styles.image}
            onError={() => {
              setImageError(true);
            }}
          />
        </div>

        {/* Details Section */}
        <div>
          <h1 style={styles.title}>{listing.title}</h1>
          <div style={styles.price}>
            MK{listing.price?.toLocaleString()}
            <span style={styles.priceSpan}> / month</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={styles.infoRow}>📍 {listing.location}</p>
            <p style={styles.infoRow}>🏫 {listing.nearestUniversity}</p>
            <p style={styles.infoRow}>🚶 {listing.distanceFromCampus} from campus</p>
            <p style={styles.infoRow}>🏠 Room Type: {listing.roomType}</p>
          </div>

          {/* Amenities */}
          <h3 style={styles.sectionTitle}>✨ Amenities</h3>
          <div style={styles.amenitiesContainer}>
            {listing.amenities?.map((amenity, index) => (
              <span key={index} style={styles.amenityBadge}>
                {amenity === 'wifi' ? '📶 WiFi' : 
                 amenity === 'security' ? '🔒 Security' : 
                 amenity === 'parking' ? '🅿️ Parking' : 
                 amenity === 'furnished' ? '🛋️ Furnished' :
                 amenity === 'utilities_included' ? '💡 Utilities Included' :
                 amenity === 'water_included' ? '💧 Water Included' : amenity}
              </span>
            ))}
          </div>

          {/* Description */}
          <h3 style={styles.sectionTitle}>📝 Description</h3>
          <p style={styles.description}>{listing.description}</p>

          {/* Contact Section */}
          <div style={styles.contactCard}>
            <h3 style={{ color: '#FFD700', marginBottom: '12px', fontSize: '18px' }}>📞 Contact Landlord</h3>
            <p style={styles.contactName}><strong>Name:</strong> {listing.landlordName}</p>
            <p style={styles.contactDetail}><strong>Phone:</strong> {listing.landlordPhone}</p>
            <p style={styles.contactDetail}><strong>Email:</strong> {listing.landlordEmail}</p>
            
            <button
              onClick={handleContactLandlord}
              style={styles.contactButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(255,215,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📧 Contact Landlord
            </button>
            
            <p style={{
              color: '#666666',
              fontSize: '11px',
              marginTop: '8px',
              textAlign: 'center'
            }}>
              Your inquiry will be sent to the platform administrator who will connect you with the landlord.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;