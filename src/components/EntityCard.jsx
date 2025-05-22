import React from 'react';
import { Card, Button } from 'react-bootstrap';
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

  return (
    <Card 
      className="h-100 shadow-sm" 
      style={{ 
        width: '100%',
        maxWidth: '300px',
        margin: '1rem auto',
        minHeight: '120px'
      }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3">{entity.name}</Card.Title>
        <div className="mt-auto d-flex justify-content-between">
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
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EntityCard; 