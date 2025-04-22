import { useParams } from "react-router-dom";
import MyCalendar from "../MyCalendar/MyCalendar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  availabilityBaseUrl,
  header,
  eventLookUpUrl,
  getTimeSlotsUrl,
  resheduleBookingUrl,
} from "../../api";
import toast from "react-hot-toast";

import moment from "moment-timezone";
import BookEventPopOver from "../Utils/PopOver/BookEventPopOver";
import { format12Hour } from "../../utils";
import { AvailabilityResponse, MeetingData } from "@/constant";

const RescheduleBooking = () => {
  const [availabilities, setAvailabilities] = useState<AvailabilityResponse[]>([]);
  const [booking, setBooking] = useState<MeetingData>({} as MeetingData);
  const [date, setDate] = useState<Date | null>(null);
  const [bookTime, setBookTime] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>();
  const [bookingResponse, setBookingResponse] = useState<MeetingData | null>(null);
  const timeZone = "Asia/Kolkata";
  const params = useParams<{ bookingId: string }>();
  const formerTimeSlot = format12Hour(new Date(booking.start_time));
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (header.headers) {
      header.headers.Authorization = `Bearer ${token}`;
    }
    axios
      .get<{ success: 1, availability: AvailabilityResponse[] }>(availabilityBaseUrl, header)
      .then((res) => {
        console.log("res.data.availability", res.data.availability);
        setAvailabilities(res.data.availability);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get<{ success: 1, booking: MeetingData }>(`${resheduleBookingUrl}/${params.bookingId}`, header)
      .then((res) => {
        console.log("res.data", res.data);
        setBooking(res.data.booking);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (date) {
      header.params = {
        bookingId: params.bookingId,
        meetingDate: date,
      };
      axios
        .get<{ suucess: 1, timeSlots: string[] }>(
          `${getTimeSlotsUrl}/${booking.userId}/${booking.eventTypeId}`,
          header
        )
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
          <h1>Booking reschedule SuccessFull</h1>
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
            width: "40%",
            borderRight: "1px solid grey",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p>
            {" "}
            <strong>host name: </strong>
            {booking.User?.name}
          </p>
          <p>
            {" "}
            <strong>guest name: </strong>
            {booking.guest_name}
          </p>

          <h4>
            <span>EventType: </span>
            <span className="name">{booking.EventType?.title} </span>
          </h4>
          <h5>
            <span>Event Duration(minutes): </span>
            <span className="name">{booking.EventType?.durationMinutes} </span>
          </h5>
          <div>
            <h3>old schedule</h3>
            <p>{new Date(booking.start_time).toDateString()}</p>
            <span className="time">
              {format12Hour(new Date(booking.start_time))}
            </span>
            <span> - </span>
            <span className="time">
              {format12Hour(new Date(booking.end_time))}
            </span>
          </div>
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
                          formerTimeSlot={formerTimeSlot}
                          reschedule={true}
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
export interface TimeSlotProps {
  timeSlot: string;
  bookTime: string;
  setBookTime: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setBookingResponse: React.Dispatch<React.SetStateAction<MeetingData | null>>;
  formerTimeSlot: string;
  reschedule: boolean;
}

const Time = ({
  timeSlot,
  bookTime,
  setBookTime,
  date,
  setBookingResponse,
  formerTimeSlot,
  reschedule,
}: TimeSlotProps) => {
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
        onClick={(e) => setBookTime(e.currentTarget.innerText)}
      >
        {timeSlot}
        {formerTimeSlot === timeSlot ? <p style={{ fontSize: "12px", color: "blueviolet" }}>(older slot)</p> : ""}
      </span>
      {bookTime === timeSlot && (
        <BookEventPopOver
          setBookingResponse={setBookingResponse}
          bookTime={bookTime}
          bookDate={date}
          reschedule={reschedule}
        >
          next
        </BookEventPopOver>
      )}
    </div>
  );
};

export default RescheduleBooking;
