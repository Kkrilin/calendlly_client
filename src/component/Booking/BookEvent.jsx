import * as React from 'react';
import { Button } from '@mui/material';
import { eventBookingUrl, header, resheduleBookingUrl } from '../../api';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BackDropLoader from '../Utils/Loader/BackDropLoader';

const BookEvent = ({ handleClose, bookTime, bookDate, setBookingResponse, reschedule }) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleCloseBackDrop = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const params = useParams();
  const { userId, eventId, bookingId } = params;
  const payload = {
    bookDate,
    bookTime,
  };
  if (reschedule) {
    payload.rescheduleReason = rescheduleReason;
  } else {
    payload.guestName = guestName;
    payload.guestEmail = guestEmail;
  }

  const bookingUrl = `${eventBookingUrl}/${userId}/${eventId}`;
  const reshceduleUrl = `${resheduleBookingUrl}/${bookingId}`;
  const url = reschedule ? reshceduleUrl : bookingUrl;
  const HandleBooking = () => {
    if (reschedule && !rescheduleReason) {
      setError("can't be blank");
      return;
    } else if (!reschedule && (!guestName || !guestEmail)) {
      setError("can't be blank");
      return;
    }
    handleOpen();
    axios
      .post(url, payload, header)
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
    <div style={{ width: '30rem', height: '24rem' }}>
      <div style={{ padding: '1rem' }}>
        <h3>Enter Details</h3>
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
          <div>
            <span style={{ fontSize: '1.2rem' }}>Event Date : </span>
            <span style={{ color: '#0066E6' }}>{bookDate}</span>
          </div>
          <div>
            <span style={{ fontSize: '1.2rem' }}>Event Time : </span>
            <span style={{ color: '#0066E6' }}>{bookTime}</span>
          </div>
        </div>
        <form>
          {reschedule ? (
            <>
              <h3>reshcedule reason</h3>
              <textarea
                onInput={(e) => setRescheduleReason(e.target.value)}
                value={rescheduleReason}
                name="reason"
                id="reason"
                rows="4"
                cols="30"
              ></textarea>
            </>
          ) : (
            <>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1rem',
                }}
                htmlFor="name"
              >
                <span className="required">name</span>
                <input
                  type="text"
                  id="name"
                  value={guestName}
                  onInput={(e) => setGuestName(e.target.value)}
                  style={{
                    height: '2.5rem',
                    borderRadius: '6px',
                    border: '1px solid blue',
                    paddingLeft: '1rem',
                    fontSize: '1rem',
                  }}
                  placeholder="Enter your name"
                />
                {error && !guestName && <h5 className="error">{error}</h5>}
              </label>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1rem',
                }}
                htmlFor="email"
              >
                <span className="required">email</span>
                <input
                  type="email"
                  id="name"
                  value={guestEmail}
                  onInput={(e) => setGuestEmail(e.target.value)}
                  style={{
                    height: '2.5rem',
                    borderRadius: '6px',
                    border: '1px solid blue',
                    paddingLeft: '1rem',
                    fontSize: '1rem',
                  }}
                  placeholder="Enter your email"
                />
                {error && !guestEmail && <h5 className="error">{error}</h5>}
              </label>
            </>
          )}
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <BackDropLoader open={open}>
            <Button onClick={HandleBooking} variant="contained">
              {reschedule ? 'update Event' : 'Schedule Event'}
            </Button>
          </BackDropLoader>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;
