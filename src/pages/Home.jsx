import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Spinner } from 'react-bootstrap';
import EntityCard from '../components/EntityCard';
import { loadAllEntitiesWithDetails, fetchEntitiesWithDetails } from '../services/starWarsApi';

const Home = () => {
  const [activeTab, setActiveTab] = useState('people');
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial de todas las entidades con detalles completos
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading initial data with full details...');
        
        const allData = await loadAllEntitiesWithDetails();
        setEntities(allData[activeTab] || []);
        
        console.log(`Loaded ${allData[activeTab]?.length || 0} ${activeTab} with details`);
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Error loading initial data');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Cambio de tab - ahora con detalles completos
  const handleTabChange = async (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Loading ${tab} with full details...`);
        const data = await fetchEntitiesWithDetails(tab);
        setEntities(data);
        console.log(`Loaded ${data.length} ${tab} with details`);
      } catch (err) {
        console.error(`Error loading ${tab}:`, err);
        setError(`Error loading ${tab}`);
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
          <br />
          <small>Check browser console for more details</small>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading entities with full details...</span>
          </Spinner>
          <p className="mt-2">Loading {activeTab} with complete information...</p>
        </div>
      ) : (
        <Row>
          {entities.map((entity) => (
            <Col key={entity.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <EntityCard entity={entity} entityType={activeTab} />
            </Col>
          ))}
          {entities.length === 0 && !loading && (
            <Col xs={12}>
              <div className="text-center py-5">
                <p>No {activeTab} found.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Home;