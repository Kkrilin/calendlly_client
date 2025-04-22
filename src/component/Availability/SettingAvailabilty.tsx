import StartAndEndTime from "./StartAndEndTime";
import { weekDays } from "../../utils";
import { useState, useEffect } from "react";
// import WeekDay from "./WeekDay";
import { Button } from "@mui/material";
import { availabilityBaseUrl, header } from "../../api";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ActiveStatus, AvailabilityPayload, AvailabilityResponse, DayOfWeek } from "../../constant";
import Loader from "../Loader/CircularLoader";

const SettingAvailabilty = () => {
  const [availabilities, setAvailabilities] = useState<AvailabilityPayload[]>([]);
  const [isAvailabilityExist, setIsAvailabilityExist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const token: string | null = localStorage.getItem("token");
  const [availabilityError, setAvailablityError] = useState<boolean>(false);
  const navigate = useNavigate();

  if (token && header.headers) {
    header.headers.Authorization = `Bearer ${token}`;
  }

  const handleSubmit = () => {
    if (availabilityError) {
      toast.error("availabilty is not correct");
      return;
    }
    const selectWeekDay = availabilities.some((av) => av.active);
    if (!selectWeekDay || !availabilities.length) {
      toast.error("please select at least one");
      return;
    }

    axios
      .post(availabilityBaseUrl, { availabilities }, header)
      .then((res) => {
        console.log(res.data);
        navigate("/user/event_type");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>(availabilityBaseUrl, header)
      .then((res: AxiosResponse<{ sucess: 1 | 0, availability: AvailabilityResponse[] }>) => {
        if (res.data.availability.length) {
          navigate("/user/event_type");
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      }).finally(() => { setLoading(false); });
  }, []);

  if (!token) {
    toast.error("Please login again");
    localStorage.clear();
    setTimeout(() => navigate("/login"), 1000);
    return null;
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "30vw" }}>
        <h1>meeting Availability</h1>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "20px",
            marginTop: "2rem",
            paddingBottom: "2rem",
            borderTop: "1px solid #e7f1ff",
          }}
        >
          <div className="availability_container">
            <p style={{ color: "blue" }}>
              set your availability for us to get started latter you can change
              it
            </p>
            <h3>Weekly hours</h3>
            <div className="weekly_hour_container">
              {weekDays.map((week) => (
                <WeekDay
                  key={week}
                  week={week}
                  setAvailabilities={setAvailabilities}
                  setAvailablityError={setAvailablityError}
                  availabilities={availabilities}
                />
              ))}
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WeekDayProps {
  week: DayOfWeek;
  setAvailabilities: React.Dispatch<React.SetStateAction<AvailabilityPayload[]>>;
  setAvailablityError: React.Dispatch<React.SetStateAction<boolean>>;
  availabilities: AvailabilityPayload[]
}

const WeekDay = ({ week, setAvailabilities, setAvailablityError, availabilities }: WeekDayProps) => {
  const [startTime, setStartTime] = useState<string>("09:00 am");
  const [endTime, setEndTime] = useState<string>("05:00 pm");
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (availabilities && !availabilities.length) {
      setAvailabilities((preState) => {
        const availability = {
          dayOfWeek: week,
          startTime,
          endTime,
          active: checked ? ActiveStatus.ACTIVE : ActiveStatus.INACTIVE,
        };
        return [...preState, availability];
      });
    } else if (availabilities && availabilities.length) {
      setAvailabilities((preState) => {
        const filterState = preState.filter((prv) => prv.dayOfWeek !== week);
        const availability = {
          dayOfWeek: week,
          startTime,
          endTime,
          active: checked ? ActiveStatus.ACTIVE : ActiveStatus.INACTIVE,
        };
        return [...filterState, availability];
      });
    }
  }, [checked, startTime, endTime]);

  return (
    <div className="week_days">
      <div style={{ marginRight: "40px" }}>
        <label
          style={{
            width: "3rem",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
          htmlFor={week}
        >
          <input
            onChange={() => setChecked((preState) => !preState)}
            id={week}
            type="checkbox"
            style={{
              width: "25px",
              height: "25px",
            }}
          // value={week}
          />
          {week.toUpperCase()}
        </label>
      </div>
      <StartAndEndTime
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setError={setError}
        error={error}
        setAvailablityError={setAvailablityError}
      />
    </div>
  );
};

export default SettingAvailabilty;
