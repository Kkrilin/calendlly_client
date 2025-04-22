import StartAndEndTime from "./StartAndEndTime";
import { dayOfWeeks } from "../../utils";
import { useEffect, useState } from "react";
import WeekDay from "./WeekDay";
import { availabilityBaseUrl, header } from "../../api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AvailabilityResponse } from "@/constant";
import toast from "react-hot-toast";

const Availability = () => {
  const [availabilities, setAvailabilities] = useState<AvailabilityResponse[]>([]);

  const token = localStorage.getItem("token");
  if (token && header.headers) {
    header.headers.Authorization = `Bearer ${token}`;
  }
  useEffect(() => {
    axios
      .get<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>(availabilityBaseUrl, header)
      .then((res: AxiosResponse<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>) => {
        console.log("res.data.availability", res.data.availability);
        setAvailabilities(res.data.availability);
      })
      .catch((error: AxiosError) => toast.error(error.message));
  }, []);

  return (
    <>
      <h1>Availability</h1>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: "20px",
          marginTop: "4rem",
          paddingBottom: "2rem",
          borderTop: "1px solid #e7f1ff",
        }}
      >
        <h3>Schedule</h3>
        <div className="availability_container">
          <h3>Weekly hours</h3>
          <div className="weekly_hour_container">
            {availabilities.map((avail) => (
              <WeekDay key={avail.id} avail={avail} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
