import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const EntityCard = ({ entity, entityType }) => {
  const { store, actions } = useStore();
  const isFavorite = store.favorites.some(fav => fav.uid === entity.uid);

  const toggleFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(entity);
    } else {
      actions.addFavorite(entity);
    }
  };

  // Función para renderizar detalles específicos según el tipo de entidad
  const renderEntityDetails = () => {
    const { properties } = entity;
    
    if (!properties || Object.keys(properties).length === 0) {
      return <p className="text-muted small">Loading details...</p>;
    }

    switch (entityType) {
      case 'people':
        return (
          <div className="mb-2">
            {properties.height && (
              <p className="mb-1 small">
                <strong>Height:</strong> {properties.height}cm
              </p>
            )}
            {properties.eye_color && (
              <p className="mb-1 small">
                <strong>Eyes:</strong> 
                <Badge bg="secondary" className="ms-1">{properties.eye_color}</Badge>
              </p>
            )}
            {properties.gender && (
              <p className="mb-1 small">
                <strong>Gender:</strong> {properties.gender}
              </p>
            )}
            {properties.birth_year && (
              <p className="mb-0 small">
                <strong>Born:</strong> {properties.birth_year}
              </p>
            )}
          </div>
        );
      
      case 'vehicles':
        return (
          <div className="mb-2">
            {properties.model && (
              <p className="mb-1 small">
                <strong>Model:</strong> {properties.model}
              </p>
            )}
            {properties.manufacturer && (
              <p className="mb-1 small">
                <strong>Manufacturer:</strong> {properties.manufacturer}
              </p>
            )}
            {properties.cost_in_credits && properties.cost_in_credits !== 'unknown' && (
              <p className="mb-1 small">
                <strong>Cost:</strong> {parseInt(properties.cost_in_credits).toLocaleString()} credits
              </p>
            )}
            {properties.max_atmosphering_speed && (
              <p className="mb-0 small">
                <strong>Max Speed:</strong> {properties.max_atmosphering_speed}
              </p>
            )}
          </div>
        );
      
      case 'planets':
        return (
          <div className="mb-2">
            {properties.climate && (
              <p className="mb-1 small">
                <strong>Climate:</strong> 
                <Badge bg="info" className="ms-1">{properties.climate}</Badge>
              </p>
            )}
            {properties.terrain && (
              <p className="mb-1 small">
                <strong>Terrain:</strong> {properties.terrain}
              </p>
            )}
            {properties.population && properties.population !== 'unknown' && (
              <p className="mb-1 small">
                <strong>Population:</strong> {parseInt(properties.population).toLocaleString()}
              </p>
            )}
            {properties.diameter && (
              <p className="mb-0 small">
                <strong>Diameter:</strong> {properties.diameter}km
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card 
      className="h-100 shadow-sm" 
      style={{ 
        width: '100%',
        maxWidth: '320px',
        margin: '1rem auto',
        minHeight: '200px'
      }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3 h6">{entity.name}</Card.Title>
        
        {/* Detalles específicos de la entidad */}
        <div className="flex-grow-1">
          {renderEntityDetails()}
        </div>

        {/* Botones en la parte inferior */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link 
            to={`/${entityType}/${entity.uid}`} 
            className="btn btn-primary btn-sm"
            style={{ flex: '1', marginRight: '0.5rem' }}
          >
            Learn more!
          </Link>
          <Button 
            variant={isFavorite ? "danger" : "outline-warning"}
            onClick={toggleFavorite}
            size="sm"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EntityCard; 