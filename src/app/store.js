import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import OrganizerSlice from "./organizerSlice";
const Store = configureStore({
  reducer: { user: UserSlice.reducer, organizer: OrganizerSlice.reducer },
});
export default Store;
