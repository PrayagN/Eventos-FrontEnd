import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    admintoken: null,
    authorized: false,
  },
  reducers: {
    adminLogin(state, actions) {
      const newItem = actions.payload;
      state.admintoken = newItem.admintoken;
      state.authorized = true;
    },
    adminLogout(state) {
      state.admintoken = "";
      state.authorized = false;
    },
  },
});
export const adminActions = AdminSlice.actions;
export default AdminSlice;
