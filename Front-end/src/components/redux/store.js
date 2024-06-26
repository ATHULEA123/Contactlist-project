import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice'; // Assuming contactSlice is the file where you defined your slice

const store = configureStore({
  reducer: {
    contacts: contactReducer
    // Add other reducers here if you have multiple slices
  }
});

export default store;