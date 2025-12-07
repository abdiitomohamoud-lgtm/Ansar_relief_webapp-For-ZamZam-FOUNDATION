import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSavedCampaigns = createAsyncThunk('campaigns/fetchSavedCampaigns', async (email) => {
  const res = await axios.get('/api/user-saved-campaigns', { params: { email } });
  return res.data;
});

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: {
    savedCampaigns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.savedCampaigns = action.payload;
      })
      .addCase(fetchSavedCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default campaignsSlice.reducer;
