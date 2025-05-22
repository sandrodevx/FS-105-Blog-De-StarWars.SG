import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { useStore } from '../store';

const Navbar = () => {
  const { store } = useStore();
  const totalFavorites = store.favorites ? store.favorites.length : 0;

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG34.png"
            height="50"
            alt="Star Wars Logo"
            className="me-2"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>
        <div className="ms-auto">
          <Link to="/favorites" className="btn btn-outline-light">
            Favorites <span className="badge bg-danger ms-1">{totalFavorites}</span>
          </Link>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;