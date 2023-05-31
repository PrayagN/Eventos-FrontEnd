// openSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState:{
    open:true
  },
  reducers: {
    setOpen: (state, action) => {
       const sidebar = action.payload
        state.open = sidebar
    },
  },
});

export const sidebarAction = sidebarSlice.actions;
export default sidebarSlice
