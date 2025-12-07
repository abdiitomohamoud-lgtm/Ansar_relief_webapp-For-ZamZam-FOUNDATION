import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createVolunteerProfile = createAsyncThunk(
  'volunteers/create',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}/volunteers/profile`, profileData, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getVolunteerProfile = createAsyncThunk(
  'volunteers/getProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/volunteers/profile`, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateVolunteerProfile = createAsyncThunk(
  'volunteers/update',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${API_URL}/volunteers/profile`, profileData, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const volunteerSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {
    resetVolunteerProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVolunteerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createVolunteerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(createVolunteerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getVolunteerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVolunteerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getVolunteerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateVolunteerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVolunteerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateVolunteerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVolunteerProfile } = volunteerSlice.actions;
export default volunteerSlice.reducer; 