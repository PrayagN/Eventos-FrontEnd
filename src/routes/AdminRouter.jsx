import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboardpage from "../pages/Admin/Dashboardpage";
import CustomerPage from "../pages/Admin/CustomerPage";
import EventsPage from "../pages/Admin/EventsPage";
import OrganizerPage from "../pages/Admin/OrganizerPage";
import PrivateRoutes from "../middleware/PrivateRoutes";
import UnauthorizedRoutes from "../middleware/UnauthorizedRoutes";
import  AdminLoginPage  from '../pages/Admin/AdminLoginPage'
import { adminActions } from "../app/adminSlice";
import { useDispatch } from "react-redux";

function AdminRouter() {
  

  return (
    <Routes>
      
      <Route  element={<UnauthorizedRoutes role={"admin"} route={'/admin/dashboard'} />}>
        <Route path="/" element={<AdminLoginPage />} />
      </Route>
      <Route element={<PrivateRoutes role={"admin"} route={"/admin"} />}>
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/organizers" element={<OrganizerPage />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
