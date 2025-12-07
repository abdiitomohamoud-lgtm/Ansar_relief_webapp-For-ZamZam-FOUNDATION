import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRole = createAsyncThunk('role/fetchRole', async (userId) => {
  const res = await axios.get(`/api/role/${userId}`);
  return res.data;
});
export const updateRole = createAsyncThunk('role/updateRole', async (payload) => {
  const res = await axios.post('/api/role', payload);
  return res.data;
});

const roleSlice = createSlice({
  name: 'role',
  initialState: { role: 'user', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.error = null;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.error = null;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default roleSlice.reducer;
