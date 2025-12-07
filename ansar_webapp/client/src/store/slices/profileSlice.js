import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for profile management
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const email = state.auth?.user?.email; // Use email from Redux state
      const token = state.auth?.user?.token;
      const response = await axios.get('/api/user-info', {
        params: { email },
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      // Ensure email is present in profileData
      if (!profileData.email) throw new Error('Email is required to update profile');
      const state = getState();
      const token = state.auth?.user?.token;
      const response = await axios.put('/api/user-info', profileData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await axios.post('/api/user-profile-page/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateNotificationPreferences = createAsyncThunk(
  'profile/updateNotificationPreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/user/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePrivacySettings = createAsyncThunk(
  'profile/updatePrivacySettings',
  async (settings, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/user/privacy/settings', settings);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  profile: {
    profileInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      location: '',
      avatar: '',
      bio: '',
      gender: '',
      joinDate: '',
      badges: []
    },
    stats: {
      totalDonated: 0,
      campaignsSupported: 0,
      monthlyAverage: 0,
      impactScore: 0,
      lastDonation: null,
    },
    impactBadges: [],
    recentActivity: [],
    savedCampaigns: [],
    settings: {},
  },
  ui: {
    isLoading: false,
    error: null,
    activeSection: 'overview',
    activeSettingsTab: 'profile',
    isEditing: false,
    showNotificationSettings: false,
  },
  cache: {
    lastUpdated: null,
    needsRefresh: false,
  }
};

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.ui.activeSection = action.payload;
    },
    setActiveSettingsTab: (state, action) => {
      state.ui.activeSettingsTab = action.payload;
    },
    setIsEditing: (state, action) => {
      state.ui.isEditing = action.payload;
    },
    toggleNotificationSettings: (state) => {
      state.ui.showNotificationSettings = !state.ui.showNotificationSettings;
    },
    updateThemePreference: (state, action) => {
      state.profile.preferences.theme = action.payload;
    },
    updateLanguagePreference: (state, action) => {
      state.profile.preferences.language = action.payload;
    },
    updateCurrencyPreference: (state, action) => {
      state.profile.preferences.currency = action.payload;
    },
    clearError: (state) => {
      state.ui.error = null;
    },
    markNeedsRefresh: (state) => {
      state.cache.needsRefresh = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.ui.isLoading = true;
      state.ui.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.ui.isLoading = false;
      // Always set profileInfo to the latest profile data from backend
      state.profile.profileInfo = action.payload;
      state.cache.lastUpdated = new Date().toISOString();
      state.cache.needsRefresh = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.ui.isLoading = false;
      state.ui.error = action.payload;
    });

    // Update Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.ui.isLoading = true;
      state.ui.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.ui.isLoading = false;
      // Always set profileInfo to the latest profile data from backend
      state.profile.profileInfo = action.payload;
      state.cache.lastUpdated = new Date().toISOString();
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.ui.isLoading = false;
      state.ui.error = action.payload;
    });

    // Update Profile Image
    builder.addCase(updateProfileImage.pending, (state) => {
      state.ui.isLoading = true;
      state.ui.error = null;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.ui.isLoading = false;
      state.profile.personalInfo.avatar = action.payload.avatarUrl;
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.ui.isLoading = false;
      state.ui.error = action.payload;
    });

    // Update Notification Preferences
    builder.addCase(updateNotificationPreferences.fulfilled, (state, action) => {
      state.profile.notifications = { ...state.profile.notifications, ...action.payload };
    });

    // Update Privacy Settings
    builder.addCase(updatePrivacySettings.fulfilled, (state, action) => {
      state.profile.privacy = { ...state.profile.privacy, ...action.payload };
    });
  },
});

export const {
  setActiveSection,
  setActiveSettingsTab,
  setIsEditing,
  toggleNotificationSettings,
  updateThemePreference,
  updateLanguagePreference,
  updateCurrencyPreference,
  clearError,
  markNeedsRefresh,
} = profileSlice.actions;

export default profileSlice.reducer;