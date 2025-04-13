import { useParams } from "react-router-dom";
import MyCalendar from "../MyCalendar/MyCalendar";
import { useEffect, useState } from "react";
import axios from "axios";
import { availabilityBaseUrl, header, eventLookUpUrl } from "../../api";
import toast from "react-hot-toast";
import { getTimeSlots } from "../../utils";

import { Stack } from "@mui/material";
import BookEventPopOver from "../Utils/PopOver/BookEventPopOver";

const OneEvent = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [eventType, setEventType] = useState({});
  const [date, setDate] = useState(new Date());
  const [bookTime, setBookTime] = useState("");
  const params = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    header.headers.Authorization = `Bearer ${token}`;
    axios
      .get(availabilityBaseUrl, header)
      .then((res) => {
        console.log("res.data.availability", res.data.availability);
        setAvailabilities(res.data.availability);
      })
      .catch((error) => console.log(error));
  }, []);

  const availabilityOnWeekDay = availabilities.find(
    (av) => av.active && av.day_of_week === date.getDay()
  );
  const startTime = availabilityOnWeekDay?.start_time;
  const endTime = availabilityOnWeekDay?.end_time;
  const meetingDuration = eventType?.durationMinutes;
  let timeSlots = [];
  if (startTime && endTime && meetingDuration) {
    timeSlots = getTimeSlots(startTime, endTime, meetingDuration);
  }
  console.log(
    meetingDuration,
    "meetingDuration",
    "endTime",
    endTime,
    "startTime",
    startTime
  );
  useEffect(() => {
    axios
      .get(`${eventLookUpUrl}/${params.userId}/${params.eventId}`, header)
      .then((res) => {
        setEventType(res.data.eventType);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="one_event">
        <div style={{ width: "25%" }}>
          <h1>{[params.userId, params.eventId]}</h1>
        </div>
        <div>
          <MyCalendar
            availabilities={availabilities}
            date={date}
            setDate={setDate}
          />
        </div>
        <div>
          <p>{date.toDateString()}</p>
          {/* <h1>{date.getDay()}</h1> */}
          <div
            style={{
              overflowY: "scroll",
              height: "60vh",
              margin: "1rem 0",
              width: "20rem",
            }}
          >
            <div style={{ width: "14rem" }}>
              {timeSlots.map((time, id) => (
                <Time
                  key={id}
                  time={time}
                  setBookTime={setBookTime}
                  bookTime={bookTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Time = ({ time, bookTime, setBookTime }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <span
        className="book_time"
        style={{
          backgroundColor: `${bookTime === time ? "grey" : "white"}`,
          width: `${bookTime === time ? "6.5rem" : "14rem"}`,
          color: `${bookTime === time ? "white" : "#0066e6"}`,
        }}
        onClick={(e) => setBookTime(e.target.innerText)}
      >
        {time}
      </span>
      {bookTime === time && <BookEventPopOver>next</BookEventPopOver>}
    </div>
  );
};

export default OneEvent;
