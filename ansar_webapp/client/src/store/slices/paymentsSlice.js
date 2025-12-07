import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPaymentMethods = createAsyncThunk('payments/fetchPaymentMethods', async (email) => {
  const res = await axios.get('/api/user-payment-methods', { params: { email } });
  return res.data;
});

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    paymentMethods: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentsSlice.reducer;
