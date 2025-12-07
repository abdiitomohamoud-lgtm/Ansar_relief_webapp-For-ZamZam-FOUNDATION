import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

import App from './App';
import { DonationProvider } from './contexts/DonationContext';
import { CartProvider } from './contexts/CartContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <DonationProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </DonationProvider>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);