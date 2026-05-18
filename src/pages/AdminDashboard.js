import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalUsers: 0,
    totalStudents: 0,
    totalLandlords: 0,
    recentListings: []
  });
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      if (activeTab === 'dashboard') {
        const statsRes = await axios.get('http://localhost:5001/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsRes.data);
      } else if (activeTab === 'listings') {
        const listingsRes = await axios.get('http://localhost:5001/api/admin/listings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(listingsRes.data.listings);
      } else if (activeTab === 'users') {
        const usersRes = await axios.get('http://localhost:5001/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(usersRes.data.users);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5001/api/admin/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('adminToken');
    await axios.patch(`http://localhost:5001/api/admin/listings/${id}/toggle-status`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0A0A0A',
    },
    sidebar: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '280px',
      height: '100%',
      background: '#111111',
      borderRight: '1px solid #2A2A2A',
      padding: '24px',
    },
    mainContent: {
      marginLeft: '280px',
      padding: '24px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#FFD700',
      marginBottom: '32px',
      textAlign: 'center',
    },
    navItem: {
      padding: '12px 16px',
      marginBottom: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#CCCCCC',
      transition: 'all 0.3s ease',
    },
    navItemActive: {
      background: 'rgba(255, 215, 0, 0.1)',
      color: '#FFD700',
      borderLeft: '3px solid #FFD700',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px',
    },
    statCard: {
      background: '#111111',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #2A2A2A',
    },
    table: {
      width: '100%',
      background: '#111111',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #2A2A2A',
    },
    th: {
      padding: '16px',
      textAlign: 'left',
      background: '#1A1A1A',
      color: '#FFD700',
      fontWeight: '600',
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #2A2A2A',
      color: '#CCCCCC',
    },
    button: {
      background: 'rgba(255, 215, 0, 0.1)',
      border: '1px solid #FFD700',
      padding: '6px 12px',
      borderRadius: '6px',
      color: '#FFD700',
      cursor: 'pointer',
      marginRight: '8px',
    },
    buttonDanger: {
      background: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid #F44336',
      color: '#F44336',
    },
    activeBadge: {
      background: 'rgba(76, 175, 80, 0.2)',
      color: '#4CAF50',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
    },
    inactiveBadge: {
      background: 'rgba(244, 67, 54, 0.2)',
      color: '#F44336',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
    },
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#FFD700' }}>Loading admin panel...</div>;

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>🏠 Admin Panel</div>
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: '#FFFFFF', marginBottom: '4px' }}>{adminInfo.name}</div>
          <div style={{ color: '#A0A0A0', fontSize: '12px' }}>{adminInfo.email}</div>
          <div style={{ color: '#FFD700', fontSize: '11px', marginTop: '4px' }}>Role: {adminInfo.role}</div>
        </div>
        
        <div
          style={{ ...styles.navItem, ...(activeTab === 'dashboard' ? styles.navItemActive : {}) }}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </div>
        <div
          style={{ ...styles.navItem, ...(activeTab === 'listings' ? styles.navItemActive : {}) }}
          onClick={() => setActiveTab('listings')}
        >
          🏠 Manage Listings
        </div>
        <div
          style={{ ...styles.navItem, ...(activeTab === 'users' ? styles.navItemActive : {}) }}
          onClick={() => setActiveTab('users')}
        >
          👥 Manage Users
        </div>
        <div
          style={{ ...styles.navItem, marginTop: 'auto', position: 'absolute', bottom: '24px', width: '232px' }}
          onClick={handleLogout}
        >
          🚪 Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeTab === 'dashboard' && (
          <>
            <h1 style={{ color: '#FFFFFF', marginBottom: '24px' }}>Dashboard Overview</h1>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700' }}>{stats.totalListings}</div>
                <div style={{ color: '#A0A0A0' }}>Total Listings</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#4CAF50' }}>{stats.activeListings}</div>
                <div style={{ color: '#A0A0A0' }}>Active Listings</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700' }}>{stats.totalUsers}</div>
                <div style={{ color: '#A0A0A0' }}>Total Users</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700' }}>{stats.totalStudents}</div>
                <div style={{ color: '#A0A0A0' }}>Students</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700' }}>{stats.totalLandlords}</div>
                <div style={{ color: '#A0A0A0' }}>Landlords</div>
              </div>
            </div>
            
            <h2 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Recent Listings</h2>
            <table style={styles.table}>
              <thead>
                <tr><th style={styles.th}>Title</th><th style={styles.th}>Price</th><th style={styles.th}>Location</th><th style={styles.th}>Status</th></tr>
              </thead>
              <tbody>
                {stats.recentListings.map(listing => (
                  <tr key={listing._id}>
                    <td style={styles.td}>{listing.title}</td>
                    <td style={styles.td}>MK{listing.price?.toLocaleString()}</td>
                    <td style={styles.td}>{listing.location}</td>
                    <td style={styles.td}>
                      <span style={listing.isActive ? styles.activeBadge : styles.inactiveBadge}>
                        {listing.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'listings' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h1 style={{ color: '#FFFFFF' }}>Manage Listings</h1>
              <button style={styles.button}>+ Add New Listing</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing._id}>
                    <td style={styles.td}>{listing.title}</td>
                    <td style={styles.td}>MK{listing.price?.toLocaleString()}</td>
                    <td style={styles.td}>{listing.location}</td>
                    <td style={styles.td}>
                      <span style={listing.isActive ? styles.activeBadge : styles.inactiveBadge}>
                        {listing.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleToggleStatus(listing._id, listing.isActive)}>
                        {listing.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => handleDeleteListing(listing._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'users' && (
          <>
            <h1 style={{ color: '#FFFFFF', marginBottom: '24px' }}>Manage Users</h1>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>
                      <span style={user.userType === 'landlord' ? styles.activeBadge : {}}>
                        {user.userType}
                      </span>
                    </td>
                    <td style={styles.td}>{user.phone}</td>
                    <td style={styles.td}>
                      <button style={{ ...styles.button, ...styles.buttonDanger }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;