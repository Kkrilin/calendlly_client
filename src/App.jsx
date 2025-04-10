import "./App.css";
import HomePage from "./component/Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Pages/LoginPage";
import SignupPage from "./component/Pages/SignupPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
