import './App.css';
import LandingPage from './component/Pages/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './component/Pages/LoginPage';
import SignupPage from './component/Pages/SignupPage';
import EditProfilePage from './component/Pages/EditProfilePage.jsx';
import LandingLaylout from './component/Layout/LandingLayout';
import ProfileLayout from './component/Layout/ProfileLayout';
import EventTypes from './component/EventTypes/EventTypes';
import Availability from './component/Availability/Availability';
import SettingAvailabilty from './component/Availability/SettingAvailabilty';
import OneEvent from './component/Booking/OneEvent';
import AllEvent from './component/Booking/AllEvent';
import RescheduleBooking from './component/Booking/RescheduleBooking.jsx';
import { Toaster } from 'react-hot-toast';
import AllMeeting from './component/AllMeeting/AllMeeting.jsx';
import PageNotFound from './component/PageNotFound/PageNotFound.jsx';
import ProtectedRoute from './component/Utils/ProtectedRoute.jsx';
import PublicRoute from './component/Utils/PublicRoute.jsx';
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingLaylout />
            </PublicRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/setting/availabilty" element={<SettingAvailabilty />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/user/event-type" />}></Route>
          <Route path="event-type" element={<EventTypes />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="meeting" element={<AllMeeting />} />
          <Route path="availability" element={<Availability />} />
        </Route>
        <Route path="/book/event/:userId" element={<AllEvent />} />
        <Route path="/book/event/:userId/:eventId" element={<OneEvent />} />
        <Route path="/booking/rescheduling/:bookingId/" element={<RescheduleBooking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
