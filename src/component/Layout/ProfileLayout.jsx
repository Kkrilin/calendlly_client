import { useEffect, useState } from "react";
import LeftSideBar from "../LeftSidebar/LeftSideBar.jsx";
import ProfileHeader from "../ProfileHeader.jsx/ProfileHeader.jsx";
import { Outlet } from "react-router-dom";
import { availabilityBaseUrl, header } from "../../api.js";
import SettingAvailabilty from "../Availability/SettingAvailabilty.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/CircularLoader.jsx";

function ProfileLayout() {
  const [isAvailabilityExist, setIsAvailabilityExist] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  header.headers.Authorization = `Bearer ${token}`;
  useEffect(() => {
    axios
      .get(availabilityBaseUrl, header)
      .then((res) => {
        if (!res.data.availability.length) {
          navigate("/setting/availabilty");
        } else {
          setIsAvailabilityExist(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!isAvailabilityExist) {
    return <Loader />;
  }

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <LeftSideBar />
      <div
        style={{
          width: "86vw",
          padding: "2rem 12rem",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <ProfileHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
