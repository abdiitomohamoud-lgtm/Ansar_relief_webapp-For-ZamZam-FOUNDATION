import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for donation management
export const fetchDonationHistory = createAsyncThunk(
  'donations/fetchHistory',
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/donations', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDonationStats = createAsyncThunk(
  'donations/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/donations/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRecurringDonation = createAsyncThunk(
  'donations/updateRecurring',
  async ({ donationId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/donations/recurring/${donationId}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const cancelRecurringDonation = createAsyncThunk(
  'donations/cancelRecurring',
  async (donationId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/donations/recurring/${donationId}`);
      return { donationId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadDonationReceipt = createAsyncThunk(
  'donations/downloadReceipt',
  async ({ donationId, format = 'pdf' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/donations/${donationId}/receipt`, {
        params: { format },
        responseType: 'blob'
      });
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `donation-receipt-${donationId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { donationId, success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  donations: {
    history: [],
    recurring: [],
    stats: {
      totalDonated: 0,
      monthlyAverage: 0,
      campaignsSupported: 0,
      recurringTotal: 0,
      lastDonation: null,
      monthlyTrends: [],
    },
    receipts: {},
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  filters: {
    dateRange: null,
    campaignId: null,
    type: 'all', // one-time, recurring, all
    status: 'all', // completed, pending, failed
    sortBy: 'date',
    sortOrder: 'desc',
  },
  ui: {
    isLoading: false,
    error: null,
    activeView: 'list', // list, grid
    selectedDonation: null,
    showReceiptModal: false,
  },
  cache: {
    lastUpdated: null,
    needsRefresh: false,
  }
};

// Donations slice
const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonationFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setActiveDonationView: (state, action) => {
      state.ui.activeView = action.payload;
    },
    setSelectedDonation: (state, action) => {
      state.ui.selectedDonation = action.payload;
    },
    toggleReceiptModal: (state) => {
      state.ui.showReceiptModal = !state.ui.showReceiptModal;
    },
    clearDonationError: (state) => {
      state.ui.error = null;
    },
    updatePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    markDonationsCacheStale: (state) => {
      state.cache.needsRefresh = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch Donation History
    builder.addCase(fetchDonationHistory.pending, (state) => {
      state.ui.isLoading = true;
      state.ui.error = null;
    });
    builder.addCase(fetchDonationHistory.fulfilled, (state, action) => {
      state.ui.isLoading = false;
      state.donations.history = action.payload.donations;
      state.pagination = action.payload.pagination;
      state.cache.lastUpdated = new Date().toISOString();
      state.cache.needsRefresh = false;
    });
    builder.addCase(fetchDonationHistory.rejected, (state, action) => {
      state.ui.isLoading = false;
      state.ui.error = action.payload;
    });

    // Fetch Donation Stats
    builder.addCase(fetchDonationStats.fulfilled, (state, action) => {
      state.donations.stats = action.payload;
    });

    // Update Recurring Donation
    builder.addCase(updateRecurringDonation.fulfilled, (state, action) => {
      const index = state.donations.recurring.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.donations.recurring[index] = action.payload;
      }
      state.cache.needsRefresh = true;
    });

    // Cancel Recurring Donation
    builder.addCase(cancelRecurringDonation.fulfilled, (state, action) => {
      state.donations.recurring = state.donations.recurring.filter(
        d => d.id !== action.payload.donationId
      );
      state.cache.needsRefresh = true;
    });

    // Download Receipt
    builder.addCase(downloadDonationReceipt.fulfilled, (state, action) => {
      state.donations.receipts[action.payload.donationId] = {
        lastDownloaded: new Date().toISOString(),
        success: true,
      };
    });
  },
});

export const {
  setDonationFilters,
  setActiveDonationView,
  setSelectedDonation,
  toggleReceiptModal,
  clearDonationError,
  updatePagination,
  markDonationsCacheStale,
} = donationSlice.actions;

export default donationSlice.reducer; 