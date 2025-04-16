import { useParams } from "react-router-dom";
import MyCalendar from "../MyCalendar/MyCalendar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  availabilityBaseUrl,
  header,
  eventLookUpUrl,
  getTimeSlotsUrl,
} from "../../api";
import toast from "react-hot-toast";

import moment from "moment";

import { Stack } from "@mui/material";
import BookEventPopOver from "../Utils/PopOver/BookEventPopOver";

const OneEvent = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [eventType, setEventType] = useState({});
  const [date, setDate] = useState(new Date());
  const [bookTime, setBookTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [duration, setDuration] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);
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
  useEffect(() => {
    if (date) {
      header.params = {
        meetingDate: date,
      };
      axios
        .get(`${getTimeSlotsUrl}/${params.userId}/${params.eventId}`, header)
        .then((res) => {
          setTimeSlots(res.data.timeSlots);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [date]);

  if (bookingResponse) {
    toast.success("booking successFull");
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <div className="booking_success_card">
          <h1>Booking SuccsessFull</h1>
        </div>
      </div>
    );
  }
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
        <div
          style={{
            width: "30%",
            borderRight: "1px solid grey",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h4>{eventType.User?.name}</h4>
          <h4>
            <span>EventType: </span>
            <span className="name">{eventType.title} </span>
          </h4>
          <h5>
            <span>Event Duration(minutes): </span>
            <span className="name">{eventType.durationMinutes} </span>
          </h5>
          {/* <label
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "16px",
            }}
            htmlFor="duration"
          >
            Duration
            <select
              onChange={(e) => setDuration(e.target.value)}
              id="duration"
              className="select_option"
              defaultValue={`${duration} min`}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
            </select>
          </label> */}
        </div>
        <div style={{ padding: "2rem" }}>
          <h3 style={{}}>Select date and Time</h3>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: "2rem",
              paddingTop: "1rem",
            }}
          >
            <div>
              <MyCalendar
                availabilities={availabilities}
                date={date}
                setDate={setDate}
                setTimeSlots={setTimeSlots}
              />
            </div>
            {date && (
              <div>
                {date && <p>{date.toDateString()}</p>}
                {/* <h1>{date.getDay()}</h1> */}
                <div
                  style={{
                    overflowY: "auto",
                    height: "60vh",
                    margin: "1rem 0",
                    width: "20rem",
                  }}
                >
                  <div style={{ width: "14rem" }}>
                    {timeSlots.length ? (
                      timeSlots.map((timeSlot, id) => (
                        <Time
                          key={id}
                          timeSlot={timeSlot}
                          setBookTime={setBookTime}
                          bookTime={bookTime}
                          date={date && moment(date).format("YYYY-MM-DD")}
                          setBookingResponse={setBookingResponse}
                        />
                      ))
                    ) : (
                      <h3>
                        there is no availability for the day please select
                        another day
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Time = ({
  timeSlot,
  bookTime,
  setBookTime,
  date,
  setBookingResponse,
}) => {
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
          backgroundColor: `${bookTime === timeSlot ? "grey" : "white"}`,
          width: `${bookTime === timeSlot ? "6.5rem" : "14rem"}`,
          color: `${bookTime === timeSlot ? "white" : "#0066e6"}`,
        }}
        onClick={(e) => setBookTime(e.target.innerText)}
      >
        {timeSlot}
      </span>
      {bookTime === timeSlot && (
        <BookEventPopOver
          setBookingResponse={setBookingResponse}
          bookTime={bookTime}
          bookDate={date}
        >
          next
        </BookEventPopOver>
      )}
    </div>
  );
};

export default OneEvent;
