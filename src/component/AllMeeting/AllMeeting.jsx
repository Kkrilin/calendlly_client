import axios from 'axios';
import { useEffect, useState } from 'react';
import { bookingBaseUrl, header } from '../../api';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import Meetings from './Meetings';

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

  if (loading) {
    return (
      <div style={{ display: 'grid', placeContent: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>Meeting</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginTop: '4rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid #e7f1ff',
        }}
      ></div>
      <div className="meetings_container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '0 0 1rem 1rem',
          }}
        >
          <div>
            <h3 style={{ fontWeight: '500' }}>UpComing</h3>
          </div>
        </div>
        {Object.keys(allMeetings).map((date) => (
          <Meetings
            key={date}
            date={date}
            meetings={allMeetings[date]}
            setAllMeetings={setAllMeetings}
          />
        ))}
      </div>
    </div>
  );
};

export default AllMeeting;
