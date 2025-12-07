import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  darkMode: localStorage.getItem('darkMode') === 'true',
  notifications: [],
  searchQuery: '',
  loading: {
    global: false,
    donations: false,
    campaigns: false,
    auth: false,
  },
  modal: {
    open: false,
    type: null,
    data: null,
  },
  alert: {
    show: false,
    type: 'info',
    message: '',
    timeout: 3000,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    showAlert: (state, action) => {
      state.alert = {
        show: true,
        type: action.payload.type || 'info',
        message: action.payload.message,
        timeout: action.payload.timeout || 3000,
      };
    },
    clearAlert: (state) => {
      state.alert.show = false;
    },
    openModal: (state, action) => {
      state.modal = {
        open: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modal.open = false;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        read: false,
        ...action.payload,
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleDarkMode,
  setDarkMode,
  setSearchQuery,
  clearSearchQuery,
  setLoading,
  showAlert,
  clearAlert,
  openModal,
  closeModal,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer; 