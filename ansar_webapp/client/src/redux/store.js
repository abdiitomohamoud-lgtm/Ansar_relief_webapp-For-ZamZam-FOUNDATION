import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import campaignReducer from './slices/campaignSlice';
import categoryReducer from './slices/categorySlice';
import donationReducer from './slices/donationSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    auth: authReducer,
    campaigns: campaignReducer,
    categories: categoryReducer,
    donations: donationReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store; 