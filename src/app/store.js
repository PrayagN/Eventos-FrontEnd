import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import OrganizerSlice from "./organizerSlice";
import sidebarSlice from "./sidebarSlice";
const Store = configureStore({
  reducer: { user: UserSlice.reducer, organizer: OrganizerSlice.reducer,sidebar:sidebarSlice.reducer },
});
export default Store;
