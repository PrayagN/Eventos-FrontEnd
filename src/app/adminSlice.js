import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    authorized: false,
  },
  reducers: {
    adminLogin(state) {
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
