import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CacheManager from '../components/CacheManager';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Footer />
      <CacheManager />
    </div>
  );
};

export default Layout;