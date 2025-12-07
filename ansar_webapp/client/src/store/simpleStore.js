import { configureStore, createSlice } from '@reduxjs/toolkit';

// Simple counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

// Create a simple store with just the counter reducer
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store; 