import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store'; // Asumiendo que usas Context

const Navbar = () => {
  const { store } = useContext(StoreContext);
  const totalFavorites = store.favorites ? store.favorites.length : 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Blog de Star Wars</Link>
        <div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favoritos <span className="badge bg-secondary">{totalFavorites}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;