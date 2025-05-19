import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;