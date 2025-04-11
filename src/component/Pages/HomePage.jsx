import { Link, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const HomePage = () => {
  return (
    <>
      <Link to="meeting">meeing</Link>
      <Link to="shecedule">shcedule</Link>
      <Link to="edit">edit</Link>
      <Outlet />
    </>
  );
};

export default HomePage;
