import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import LandingPage from "../pages/User/LandingPage";
import UserOtpPage from "../pages/User/UserOtpPage1";
import OrganizerPage from "../pages/User/OrganizerPage";
import ServicesPage from "../pages/User/ServicesPage";
import ServicesListPage from "../pages/User/ServicesListPage";
import UnauthorizedRoutes from "../middleware/UnauthorizedRoutes";
import PrivateRoutes from "../middleware/PrivateRoutes";
import ProfilePage from "../pages/User/ProfilePage";
import OrganizerViewPage from "../pages/User/OrganizerViewPage";
import PaymentSuccess from "../components/User/Payment/PaymentSuccess";
import PaymentForm from "../components/User/Payment/Checkout";
import BookedEventsPage from "../pages/User/BookedEventsPage";
import ChatPage from "../pages/User/ChatPage";

function UserRouter() {
  return (
    <Routes>
      <Route element={<UnauthorizedRoutes role={"user"} route={"/"} />}>
        <Route path="/signin" element={<UserLoginPage />} />

        <Route path="/signup" element={<UserSignupPage />} />
      </Route>

      <Route path="/otp" element={<UserOtpPage />} />

      <Route path="/" element={<LandingPage />} />
      <Route path="/organizers" element={<OrganizerPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/organizers/view" element={<OrganizerViewPage />} />
      <Route path="/services/view" element={<OrganizerViewPage />} />
      <Route path="/services/:title" element={<ServicesListPage />} />
      <Route path="/*" element={<div>page not found</div>} />

      <Route element={<PrivateRoutes role={"user"} route={"/"} />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/booked-events' element={<BookedEventsPage/>}/>
        <Route path="/paymentform" element={<PaymentForm />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/chat" element={<ChatPage/>} />
      </Route>
    </Routes>
  );
}

export default UserRouter;
