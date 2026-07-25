import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [university, setUniversity] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // ============================================
  // ALL UNIVERSITIES AND COLLEGES IN MALAWI
  // ============================================
  const universities = [
    // === PUBLIC UNIVERSITIES ===
    { value: 'University of Malawi (UNIMA)', label: 'University of Malawi (UNIMA)' },
    { value: 'Mzuzu University (MZUNI)', label: 'Mzuzu University (MZUNI)' },
    { value: 'Lilongwe University of Agriculture and Natural Resources (LUANAR)', label: 'Lilongwe University of Agriculture and Natural Resources (LUANAR)' },
    { value: 'Malawi University of Science and Technology (MUST)', label: 'Malawi University of Science and Technology (MUST)' },
    { value: 'Malawi University of Business and Applied Sciences (MUBAS)', label: 'Malawi University of Business and Applied Sciences (MUBAS)' },
    { value: 'Kamuzu University of Health Sciences (KUHeS)', label: 'Kamuzu University of Health Sciences (KUHeS)' },
    
    // === PRIVATE UNIVERSITIES ===
    { value: 'Catholic University of Malawi', label: 'Catholic University of Malawi' },
    { value: 'Adventist University of Malawi', label: 'Adventist University of Malawi' },
    { value: 'Livingstonia University', label: 'Livingstonia University' },
    { value: 'Malawi Assemblies of God University', label: 'Malawi Assemblies of God University' },
    { value: 'Nkhoma University', label: 'Nkhoma University' },
    { value: 'Skyway University', label: 'Skyway University' },
    { value: 'Unicaf University Malawi', label: 'Unicaf University Malawi' },
    { value: 'Blantyre International University', label: 'Blantyre International University' },
    { value: 'DMI-St. John the Baptist University', label: 'DMI-St. John the Baptist University' },
    { value: 'African Bible College', label: 'African Bible College' },
    { value: 'Chartered Institute of Management Accountants (CIMA)', label: 'Chartered Institute of Management Accountants (CIMA)' },
    
    // === TEACHER TRAINING COLLEGES ===
    { value: 'Domasi College of Education', label: 'Domasi College of Education' },
    { value: 'Karonga Teachers Training College', label: 'Karonga Teachers Training College' },
    { value: 'Machinga Teachers Training College', label: 'Machinga Teachers Training College' },
    { value: 'Malosa College of Education', label: 'Malosa College of Education' },
    { value: 'Mpondabwato Teachers Training College', label: 'Mpondabwato Teachers Training College' },
    { value: 'St Joseph\'s Teachers College', label: 'St Joseph\'s Teachers College' },
    
    // === TECHNICAL COLLEGES ===
    { value: 'Malawi Technical College (MATECO)', label: 'Malawi Technical College (MATECO)' },
    { value: 'Soche Technical College', label: 'Soche Technical College' },
    { value: 'Lilongwe Technical College', label: 'Lilongwe Technical College' },
    { value: 'Mzuzu Technical College', label: 'Mzuzu Technical College' },
    { value: 'Salima Technical College', label: 'Salima Technical College' },
    
    // === NURSING & HEALTH COLLEGES ===
    { value: 'St John of God College of Health Sciences', label: 'St John of God College of Health Sciences' },
    { value: 'Malawi College of Health Sciences', label: 'Malawi College of Health Sciences' },
    { value: 'Daeyang Luke College of Nursing', label: 'Daeyang Luke College of Nursing' },
    { value: 'Nkhoma Mission Nursing College', label: 'Nkhoma Mission Nursing College' },
    
    // === OTHER INSTITUTIONS ===
    { value: 'Malawi College of Accountancy', label: 'Malawi College of Accountancy' },
    { value: 'Malawi Institute of Management', label: 'Malawi Institute of Management' },
    { value: 'Ecumenical Theological Seminary', label: 'Ecumenical Theological Seminary' },
  ];

  const handleSearch = (e) => {
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
      maxWidth: '900px',
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
      minWidth: '200px',
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
          <option key={index} value={uni.value}>{uni.label}</option>
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
        <option value="500000-">500,000+ MK</option>
      </select>
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;