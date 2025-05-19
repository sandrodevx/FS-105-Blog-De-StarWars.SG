import { useReducer } from 'react';

const initialState = {
  favorites: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => (fav.uid || fav.url) !== (action.payload.uid || action.payload.url)
        ),
      };
    default:
      return state;
  }
};

const useGlobalReducer = () => {
  return useReducer(reducer, initialState);
};

export default useGlobalReducer;