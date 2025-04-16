import { Button } from "@mui/material";
import { eventBookingUrl, header } from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const BookEvent = ({ handleClose, bookTime, bookDate, setBookingResponse }) => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleCloseBackDrop = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const params = useParams();
  const { userId, eventId } = params;
  const payload = {
    bookDate,
    bookTime,
    guestName,
    guestEmail,
  };
  console.log("payload", payload);
  const bookingUrl = `${eventBookingUrl}/${userId}/${eventId}`;
  const HandleBooking = () => {
    if (!guestName || !guestEmail) {
      setError("can't be blank");
      return;
    }
    handleOpen();
    axios
      .post(bookingUrl, payload, header)
      .then((res) => {
        console.log(res.data);
        setBookingResponse(res.data);
      })
      .catch((error) => {
        toast.error(`Booking failed with error : ${error.message}`);
      })
      .finally(() => {
        handleCloseBackDrop();
      });
  };

  return (
    <div style={{ width: "20rem", height: "20rem" }}>
      <div style={{ padding: "1rem" }}>
        <h3>Enter Details</h3>
        <form>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
            htmlFor="name"
          >
            <span>
              name <sup>*</sup>
            </span>
            <input
              type="text"
              id="name"
              value={guestName}
              onInput={(e) => setGuestName(e.target.value)}
              style={{
                height: "2.5rem",
                borderRadius: "6px",
                border: "1px solid blue",
              }}
              placeholder="Enter your name"
            />
            {error && !guestName && <h5 className="error">{error}</h5>}
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
            htmlFor="email"
          >
            <span>
              email <sup>*</sup>
            </span>
            <input
              type="email"
              id="name"
              value={guestEmail}
              onInput={(e) => setGuestEmail(e.target.value)}
              style={{
                height: "2.5rem",
                borderRadius: "6px",
                border: "1px solid blue",
              }}
              placeholder="Enter your email"
            />
            {error && !guestEmail && <h5 className="error">{error}</h5>}
          </label>
        </form>
        <SimpleBackdrop open={open} HandleBooking={HandleBooking}>
          Schedule Event
        </SimpleBackdrop>
      </div>
    </div>
  );
};

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function SimpleBackdrop({ children, handleOpen, open, HandleBooking }) {
  return (
    <div>
      <Button onClick={HandleBooking} variant="contained">
        {children}
      </Button>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BookEvent;
