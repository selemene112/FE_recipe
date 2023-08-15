import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './Modules/navbarSlice';

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});

export default store;
