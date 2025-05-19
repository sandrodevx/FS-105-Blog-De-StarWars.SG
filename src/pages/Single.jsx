import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Single = ({ entityType }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async (type, itemId) => {
      console.log('Fetching details for:', type, itemId); // Añade este log
      try {
        const response = await fetch(`https://swapi.tech/api/${type}/${itemId}`);
        console.log('Response:', response); // Añade este log
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received:', data); // Añade este log
        setItem(data);
      } catch (e) {
        console.error('Fetch error:', e); // Asegúrate de que el error se loguea
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    if (entityType && id) {
      fetchDetails(entityType, id);
    }
  }, [entityType, id]);

  console.log('entityType:', entityType, 'id:', id); // Añade este log al inicio

  if (loading) {
    return <div>Cargando detalles...</div>;
  }

  if (error) {
    return <div>Error al cargar los detalles: {error.message}</div>;
  }

  if (!item) {
    return <div>No se encontraron detalles.</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        {entityType === 'people' && (
          <>
            <p><strong>Género:</strong> {item.gender}</p>
            <p><strong>Año de Nacimiento:</strong> {item.birth_year}</p>
          </>
        )}
        {entityType === 'vehicle' && (
          <>
            <p><strong>Modelo:</strong> {item.model}</p>
            <p><strong>Fabricante:</strong> {item.manufacturer}</p>
          </>
        )}
        {entityType === 'planet' && (
          <>
            <p><strong>Clima:</strong> {item.climate}</p>
            <p><strong>Terreno:</strong> {item.terrain}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;