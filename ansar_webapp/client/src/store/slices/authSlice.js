import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lastLogin: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.lastLogin = new Date().toISOString();
    },
    
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    registerFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Action creators
export const {
  setLoading,
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  updateUser,
  clearError
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectLastLogin = (state) => state.auth.lastLogin;

export default authSlice.reducer;