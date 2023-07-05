import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboardpage from "../pages/Admin/Dashboardpage";
import CustomerPage from "../pages/Admin/CustomerPage";
import EventsPage from "../pages/Admin/EventsPage";
import OrganizerPage from "../pages/Admin/OrganizerPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import UnauthorizedRoutes from "../utils/UnauthorizedRoutes";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";

import OrganizerViewPage from "../pages/Admin/OrganizerViewPage";
import BookedEventsPage from "../pages/Admin/BookedEventsPage";
import Organizer404 from "../components/Error/Organizer404";

function AdminRouter() {
  return (
    <Routes>
      <Route
        element={
          <UnauthorizedRoutes role={"admin"} route={"/admin/dashboard"} />
        }
      >
        <Route path="/" element={<AdminLoginPage />} />
      </Route>
      <Route path="/*" element={< Organizer404 />} />
      <Route element={<PrivateRoutes role={"admin"} route={"/admin"} />}>
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/bookedevents" element ={< BookedEventsPage/>}/>
        <Route path="/organizers" element={<OrganizerPage />} />
        <Route path="/organizers/view/" element={<OrganizerViewPage />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
