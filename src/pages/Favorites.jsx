import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store'; // Asumiendo que usas Context

const Favorites = () => {
  const { store, actions } = useContext(StoreContext);

  const handleRemoveFromFavorites = (item) => {
    actions.removeFavorite(item);
  };

  return (
    <div>
      <h2>Lista de Favoritos</h2>
      {store.favorites && store.favorites.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {store.favorites.map((favorite) => (
            <div className="col" key={favorite.uid || favorite.url}> {/* Asegúrate de tener un ID único */}
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{favorite.name}</h5>
                  {favorite.model && <p className="card-text">Modelo: {favorite.model}</p>}
                  {favorite.terrain && <p className="card-text">Terreno: {favorite.terrain}</p>}
                  <Link to={`/<span class="math-inline">\{favorite\.url\.split\('/'\)\.slice\(\-2, \-1\)\[0\]\}/</span>{favorite.url.split('/').slice(-2)[0]}`} className="btn btn-primary">Ver Detalles</Link>
                  <button onClick={() => handleRemoveFromFavorites(favorite)} className="btn btn-outline-danger btn-sm ms-2">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay elementos en tu lista de favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;