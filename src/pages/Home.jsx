import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Spinner } from 'react-bootstrap';
import EntityCard from '../components/EntityCard';
import { loadAllEntities, fetchEntities } from '../services/starWarsApi';

const Home = () => {
  const [activeTab, setActiveTab] = useState('people');
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial de todas las entidades
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const allData = await loadAllEntities();
        setEntities(allData[activeTab] || []);
      } catch (err) {
        setError('Error loading initial data');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Cambio de tab
  const handleTabChange = async (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setLoading(true);
      try {
        const data = await fetchEntities(tab);
        setEntities(data);
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className="py-4">
      <Nav 
        variant="tabs" 
        className="mb-4" 
        activeKey={activeTab} 
        onSelect={handleTabChange}
      >
        <Nav.Item>
          <Nav.Link eventKey="people">People</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="vehicles">Vehicles</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="planets">Planets</Nav.Link>
        </Nav.Item>
      </Nav>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {entities.map((entity) => (
            <Col key={entity.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <EntityCard entity={entity} entityType={activeTab} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;