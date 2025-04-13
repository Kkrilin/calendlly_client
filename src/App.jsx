import "./App.css";
import LandingPage from "./component/Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Pages/LoginPage";
import SignupPage from "./component/Pages/SignupPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomePage from "./component/Pages/HomePage";
import LandingLaylout from "./component/Layout/LandingLayout";
import ProfileLayout from "./component/Layout/ProfileLayout";
import EventTypes from "./component/EventTypes/EventTypes";
import Availability from "./component/Availability/Availability";
import SettingAvailabilty from "./component/Availability/SettingAvailabilty";
import OneEvent from "./component/Booking/OneEvent";
import AllEvent from "./component/Booking/AllEvent";
import { Toaster } from "react-hot-toast";
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
        <Route path="/setting/availabilty" element={<SettingAvailabilty />} />
        <Route path="/user" element={<ProfileLayout />}>
          <Route index path="event_type" element={<EventTypes />} />
          <Route path="meeting" element={<h1>editttttt</h1>} />
          <Route path="availability" element={<Availability />} />
        </Route>
        <Route path="/book/event/:userId" element={<AllEvent />} />
        <Route path="/book/event/:userId/:eventId" element={<OneEvent />} />
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
