import "./App.css";
// import LandingPage from "./component/Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./component/Pages/LoginPage";
// import SignupPage from "./component/Pages/SignupPage";
// import EditProfilePage from "./component/Pages/EditProfilePage";
// import LandingLaylout from "./component/Layout/LandingLayout";
// import ProfileLayout from "./component/Layout/ProfileLayout";
// import EventTypes from "./component/EventTypes/EventTypes";
// import Availability from "./component/Availability/Availability";
// import SettingAvailabilty from "./component/Availability/SettingAvailabilty";
// import OneEvent from "./component/Booking/OneEvent";
// import AllEvent from "./component/Booking/AllEvent";
// import RescheduleBooking from "./component/Booking/RescheduleBooking";
// import AllMeeting from "./component/AllMeeting/AllMeeting";
// import PageNotFound from "./component/PageNotFound/PageNotFound";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import Loader from "./component/Loader/CircularLoader";

// Layout
const LandingLaylout = React.lazy(() => import("./component/Layout/LandingLayout"))
const ProfileLayout = React.lazy(() => import("./component/Layout/ProfileLayout"))

// Pages 
const LandingPage = React.lazy(() => import('./component/Pages/LandingPage'));
const LoginPage = React.lazy(() => import('./component/Pages/LoginPage'));
const SignupPage = React.lazy(() => import('./component/Pages/SignupPage'));
const EditProfilePage = React.lazy(() => import('./component/Pages/EditProfilePage'));
const PageNotFound = React.lazy(() => import('./component/PageNotFound/PageNotFound'));

// Feature
const EventTypes = React.lazy(() => import('./component/EventTypes/EventTypes'));
const Availability = React.lazy(() => import('./component/Availability/Availability'));
const SettingAvailabilty = React.lazy(() => import('./component/Availability/SettingAvailabilty'));
const AllMeeting = React.lazy(() => import('./component/AllMeeting/AllMeeting'));
const OneEvent = React.lazy(() => import('./component/Booking/OneEvent'));
const AllEvent = React.lazy(() => import('./component/Booking/AllEvent'));
const RescheduleBooking = React.lazy(() => import('./component/Booking/RescheduleBooking'));


function App() {
  return (
    <BrowserRouter>
      {/* <Header></Header> */}
      <Suspense fallback={<Loader />}>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingLaylout />}>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="/user/setting/availabilty" element={<SettingAvailabilty />} />
          <Route path="/user" element={<ProfileLayout />}>
            <Route path="event_type" element={<EventTypes />} />
            <Route path="edit" element={<EditProfilePage />} />
            <Route path="meeting" element={<AllMeeting />} />
            <Route path="availability" element={<Availability />} />
          </Route>
          <Route path="/book/event/:userId" element={<AllEvent />} />
          <Route path="/book/event/:userId/:eventId" element={<OneEvent />} />
          <Route path="/booking/rescheduling/:bookingId/" element={<RescheduleBooking />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
