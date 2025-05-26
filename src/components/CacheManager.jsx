import React from 'react';
import { Button } from 'react-bootstrap';
import { clearCache } from '../services/starWarsApi';

const CacheManager = () => {
  const handleClearCache = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el cache? Esto forzará a recargar todos los datos desde la API.')) {
      clearCache();
      window.location.reload();
    }
  };

  // Solo mostrar en desarrollo
  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1000 }}>
      <Button 
        variant="outline-secondary" 
        size="sm" 
        onClick={handleClearCache}
        title="Clear localStorage cache (dev only)"
      >
        🗑️ Clear Cache
      </Button>
    </div>
  );
};

export default CacheManager; 