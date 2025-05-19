import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import { StoreProvider } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </React.StrictMode>
);