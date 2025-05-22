import React, { createContext, useContext } from 'react';
import useGlobalReducer from './hooks/useGlobalReducer';

const StoreContext = createContext();

// Cargar favoritos del localStorage
const loadFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('starwars_favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
};

// Guardar favoritos en localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
  }
};

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useGlobalReducer(loadFavoritesFromStorage());

  const actions = {
    addFavorite: (item) => {
      dispatch({ type: 'ADD_FAVORITE', payload: item });
      saveFavoritesToStorage([...store.favorites, item]);
    },
    removeFavorite: (item) => {
      dispatch({ type: 'REMOVE_FAVORITE', payload: item });
      saveFavoritesToStorage(
        store.favorites.filter(fav => (fav.uid || fav.url) !== (item.uid || item.url))
      );
    }
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreContext, StoreProvider, useStore };