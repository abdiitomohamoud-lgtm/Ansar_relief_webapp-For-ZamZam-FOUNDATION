import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const changePassword = createAsyncThunk('security/changePassword', async (payload) => {
  const res = await axios.post('/api/security/change-password', payload);
  return res.data;
});
export const deleteAccount = createAsyncThunk('security/deleteAccount', async (payload) => {
  const res = await axios.post('/api/security/delete-account', payload);
  return res.data;
});
export const enable2FA = createAsyncThunk('security/enable2FA', async (payload) => {
  const res = await axios.post('/api/security/enable-2fa', payload);
  return res.data;
});

const securitySlice = createSlice({
  name: 'security',
  initialState: { status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'passwordChanged';
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = 'accountDeleted';
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message;
      })
      .addCase(enable2FA.fulfilled, (state, action) => {
        state.status = '2faEnabled';
        state.error = null;
      })
      .addCase(enable2FA.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message;
      });
  }
});

export default securitySlice.reducer;
