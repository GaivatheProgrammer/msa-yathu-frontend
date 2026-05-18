import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  // Get the first photo or use a default
  const defaultImage = 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?w=400';
  const imageUrl = listing.photos && listing.photos.length > 0 
    ? listing.photos[0] 
    : defaultImage;

  const styles = {
    card: {
      background: '#111111',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #2A2A2A',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    image: {
      width: '100%',
      height: '220px',
      objectFit: 'cover'
    },
    content: {
      padding: '20px',
      flex: 1
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '10px'
    },
    price: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '10px'
    },
    location: {
      color: '#CCCCCC',
      fontSize: '14px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    distance: {
      color: '#888888',
      fontSize: '13px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    amenities: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '12px'
    },
    amenityBadge: {
      background: '#1A1A1A',
      padding: '4px 10px',
      borderRadius: '100px',
      fontSize: '11px',
      color: '#CCCCCC'
    }
  };

  return (
    <Link to={`/listing/${listing._id}`} style={{ textDecoration: 'none' }}>
      <div style={styles.card}>
        <img 
          src={imageUrl} 
          alt={listing.title}
          style={styles.image}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div style={styles.content}>
          <h3 style={styles.title}>{listing.title}</h3>
          <div style={styles.price}>MK{listing.price?.toLocaleString()}<span style={{fontSize: '14px'}}>/month</span></div>
          <div style={styles.location}>📍 {listing.location}</div>
          <div style={styles.distance}>🚶 {listing.distanceFromCampus} from campus</div>
          <div style={styles.amenities}>
            {listing.amenities?.slice(0, 3).map((amenity, index) => (
              <span key={index} style={styles.amenityBadge}>
                {amenity === 'wifi' ? '📶 WiFi' : 
                 amenity === 'security' ? '🔒 Security' : 
                 amenity === 'parking' ? '🅿️ Parking' : 
                 amenity === 'furnished' ? '🛋️ Furnished' :
                 amenity === 'utilities_included' ? '💡 Utilities' :
                 amenity === 'water_included' ? '💧 Water' : amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;