import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import LandingPage from "../pages/User/LandingPage";
import UserOtpPage from "../pages/User/UserOtpPage1";
import OrganizerPage from "../pages/User/OrganizerPage";
import ServicesPage from "../pages/User/ServicesPage";
import UnauthorizedRoutes from "../middleware/UnauthorizedRoutes";
function UserRouter() {
  return (
    <Routes>
      <Route element={<UnauthorizedRoutes role={'user'} route={'/'} />}>
        <Route path="/signin" element={<UserLoginPage />} />

        <Route path="/signup" element={<UserSignupPage />} />
      </Route>

      <Route path="/otp" element={<UserOtpPage />} />

      <Route path="/" element={<LandingPage />} />
      <Route path="/organizers" element={<OrganizerPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  );
}

export default UserRouter;
