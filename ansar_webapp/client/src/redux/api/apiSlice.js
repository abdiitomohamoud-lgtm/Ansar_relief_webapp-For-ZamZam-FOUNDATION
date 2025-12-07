import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for API requests
const baseUrl = process.env.REACT_APP_API_URL || '/api';

// Prepare headers with authentication token
const prepareHeaders = (headers, { getState }) => {
  // Get token from auth state
  const token = localStorage.getItem('token');
  
  // If token exists, add it to the headers
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return headers;
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: [
    'User', 
    'Campaign', 
    'Donation', 
    'Category', 
    'Sponsorship',
    'Project',
    'Event',
    'News',
    'FAQ'
  ],
  endpoints: () => ({}),
});

// Export hooks for usage in components
export const {
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = apiSlice; 