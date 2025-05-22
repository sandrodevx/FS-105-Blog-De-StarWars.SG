const SWAPI_BASE_URL = 'https://www.swapi.tech/api';

// Cache para almacenar resultados
const cache = {
  entities: {},
  details: {}
};

// Función para cargar todas las entidades de una vez
export const loadAllEntities = async () => {
  try {
    const entityTypes = ['people', 'vehicles', 'planets'];
    const promises = entityTypes.map(type => 
      fetch(`${SWAPI_BASE_URL}/${type}`).then(res => res.json())
    );

    const results = await Promise.all(promises);
    
    entityTypes.forEach((type, index) => {
      cache.entities[type] = results[index].results || [];
    });

    return entityTypes.reduce((acc, type, index) => {
      acc[type] = results[index].results || [];
      return acc;
    }, {});
  } catch (error) {
    console.error('Error loading all entities:', error);
    return {};
  }
};

export const fetchEntities = async (entityType) => {
  if (cache.entities[entityType]) {
    return cache.entities[entityType];
  }

  try {
    const response = await fetch(`${SWAPI_BASE_URL}/${entityType}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results || [];
    
    cache.entities[entityType] = results;
    return results;
  } catch (error) {
    console.error(`Error fetching ${entityType}:`, error);
    return [];
  }
};

export const fetchEntityDetails = async (entityType, id) => {
  const cacheKey = `${entityType}-${id}`;
  if (cache.details[cacheKey]) {
    return cache.details[cacheKey];
  }

  try {
    const response = await fetch(`${SWAPI_BASE_URL}/${entityType}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const result = data.result || null;
    
    cache.details[cacheKey] = result;
    return result;
  } catch (error) {
    console.error(`Error fetching ${entityType} details:`, error);
    return null;
  }
};

export const getImageUrl = (entityType, id) => {
  // Mapeo de tipos de entidades a sus rutas de imagen correspondientes
  const imageTypeMap = {
    'people': 'characters',
    'vehicles': 'vehicles',
    'planets': 'planets'
  };

  const imageType = imageTypeMap[entityType] || entityType;
  return `https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`;
}; 