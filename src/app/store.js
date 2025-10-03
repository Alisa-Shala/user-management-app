// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';  // Importoni usersSlice

export const store = configureStore({
  reducer: {
    users: usersReducer,  // Lidhni usersReducer me store
  },
});
