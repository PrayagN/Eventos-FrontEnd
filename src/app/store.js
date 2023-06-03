import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import OrganizerSlice from "./organizerSlice";
import sidebarSlice from "./sidebarSlice";
import AdminSlice from "./adminSlice";
const Store = configureStore({
  reducer: { user: UserSlice.reducer, organizer: OrganizerSlice.reducer,sidebar:sidebarSlice.reducer,admin:AdminSlice.reducer },
});
export default Store;
