import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

const SearchPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    roomType: '',
    location: '',
    university: ''
  });

  // Complete list of all universities and colleges in Malawi
  const universitiesInMalawi = [
    // Public Universities
    "University of Malawi (UNIMA)",
    "Mzuzu University (MZUNI)",
    "Lilongwe University of Agriculture and Natural Resources (LUANAR)",
    "Malawi University of Science and Technology (MUST)",
    "Malawi University of Business and Applied Sciences (MUBAS)",
    "Kamuzu University of Health Sciences (KUHeS)",
    
    // Private Universities
    "Catholic University of Malawi",
    "Adventist University of Malawi",
    "Livingstonia University",
    "Malawi Assemblies of God University",
    "Nkhoma University",
    "Chartered Institute of Management Accountants (CIMA)",
    "Skyway University",
    "Unicaf University Malawi",
    
    // Colleges
    "Chancellor College",
    "Polytechnic University of Malawi",
    "College of Medicine",
    "Kamuzu College of Nursing",
    "Blantyre International University",
    "DMI-St. John the Baptist University",
    "African Bible College",
    "Malawi College of Accountancy",
    "Malawi Institute of Management",
    "College of Health Sciences",
    
    // Teacher Training Colleges
    "Domasi College of Education",
    "Karonga Teachers Training College",
    "Machinga Teachers Training College",
    "Malosa College of Education",
    "Mpondabwato Teachers Training College",
    "St Joseph's Teachers College",
    
    // Technical Colleges
    "Malawi Technical College (MATECO)",
    "Soche Technical College",
    "Lilongwe Technical College",
    "Mzuzu Technical College"
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.roomType) params.append('roomType', filters.roomType);
      if (filters.location) params.append('location', filters.location);
      if (filters.university) params.append('university', filters.university);
      
      const response = await axios.get(`http://localhost:5001/api/listings?${params}`);
      setListings(response.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    setLoading(true);
    fetchListings();
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      roomType: '',
      location: '',
      university: ''
    });
    setLoading(true);
    setTimeout(() => fetchListings(), 100);
  };

  const styles = {
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '40px 24px'
    },
    pageTitle: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    pageSubtitle: {
      color: '#CCCCCC',
      marginBottom: '40px'
    },
    filtersSection: {
      background: '#111111',
      padding: '32px',
      borderRadius: '20px',
      marginBottom: '40px',
      border: '1px solid #2A2A2A'
    },
    filtersTitle: {
      color: '#FFD700',
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '20px'
    },
    inputField: {
      width: '100%',
      padding: '12px 16px',
      background: '#1A1A1A',
      border: '1px solid #2A2A2A',
      borderRadius: '12px',
      color: '#FFFFFF',
      fontSize: '14px'
    },
    selectField: {
      width: '100%',
      padding: '12px 16px',
      background: '#1A1A1A',
      border: '1px solid #2A2A2A',
      borderRadius: '12px',
      color: '#FFFFFF',
      fontSize: '14px',
      cursor: 'pointer'
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginRight: '12px'
    },
    buttonSecondary: {
      background: 'transparent',
      border: '1px solid #2A2A2A',
      color: '#CCCCCC',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    resultsCount: {
      color: '#FFD700',
      marginBottom: '20px',
      fontSize: '14px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '32px'
    },
    noResults: {
      textAlign: 'center',
      padding: '60px',
      background: '#111111',
      borderRadius: '20px',
      border: '1px solid #2A2A2A'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Find Your Accommodation</h1>
      <p style={styles.pageSubtitle}>Search through hundreds of listings near your university</p>

      {/* Filters Section */}
      <div style={styles.filtersSection}>
        <h3 style={styles.filtersTitle}>🔍 Filter Properties</h3>
        <div style={styles.filtersGrid}>
          <select 
            name="university" 
            value={filters.university} 
            onChange={handleFilterChange} 
            style={styles.selectField}
          >
            <option value="">All Universities</option>
            {universitiesInMalawi.map((uni, index) => (
              <option key={index} value={uni}>{uni}</option>
            ))}
          </select>

          <select name="roomType" value={filters.roomType} onChange={handleFilterChange} style={styles.selectField}>
            <option value="">All Room Types</option>
            <option value="single">Single Room</option>
            <option value="shared">Shared Room</option>
            <option value="apartment">Apartment</option>
            <option value="studio">Studio</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price (MK)"
            value={filters.minPrice}
            onChange={handleFilterChange}
            style={styles.inputField}
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price (MK)"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            style={styles.inputField}
          />

          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Zomba, Lilongwe)"
            value={filters.location}
            onChange={handleFilterChange}
            style={styles.inputField}
          />
        </div>
        <div>
          <button onClick={applyFilters} style={styles.buttonPrimary}>
            Apply Filters
          </button>
          <button onClick={clearFilters} style={styles.buttonSecondary}>
            Clear All
          </button>
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <div style={styles.resultsCount}>
          Found {listings.length} accommodation{listings.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="spinner"></div>
      ) : listings.length === 0 ? (
        <div style={styles.noResults}>
          <p style={{ fontSize: '18px', marginBottom: '12px' }}>🔍 No accommodations found</p>
          <p style={{ color: '#888888' }}>Try adjusting your filters or check back later for new listings</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;