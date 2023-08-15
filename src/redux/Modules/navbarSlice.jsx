import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { toggleNavbar, setUserData } = navbarSlice.actions;

export const selectNavbarIsOpen = (state) => state.navbar.isOpen;
export const selectUserData = (state) => state.navbar.userData;

export default navbarSlice.reducer;
