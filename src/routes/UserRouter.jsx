import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import LandingPage from "../pages/User/LandingPage";
import UserOtpPage from "../pages/User/UserOtpPage1";
import OrganizerPage from "../pages/User/OrganizerPage";
function UserRouter() {
  return (
    <Routes>
      <Route path="/signin" element={<UserLoginPage />} />
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/" element ={<LandingPage/>} />
      <Route path ='/otp' element ={<UserOtpPage/>} />
      <Route path="/organizers" element={<OrganizerPage/>}/>
    </Routes>
  );
}

export default UserRouter;
