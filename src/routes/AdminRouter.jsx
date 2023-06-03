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
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
function AdminRouter() {
  const { adminLogin, adminLogout } = adminActions;

  const dispatch = useDispatch();

  let token = localStorage.getItem("admintoken");
  const authStateListener = async () => {
    if (token) {
      try {
        let decoded = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(adminLogin());
        } else {
          toast.error("session expired, please signin");
          localStorage.removeItem("admintoken");
          dispatch(adminLogout());
        }
      } catch (error) {
        dispatch(adminLogout());
      }
    }
  };
  useEffect(() => {
    authStateListener();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />
        }
      />
      {/* <Route path="/" element={<UnauthorizedRoutes role={"admin"} />} /> */}
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
