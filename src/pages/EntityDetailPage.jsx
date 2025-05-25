import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { fetchEntityDetails } from '../services/starWarsApi';

const EntityDetailPage = ({ entityType }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const result = await fetchEntityDetails(entityType, id);
      setDetails(result);
      setLoading(false);
    };

    loadDetails();
  }, [entityType, id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!details || !details.properties) {
    return (
      <Container className="text-center py-5">
        <h3>No se encontraron detalles</h3>
      </Container>
    );
  }

  const { properties } = details;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">{properties.name}</Card.Title>
              {entityType === 'people' && (
                <div>
                  <p><strong>Height:</strong> {properties.height}</p>
                  <p><strong>Mass:</strong> {properties.mass}</p>
                  <p><strong>Birth Year:</strong> {properties.birth_year}</p>
                  <p><strong>Gender:</strong> {properties.gender}</p>
                </div>
              )}
              {entityType === 'vehicles' && (
                <div>
                  <p><strong>Model:</strong> {properties.model}</p>
                  <p><strong>Manufacturer:</strong> {properties.manufacturer}</p>
                  <p><strong>Cost:</strong> {properties.cost_in_credits} credits</p>
                  <p><strong>Speed:</strong> {properties.max_atmosphering_speed}</p>
                </div>
              )}
              {entityType === 'planets' && (
                <div>
                  <p><strong>Climate:</strong> {properties.climate}</p>
                  <p><strong>Terrain:</strong> {properties.terrain}</p>
                  <p><strong>Population:</strong> {properties.population}</p>
                  <p><strong>Diameter:</strong> {properties.diameter}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityDetailPage; 