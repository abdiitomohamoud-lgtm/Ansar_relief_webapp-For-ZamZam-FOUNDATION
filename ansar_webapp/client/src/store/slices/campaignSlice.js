import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for campaign management
export const fetchSavedCampaigns = createAsyncThunk(
  'campaigns/fetchSaved',
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/campaigns/saved', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const saveCampaign = createAsyncThunk(
  'campaigns/save',
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user/campaigns/${campaignId}/save`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const unsaveCampaign = createAsyncThunk(
  'campaigns/unsave',
  async (campaignId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/user/campaigns/${campaignId}/save`);
      return { campaignId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCampaignRecommendations = createAsyncThunk(
  'campaigns/fetchRecommendations',
  async ({ limit = 3 }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/campaigns/recommendations', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCampaignPreferences = createAsyncThunk(
  'campaigns/updatePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/user/campaigns/preferences', preferences);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  saved: {
    campaigns: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
    },
  },
  recommendations: {
    campaigns: [],
    lastFetched: null,
  },
  preferences: {
    categories: [],
    interests: [],
    notificationFrequency: 'weekly',
    emailUpdates: true,
  },
  filters: {
    category: 'all',
    status: 'all',
    sortBy: 'endDate',
    sortOrder: 'asc',
  },
  interactions: {
    // Track user interactions with campaigns
    views: {},
    shares: {},
    lastInteraction: null,
  },
  ui: {
    isLoading: false,
    error: null,
    activeView: 'grid', // grid, list
    selectedCampaign: null,
    showPreferencesModal: false,
  },
  cache: {
    lastUpdated: null,
    needsRefresh: false,
  }
};

// Campaigns slice
const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaignFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setActiveCampaignView: (state, action) => {
      state.ui.activeView = action.payload;
    },
    setSelectedCampaign: (state, action) => {
      state.ui.selectedCampaign = action.payload;
    },
    togglePreferencesModal: (state) => {
      state.ui.showPreferencesModal = !state.ui.showPreferencesModal;
    },
    recordCampaignView: (state, action) => {
      const campaignId = action.payload;
      state.interactions.views[campaignId] = {
        lastViewed: new Date().toISOString(),
        viewCount: (state.interactions.views[campaignId]?.viewCount || 0) + 1,
      };
      state.interactions.lastInteraction = new Date().toISOString();
    },
    recordCampaignShare: (state, action) => {
      const { campaignId, platform } = action.payload;
      if (!state.interactions.shares[campaignId]) {
        state.interactions.shares[campaignId] = {};
      }
      state.interactions.shares[campaignId][platform] = new Date().toISOString();
      state.interactions.lastInteraction = new Date().toISOString();
    },
    clearCampaignError: (state) => {
      state.ui.error = null;
    },
    markCampaignsCacheStale: (state) => {
      state.cache.needsRefresh = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch Saved Campaigns
    builder.addCase(fetchSavedCampaigns.pending, (state) => {
      state.ui.isLoading = true;
      state.ui.error = null;
    });
    builder.addCase(fetchSavedCampaigns.fulfilled, (state, action) => {
      state.ui.isLoading = false;
      state.saved.campaigns = action.payload.campaigns;
      state.saved.pagination = action.payload.pagination;
      state.cache.lastUpdated = new Date().toISOString();
      state.cache.needsRefresh = false;
    });
    builder.addCase(fetchSavedCampaigns.rejected, (state, action) => {
      state.ui.isLoading = false;
      state.ui.error = action.payload;
    });

    // Save Campaign
    builder.addCase(saveCampaign.fulfilled, (state, action) => {
      state.saved.campaigns.unshift(action.payload);
      state.saved.pagination.totalItems += 1;
      state.cache.needsRefresh = true;
    });

    // Unsave Campaign
    builder.addCase(unsaveCampaign.fulfilled, (state, action) => {
      state.saved.campaigns = state.saved.campaigns.filter(
        c => c.id !== action.payload.campaignId
      );
      state.saved.pagination.totalItems -= 1;
      state.cache.needsRefresh = true;
    });

    // Fetch Recommendations
    builder.addCase(fetchCampaignRecommendations.fulfilled, (state, action) => {
      state.recommendations.campaigns = action.payload;
      state.recommendations.lastFetched = new Date().toISOString();
    });

    // Update Preferences
    builder.addCase(updateCampaignPreferences.fulfilled, (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
      state.cache.needsRefresh = true;
    });
  },
});

export const {
  setCampaignFilters,
  setActiveCampaignView,
  setSelectedCampaign,
  togglePreferencesModal,
  recordCampaignView,
  recordCampaignShare,
  clearCampaignError,
  markCampaignsCacheStale,
} = campaignSlice.actions;

export default campaignSlice.reducer; 