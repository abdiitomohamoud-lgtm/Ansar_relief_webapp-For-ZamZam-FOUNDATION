import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

// Async thunks
export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/api/campaigns', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getCampaignById = createAsyncThunk(
  'campaigns/getCampaignById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get(`/api/campaigns/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/api/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.put(`/api/campaigns/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaigns/deleteCampaign',
  async (id, { rejectWithValue }) => {
    try {
      await axiosConfig.delete(`/api/campaigns/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// For demo purposes, adding mock data
const mockCampaigns = [
  {
    id: 1,
    title: 'Emergency Relief for Gaza',
    slug: 'emergency-relief-gaza',
    description: 'Providing emergency aid to families affected by the crisis in Gaza.',
    content: '<p>This campaign aims to provide food, water, and medical supplies to families in Gaza.</p>',
    goal_amount: 100000,
    raised_amount: 75000,
    start_date: '2023-10-15',
    end_date: '2023-12-31',
    featured_image: '/images/campaigns/gaza-relief.jpg',
    category_id: 1,
    is_featured: true,
    is_active: true,
    created_at: '2023-10-15T12:00:00Z',
    updated_at: '2023-10-15T12:00:00Z'
  },
  {
    id: 2,
    title: 'Yemen Humanitarian Crisis',
    slug: 'yemen-humanitarian-crisis',
    description: 'Supporting families affected by the ongoing humanitarian crisis in Yemen.',
    content: '<p>This campaign focuses on providing food, clean water, and healthcare to Yemeni families.</p>',
    goal_amount: 75000,
    raised_amount: 45000,
    start_date: '2023-09-01',
    end_date: '2023-12-31',
    featured_image: '/images/campaigns/yemen-crisis.jpg',
    category_id: 1,
    is_featured: true,
    is_active: true,
    created_at: '2023-09-01T12:00:00Z',
    updated_at: '2023-09-01T12:00:00Z'
  },
  {
    id: 3,
    title: 'Syria Winter Appeal',
    slug: 'syria-winter-appeal',
    description: 'Helping Syrian refugees survive the harsh winter conditions.',
    content: '<p>This campaign aims to provide warm clothing, blankets, and heating supplies to Syrian refugees.</p>',
    goal_amount: 50000,
    raised_amount: 30000,
    start_date: '2023-11-01',
    end_date: '2024-02-28',
    featured_image: '/images/campaigns/syria-winter.jpg',
    category_id: 1,
    is_featured: false,
    is_active: true,
    created_at: '2023-11-01T12:00:00Z',
    updated_at: '2023-11-01T12:00:00Z'
  }
];

// Initial state
const initialState = {
  campaigns: mockCampaigns,
  campaign: null,
  featuredCampaigns: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch campaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns || mockCampaigns;
        state.featuredCampaigns = action.payload.campaigns?.filter(c => c.is_featured) || 
                                 mockCampaigns.filter(c => c.is_featured);
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch campaigns';
      })
      
      // Get campaign by ID
      .addCase(getCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.campaign = action.payload;
      })
      .addCase(getCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch campaign';
      })
      
      // Create campaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.push(action.payload);
        state.success = true;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create campaign';
      })
      
      // Update campaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.campaigns.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }
        state.campaign = action.payload;
        state.success = true;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update campaign';
      })
      
      // Delete campaign
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete campaign';
      });
  },
});

export const { clearError, clearSuccess } = campaignSlice.actions;

export default campaignSlice.reducer; 