import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import ListingDetailPage from './pages/ListingDetailPage';
import LandlordDashboard from './pages/LandlordDashboard';
import AddListingPage from './pages/AddListingPage';
import EditListingPage from './pages/EditListingPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />  {/* ONLY ONE Navbar here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute allowedTypes={['landlord']}>
              <LandlordDashboard />
            </PrivateRoute>
          } />
          <Route path="/add-listing" element={
            <PrivateRoute allowedTypes={['landlord']}>
              <AddListingPage />
            </PrivateRoute>
          } />
          <Route path="/edit-listing/:id" element={
            <PrivateRoute allowedTypes={['landlord']}>
              <EditListingPage />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;