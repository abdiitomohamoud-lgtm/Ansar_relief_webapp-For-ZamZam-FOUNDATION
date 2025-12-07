import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoginHistory = createAsyncThunk('loginHistory/fetchLoginHistory', async (userId) => {
  const res = await axios.get(`/api/login-history/${userId}`);
  return res.data;
});

const loginHistorySlice = createSlice({
  name: 'loginHistory',
  initialState: { history: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.error = null;
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default loginHistorySlice.reducer;
