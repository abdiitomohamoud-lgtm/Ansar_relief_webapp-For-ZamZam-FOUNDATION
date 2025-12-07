import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

// Async thunks
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/api/categories');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get(`/api/categories/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/api/categories', formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.put(`/api/categories/${id}`, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await axiosConfig.delete(`/api/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Mock data
const mockCategories = [
  {
    id: 1,
    name: 'Emergency Relief',
    slug: 'emergency-relief',
    description: 'Urgent humanitarian aid for crisis situations',
    icon: 'FaHandHoldingMedical',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Water & Sanitation',
    slug: 'water-sanitation',
    description: 'Clean water and sanitation projects',
    icon: 'FaWater',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Education',
    slug: 'education',
    description: 'Educational programs and school support',
    icon: 'FaGraduationCap',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Food Security',
    slug: 'food-security',
    description: 'Food distribution and sustainable agriculture',
    icon: 'FaAppleAlt',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Medical aid and healthcare services',
    icon: 'FaHospital',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Orphan Sponsorship',
    slug: 'orphan-sponsorship',
    description: 'Support for orphaned children',
    icon: 'FaChild',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

// Initial state
const initialState = {
  categories: mockCategories,
  category: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || mockCategories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch categories';
        // Fallback to mock data in case of API failure
        state.categories = mockCategories;
      })
      
      // Get category by ID
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch category';
      })
      
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create category';
      })
      
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.category = action.payload;
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update category';
      })
      
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(c => c.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete category';
      });
  },
});

export const { clearError, clearSuccess } = categorySlice.actions;

export default categorySlice.reducer; 