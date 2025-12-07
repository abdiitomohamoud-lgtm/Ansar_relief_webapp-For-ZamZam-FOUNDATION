import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDonations = createAsyncThunk('donations/fetchDonations', async (email) => {
  const res = await axios.get('/api/user-donations', { params: { email } });
  return res.data;
});

const donationsSlice = createSlice({
  name: 'donations',
  initialState: {
    donations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default donationsSlice.reducer;
