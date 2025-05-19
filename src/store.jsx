import React, { createContext, useContext } from 'react';
import useGlobalReducer from './hooks/useGlobalReducer';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useGlobalReducer();

  const actions = {
    addFavorite: (item) => dispatch({ type: 'ADD_FAVORITE', payload: item }),
    removeFavorite: (item) => dispatch({ type: 'REMOVE_FAVORITE', payload: item }),
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreContext, StoreProvider, useStore };