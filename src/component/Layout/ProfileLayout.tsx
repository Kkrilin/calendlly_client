import { useEffect, useState } from "react";
import LeftSideBar from "../LeftSidebar/LeftSideBar";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { availabilityBaseUrl, header } from "../../api";
import Loader from "../Loader/CircularLoader";
import toast from "react-hot-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AvailabilityResponse } from "@/constant";

function ProfileLayout() {
  const [isAvailabilityExist, setIsAvailabilityExist] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (header.headers && token) {
    header.headers.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    if (!token) return;
    axios
      .get<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>(availabilityBaseUrl, header)
      .then((res: AxiosResponse<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>) => {
        if (!res.data.availability.length) {
          navigate("/user/setting/availabilty");
        } else {
          setIsAvailabilityExist(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  if (!token) {
    toast.error("Please login again");
    localStorage.clear();
    setTimeout(() => navigate("/login"), 1000);
    return null;
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
          backgroundColor: "#FAFAFA",
        }}
      >
        <ProfileHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
