import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store'; // Asumiendo que usas Context

const Home = () => {
  const { store, actions } = useContext(StoreContext);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true); // Aunque no lo usas aquí, puede ser útil
  const [error, setError] = useState(null);   // Igual que loading

  const fetchEntities = async (url, setter) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setter(data.results);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchEntities('https://swapi.tech/api/people/', setPeople);
    fetchEntities('https://swapi.tech/api/vehicles/', setVehicles);
    fetchEntities('https://swapi.tech/api/planets/', setPlanets);
  }, []);

  const isFavorite = (item) => {
    return store.favorites.some(fav => (fav.uid || fav.url) === (item.uid || item.url));
  };

  const handleAddToFavorites = (item) => {
    actions.addFavorite(item);
  };

  const handleRemoveFromFavorites = (item) => {
    actions.removeFavorite(item);
  };

  return (
    <div>
      <h2>Personajes</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {people.map((person) => (
          <div className="col" key={person.uid}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">Género: {person.gender}</p>
                <Link to={`/people/${person.uid}`} className="btn btn-primary btn-sm"></Link>


                <button
                  onClick={() => (isFavorite(person) ? handleRemoveFromFavorites(person) : handleAddToFavorites(person))}
                  className={`btn btn-outline-warning btn-sm ms-2`}
                >
                  <i className={`bi ${isFavorite(person) ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-4">Vehículos</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {vehicles.map((vehicle) => (
          <div className="col" key={vehicle.uid}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{vehicle.name}</h5>
                <p className="card-text">Modelo: {vehicle.model}</p>
                <Link to={`/vehicles/${vehicle.uid}`} className="btn btn-primary btn-sm"></Link>
                <button
                  onClick={() => (isFavorite(vehicle) ? handleRemoveFromFavorites(vehicle) : handleAddToFavorites(vehicle))}
                  className={`btn btn-outline-warning btn-sm ms-2`}
                >
                  <i className={`bi ${isFavorite(vehicle) ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-4">Planetas</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {planets.map((planet) => (
          <div className="col" key={planet.uid}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text">Terreno: {planet.terrain}</p>
				<Link to={`/planets/${planet.uid}`} className="btn btn-primary btn-sm"></Link>
                <button
                  onClick={() => (isFavorite(planet) ? handleRemoveFromFavorites(planet) : handleAddToFavorites(planet))}
                  className={`btn btn-outline-warning btn-sm ms-2`}
                >
                  <i className={`bi ${isFavorite(planet) ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;