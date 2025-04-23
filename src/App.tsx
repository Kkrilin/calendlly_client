import "./App.css";
import LandingPage from "./component/Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Pages/LoginPage";
import SignupPage from "./component/Pages/SignupPage";
import EditProfilePage from "./component/Pages/EditProfilePage";
import LandingLaylout from "./component/Layout/LandingLayout";
import ProfileLayout from "./component/Layout/ProfileLayout";
import EventTypes from "./component/EventTypes/EventTypes";
import Availability from "./component/Availability/Availability";
import SettingAvailabilty from "./component/Availability/SettingAvailabilty";
import OneEvent from "./component/Booking/OneEvent";
import AllEvent from "./component/Booking/AllEvent";
import RescheduleBooking from "./component/Booking/RescheduleBooking";
import { Toaster } from "react-hot-toast";
import AllMeeting from "./component/AllMeeting/AllMeeting";
import PageNotFound from "./component/PageNotFound/PageNotFound";


function App() {
  return (
    <BrowserRouter>
      {/* <Header></Header> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingLaylout />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/user/setting/availabilty" element={<SettingAvailabilty />} />
        <Route path="/user" element={<ProfileLayout />}>
          <Route index path="event_type" element={<EventTypes />} />
          <Route index path="edit" element={<EditProfilePage />} />
          <Route path="meeting" element={<AllMeeting />} />
          <Route path="availability" element={<Availability />} />
        </Route>
        <Route path="/book/event/:userId" element={<AllEvent />} />
        <Route path="/book/event/:userId/:eventId" element={<OneEvent />} />
        <Route path="/booking/rescheduling/:bookingId/" element={<RescheduleBooking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
