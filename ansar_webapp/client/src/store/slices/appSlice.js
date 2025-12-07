import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDebugMode: process.env.NODE_ENV === 'development',
  notifications: [],
  loading: false,
  error: null,
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchQuery: '',
  recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
  lastUpdated: null,
  isLoading: false,
  lastNotificationId: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleDebugMode: (state) => {
      state.isDebugMode = !state.isDebugMode;
    },
    addNotification: (state, action) => {
      // Generate a unique ID for the notification
      const id = state.lastNotificationId + 1;
      
      // Add the notification to the array
      state.notifications.push({
        id,
        type: action.payload.type || 'info',
        message: action.payload.message,
        timestamp: Date.now(),
      });
      
      // Update the last notification ID
      state.lastNotificationId = id;
    },
    removeNotification: (state, action) => {
      // Remove the notification with the given ID
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      // Clear all notifications
      state.notifications = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      
      // Only add to recent searches if it's not empty
      if (action.payload.trim()) {
        // Add to recent searches if it doesn't exist yet
        if (!state.recentSearches.includes(action.payload)) {
          state.recentSearches = [
            action.payload,
            ...state.recentSearches.slice(0, 4), // Keep only 5 recent searches
          ];
          localStorage.setItem(
            'recentSearches',
            JSON.stringify(state.recentSearches)
          );
        }
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem('recentSearches');
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleDebugMode,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setError,
  clearError,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  setSearchQuery,
  clearRecentSearches,
  updateLastUpdated,
} = appSlice.actions;

export default appSlice.reducer; 