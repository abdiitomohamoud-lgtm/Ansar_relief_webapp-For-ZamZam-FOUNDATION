import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (userId) => {
  const res = await axios.get(`/api/comments/${userId}`);
  return res.data;
});
export const addComment = createAsyncThunk('comments/addComment', async (payload) => {
  const res = await axios.post('/api/comments', payload);
  return res.data;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default commentsSlice.reducer;
