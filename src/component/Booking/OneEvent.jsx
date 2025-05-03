import { useParams } from 'react-router-dom';
import MyCalendar from '../MyCalendar/MyCalendar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { header, eventLookUpUrl, getTimeSlotsUrl } from '../../api';
import TimeSlot from './TimeSlot';

const OneEvent = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [eventType, setEventType] = useState({});
  const [date, setDate] = useState();
  const [bookTime, setBookTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${eventLookUpUrl}/${params.userId}/${params.eventId}`, header)
      .then((res) => {
        setEventType(res.data.eventType);
        setAvailabilities(res.data.availabilities);
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
    toast.success('booking successFull');
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="booking_success_card">
          <h1>Booking SuccsessFull</h1>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="one_event">
        <div
          style={{
            width: '50%',
            borderRight: '1px solid grey',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h4 style={{ color: 'blue', fontSize: '1.2rem' }}>{eventType.User?.name}</h4>
          <h4>
            <span style={{ fontSize: '1.3rem', color: 'grey' }}>EventType : </span>
            <span style={{ textTransform: 'capitalize' }} className="name">
              {eventType.title}
            </span>
          </h4>
          <h5>
            <span style={{ fontSize: '1.3rem', color: 'grey' }}>Event Duration</span>
            <span>(minutes) :</span>
            <span className="name"> {eventType.durationMinutes} </span>
          </h5>
        </div>
        <div style={{ padding: '2rem' }}>
          <h3 style={{}}>Select date and Time</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'start',
              gap: '2rem',
              paddingTop: '1rem',
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
                {date && (
                  <p style={{ textAlign: 'center', width: '14rem' }}>{date.toDateString()}</p>
                )}
                <div
                  style={{
                    overflowY: 'auto',
                    height: '60vh',
                    margin: '1rem 0',
                    width: '20rem',
                  }}
                >
                  <div style={{ width: '14rem' }}>
                    {timeSlots.length ? (
                      timeSlots.map((timeSlot, id) => (
                        <TimeSlot
                          key={id}
                          timeSlot={timeSlot}
                          setBookTime={setBookTime}
                          bookTime={bookTime}
                          date={date && moment(date).format('YYYY-MM-DD')}
                          setBookingResponse={setBookingResponse}
                        />
                      ))
                    ) : (
                      <h3>there is no availability for the day please select another day</h3>
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

export default OneEvent;
