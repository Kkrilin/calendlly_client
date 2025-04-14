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
    axios
      .post(bookingUrl, payload, header)
      .then((res) => {
        console.log(res.data);
        setBookingResponse(res.data);
      })
      .catch((error) => {
        toast.error(`Booking failed with error : ${error.message}`);
      });
  };

  return (
    <div>
      <div>
        <h3>Enter Details</h3>
        <form>
          <label htmlFor="name">
            name <sup>*</sup>
            <input
              type="text"
              id="name"
              value={guestName}
              onInput={(e) => setGuestName(e.target.value)}
            />
            {error && !guestName && <h5 className="error">{error}</h5>}
          </label>
          <label htmlFor="email">
            email <sup>*</sup>
            <input
              type="email"
              id="name"
              value={guestEmail}
              onInput={(e) => setGuestEmail(e.target.value)}
            />
            {error && !guestEmail && <h5 className="error">{error}</h5>}
          </label>
        </form>
        <Button onClick={HandleBooking} variant="contained">
          Schedule Event
        </Button>
      </div>
    </div>
  );
};

export default BookEvent;
