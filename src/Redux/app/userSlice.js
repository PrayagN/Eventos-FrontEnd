import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
  },
  reducers: {
    userLogin(state, actions) {
      state.authorized = true;
    },
    userLogout(state) {
      state.authorized = false;
    },
  },
});
export const userActions = UserSlice.actions;
export default UserSlice;
