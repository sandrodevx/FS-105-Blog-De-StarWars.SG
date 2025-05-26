const SWAPI_BASE_URL = 'https://www.swapi.tech/api';

// Claves para localStorage
const CACHE_KEYS = {
  PEOPLE_DETAILED: 'swapi_people_detailed',
  VEHICLES_DETAILED: 'swapi_vehicles_detailed',
  PLANETS_DETAILED: 'swapi_planets_detailed',
  CACHE_TIMESTAMP: 'swapi_cache_timestamp'
};

// Tiempo de expiración del cache (24 horas en milisegundos)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

// Verificar si el cache está expirado
const isCacheExpired = () => {
  const timestamp = localStorage.getItem(CACHE_KEYS.CACHE_TIMESTAMP);
  if (!timestamp) return true;
  
  const now = new Date().getTime();
  const cacheTime = parseInt(timestamp);
  return (now - cacheTime) > CACHE_EXPIRATION;
};

// Guardar en localStorage con timestamp
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(CACHE_KEYS.CACHE_TIMESTAMP, new Date().getTime().toString());
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Cargar desde localStorage
const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Función para obtener entidades con detalles completos usando Promise.all
export const fetchEntitiesWithDetails = async (entityType) => {
  const cacheKey = CACHE_KEYS[`${entityType.toUpperCase()}_DETAILED`];
  
  // Verificar cache primero
  if (!isCacheExpired()) {
    const cachedData = loadFromLocalStorage(cacheKey);
    if (cachedData && cachedData.length > 0) {
      console.log(`Loading ${entityType} from cache`);
      return cachedData;
    }
  }

  try {
    console.log(`Fetching ${entityType} with details from API...`);
    
    // Primero obtenemos la lista básica
    const response = await fetch(`${SWAPI_BASE_URL}/${entityType}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const basicEntities = data.results || [];

    // Ahora obtenemos los detalles de todas las entidades usando Promise.all
    const detailPromises = basicEntities.map(entity => 
      fetch(`${SWAPI_BASE_URL}/${entityType}/${entity.uid}`)
        .then(res => res.json())
        .then(detailData => ({
          ...entity,
          properties: detailData.result?.properties || {}
        }))
        .catch(error => {
          console.error(`Error fetching details for ${entity.name}:`, error);
          return {
            ...entity,
            properties: {}
          };
        })
    );

    // Ejecutar todas las promesas en paralelo
    const entitiesWithDetails = await Promise.all(detailPromises);
    
    // Guardar en localStorage para evitar 429 errors
    saveToLocalStorage(cacheKey, entitiesWithDetails);
    
    console.log(`Fetched and cached ${entitiesWithDetails.length} ${entityType} with details`);
    return entitiesWithDetails;

  } catch (error) {
    console.error(`Error fetching ${entityType} with details:`, error);
    
    // Si hay error, intentar cargar del cache aunque esté expirado
    const cachedData = loadFromLocalStorage(cacheKey);
    if (cachedData && cachedData.length > 0) {
      console.log(`Using expired cache for ${entityType} due to API error`);
      return cachedData;
    }
    
    return [];
  }
};

// Función mejorada para cargar todas las entidades con detalles
export const loadAllEntitiesWithDetails = async () => {
  try {
    const entityTypes = ['people', 'vehicles', 'planets'];
    
    // Verificar si tenemos todo en cache y no está expirado
    if (!isCacheExpired()) {
      const cachedData = {};
      let allCacheValid = true;
      
      for (const type of entityTypes) {
        const cacheKey = CACHE_KEYS[`${type.toUpperCase()}_DETAILED`];
        const cached = loadFromLocalStorage(cacheKey);
        if (cached && cached.length > 0) {
          cachedData[type] = cached;
        } else {
          allCacheValid = false;
          break;
        }
      }
      
      if (allCacheValid) {
        console.log('Loading all entities from cache');
        return cachedData;
      }
    }

    // Si no tenemos cache válido, cargar todo
    console.log('Fetching all entities with details...');
    const promises = entityTypes.map(type => 
      fetchEntitiesWithDetails(type).then(data => ({ type, data }))
    );

    const results = await Promise.all(promises);
    
    return results.reduce((acc, { type, data }) => {
      acc[type] = data;
      return acc;
    }, {});

  } catch (error) {
    console.error('Error loading all entities:', error);
    return {};
  }
};

// Mantener funciones legacy para compatibilidad
export const fetchEntities = fetchEntitiesWithDetails;

export const fetchEntityDetails = async (entityType, id) => {
  try {
    const response = await fetch(`${SWAPI_BASE_URL}/${entityType}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error(`Error fetching ${entityType} details:`, error);
    return null;
  }
};

export const getImageUrl = (entityType, id) => {
  const imageTypeMap = {
    'people': 'characters',
    'vehicles': 'vehicles',
    'planets': 'planets'
  };

  const imageType = imageTypeMap[entityType] || entityType;
  return `https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`;
};

// Función para limpiar cache manualmente
export const clearCache = () => {
  Object.values(CACHE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('Cache cleared');
}; 