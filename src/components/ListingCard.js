import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  // Default image if none provided
  const defaultImage = 'https://via.placeholder.com/400x250?text=MSA+Yathu+Hostel';
  
  // Get the first photo or use default
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
      flexDirection: 'column',
      textDecoration: 'none'
    },
    image: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
      backgroundColor: '#1A1A1A'
    },
    content: {
      padding: '20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '8px',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    price: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '8px'
    },
    priceSpan: {
      fontSize: '14px',
      color: '#A0A0A0',
      fontWeight: '400'
    },
    location: {
      color: '#CCCCCC',
      fontSize: '14px',
      marginBottom: '4px',
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
      gap: '6px',
      marginTop: 'auto'
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
    <Link to={`/listing/${listing.id}`} style={{ textDecoration: 'none' }}>
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
          <div style={styles.price}>
            MK{listing.price?.toLocaleString()}
            <span style={styles.priceSpan}> /month</span>
          </div>
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