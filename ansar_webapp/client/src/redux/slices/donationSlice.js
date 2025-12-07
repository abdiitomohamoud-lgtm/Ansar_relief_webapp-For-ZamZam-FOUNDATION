import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

// Async thunks
export const createDonation = createAsyncThunk(
  'donations/createDonation',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/api/donations', donationData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getUserDonations = createAsyncThunk(
  'donations/getUserDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/api/donations/user');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getDonationById = createAsyncThunk(
  'donations/getDonationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get(`/api/donations/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Mock data for development
const mockDonations = [
  {
    id: 'don-123456',
    amount: 100,
    currency: 'USD',
    status: 'completed',
    payment_method: 'credit_card',
    campaign_id: 1,
    campaign_title: 'Emergency Relief for Gaza',
    user_id: 1,
    created_at: '2023-10-20T14:23:45Z',
  },
  {
    id: 'don-123457',
    amount: 50,
    currency: 'USD',
    status: 'completed',
    payment_method: 'paypal',
    campaign_id: 2,
    campaign_title: 'Yemen Humanitarian Crisis',
    user_id: 1,
    created_at: '2023-09-15T10:12:30Z',
  },
  {
    id: 'don-123458',
    amount: 25,
    currency: 'USD',
    status: 'completed',
    payment_method: 'credit_card',
    campaign_id: 3,
    campaign_title: 'Syria Winter Appeal',
    user_id: 1,
    created_at: '2023-11-05T09:45:22Z',
  }
];

// Initial state
const initialState = {
  donations: [],
  userDonations: [],
  currentDonation: null,
  loading: false,
  error: null,
  success: false,
  stats: {
    totalDonated: 0,
    donationCount: 0,
    campaignsSupported: 0,
  },
};

// Slice
const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentDonation: (state, action) => {
      state.currentDonation = action.payload;
    },
    clearCurrentDonation: (state) => {
      state.currentDonation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create donation
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDonation = action.payload;
        state.success = true;
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create donation';
      })
      
      // Get user donations
      .addCase(getUserDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.userDonations = action.payload || mockDonations;
        
        // Calculate stats
        const donations = action.payload || mockDonations;
        state.stats = {
          totalDonated: donations.reduce((sum, donation) => sum + donation.amount, 0),
          donationCount: donations.length,
          campaignsSupported: new Set(donations.map(d => d.campaign_id)).size,
        };
      })
      .addCase(getUserDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user donations';
        
        // Use mock data in development
        if (process.env.NODE_ENV === 'development') {
          state.userDonations = mockDonations;
          state.stats = {
            totalDonated: mockDonations.reduce((sum, donation) => sum + donation.amount, 0),
            donationCount: mockDonations.length,
            campaignsSupported: new Set(mockDonations.map(d => d.campaign_id)).size,
          };
        }
      })
      
      // Get donation by ID
      .addCase(getDonationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDonation = action.payload;
      })
      .addCase(getDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch donation';
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setCurrentDonation,
  clearCurrentDonation,
} = donationSlice.actions;

export default donationSlice.reducer; 