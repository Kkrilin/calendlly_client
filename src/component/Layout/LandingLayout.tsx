import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import { Outlet } from "react-router-dom";
function LandingLaylout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default LandingLaylout;
