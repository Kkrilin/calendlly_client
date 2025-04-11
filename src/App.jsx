import "./App.css";
import LandingPage from "./component/Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Pages/LoginPage";
import SignupPage from "./component/Pages/SignupPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomePage from "./component/Pages/HomePage";
import LandingLaylout from "./component/Layout/LandingLayout";
function App() {
  return (
    <BrowserRouter>
      {/* <Header></Header> */}
      <Routes>
        <Route path="/" element={<LandingLaylout />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/app" element={<HomePage />}>
          <Route
            path="event_type/user/me"
            element={<h1>welcome to your profile</h1>}
          ></Route>
          <Route path="meeting" element={<h1>meeting</h1>}></Route>
          <Route path="edit" element={<h1>editttttt</h1>} />
          <Route path="shecedule" element={<h1>shecedule</h1>} />
        </Route>
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
