import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [university, setUniversity] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const universities = [
    'University of Malawi (UNIMA)',
    'Mzuzu University (MZUNI)',
    'Lilongwe University of Agriculture and Natural Resources (LUANAR)',
    'Malawi University of Science and Technology (MUST)',
    'Malawi University of Business and Applied Sciences (MUBAS)',
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('location', searchTerm);
    if (university) params.append('university', university);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.append('minPrice', min);
      if (max) params.append('maxPrice', max);
    }
    
    navigate(`/search?${params.toString()}`);
  };

  const styles = {
    container: {
      background: '#111111',
      borderRadius: '60px',
      padding: '8px',
      display: 'flex',
      gap: '12px',
      maxWidth: '800px',
      margin: '0 auto',
      border: '1px solid rgba(255,215,0,0.2)',
    },
    input: {
      flex: 1,
      padding: '16px 24px',
      border: 'none',
      borderRadius: '60px',
      fontSize: '16px',
      background: 'transparent',
      color: '#FFFFFF',
      outline: 'none',
    },
    select: {
      padding: '16px 24px',
      border: 'none',
      borderRadius: '60px',
      fontSize: '16px',
      background: 'transparent',
      color: '#FFFFFF',
      borderLeft: '1px solid rgba(255,215,0,0.2)',
      cursor: 'pointer',
    },
    button: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
      color: '#000000',
      padding: '16px 32px',
      border: 'none',
      borderRadius: '60px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  };

  return (
    <form onSubmit={handleSearch} style={styles.container}>
      <input
        type="text"
        placeholder="Search by location or area..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      <select
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        style={styles.select}
      >
        <option value="">All Universities</option>
        {universities.map((uni, index) => (
          <option key={index} value={uni}>{uni}</option>
        ))}
      </select>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        style={styles.select}
      >
        <option value="">Price Range</option>
        <option value="0-50000">0 - 50,000 MK</option>
        <option value="50000-100000">50,000 - 100,000 MK</option>
        <option value="100000-200000">100,000 - 200,000 MK</option>
        <option value="200000-500000">200,000 - 500,000 MK</option>
      </select>
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;