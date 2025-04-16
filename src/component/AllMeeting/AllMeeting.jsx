import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { bookingBaseUrl, header } from "../../api";
import toast from "react-hot-toast";
import { format12Hour } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { LucideLoader } from "lucide-react";

const AllMeeting = () => {
  const [allMeetings, setAllMeetings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(bookingBaseUrl, header)
      .then((res) => {
        setAllMeetings(res.data.bookings);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <LucideLoader />;
  // }

  console.log("allMeetings", allMeetings);
  return (
    <div>
      <h1>Meeting</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "4rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid #e7f1ff",
        }}
      ></div>
      <div className="meetings_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            padding: "0 0 1rem 1rem",
          }}
        >
          <div>
            <h3 style={{ fontWeight: "500" }}>UpComing</h3>
          </div>
        </div>
        {Object.keys(allMeetings).map((date) => (
          <Meetings
            date={date}
            meetings={allMeetings[date]}
            setAllMeetings={setAllMeetings}
          />
        ))}
      </div>
    </div>
  );
};

const Meetings = ({ date, meetings, setAllMeetings }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <h3
        style={{
          fontWeight: "600",
          backgroundColor: "#FAFAFA",
          padding: "1rem 0 1rem 1.6rem",
          borderTop: "1px solid lightBlue",
          borderBottom: "1px solid lightBlue",
        }}
      >
        {new Date(date).toLocaleDateString(undefined, options)}
      </h3>
      {meetings.map((meeting) => (
        <Meeting
          meeting={meeting}
          setAllMeetings={setAllMeetings}
          date={date}
        />
      ))}
    </div>
  );
};

const Meeting = ({ meeting, setAllMeetings, date }) => {
  const token = localStorage.getItem("token");
  header.headers.Authorization = `Bearer ${token}`;
  const handleMeetingCancel = () => {
    axios
      .delete(`${bookingBaseUrl}/${meeting.id}`, header)
      .then((res) => {
        toast.success("metting canceled");
        setAllMeetings((prvState) => {
          const Meetting = prvState[date].filter(
            (meet) => meet.id !== meeting.id
          );
          return {
            ...prvState,
            [date]: Meetting,
          };
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="meeting_card" style={{ padding: "1rem 0 1rem 2.5rem" }}>
      <div>
        <span className="time">
          {format12Hour(new Date(meeting.start_time))}
        </span>
        <span> - </span>
        <span className="time">{format12Hour(new Date(meeting.end_time))}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "25rem" }}>
          <h3 style={{ fontWeight: "400" }}>
            <span className="name"> guest name: </span>
            {meeting.guest_name}
          </h3>
          <h3 style={{ fontWeight: "400" }}>
            <span className="email"> guest email: </span>
            {meeting.guest_email}
          </h3>
        </div>
        <div>
          <h3 style={{ fontWeight: "400" }}>
            <span className="name"> Event Type: </span>
            {meeting.EventType?.title}
          </h3>
        </div>
        <div style={{ marginRight: "1rem" }}>
          <div className="delete_res" onClick={handleMeetingCancel}>
            <span>Cancel</span>
            <DeleteIcon />
          </div>
          <div className="delete_res">
            <span>Reschedule</span>
            <AutorenewIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMeeting;
