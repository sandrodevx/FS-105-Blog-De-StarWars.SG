// Import necessary components and functions from react-router-dom.
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import EntityDetailPage from './pages/EntityDetailPage';
import Favorites from './pages/Favorites';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/people/:id" element={<EntityDetailPage entityType="people" />} />
          <Route path="/vehicles/:id" element={<EntityDetailPage entityType="vehicles" />} />
          <Route path="/planets/:id" element={<EntityDetailPage entityType="planets" />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;