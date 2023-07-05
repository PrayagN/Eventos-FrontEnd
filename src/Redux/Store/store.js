import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../app/userSlice";
import OrganizerSlice from "../app/organizerSlice";
import sidebarSlice from "../app/sidebarSlice";
import AdminSlice from "../app/adminSlice";
const Store = configureStore({
  reducer: { user: UserSlice.reducer, organizer: OrganizerSlice.reducer,sidebar:sidebarSlice.reducer,admin:AdminSlice.reducer },
});
export default Store;
