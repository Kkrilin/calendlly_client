import { useEffect, useState } from 'react';
import WeekDay from './WeekDay';
import { availabilityBaseUrl, header } from '../../api';
import axios from 'axios';

const Availability = () => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    axios
      .get(availabilityBaseUrl, header)
      .then((res) => {
        setAvailabilities(res.data.availability);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Availability</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '4rem',
          paddingBottom: '2rem',
          borderTop: '1px solid #e7f1ff',
        }}
      >
        <h3>Schedule</h3>
        <div className="availability_container">
          <h3>Weekly hours</h3>
          <div className="weekly_hour_container">
            {availabilities.map((avail) => (
              <WeekDay key={avail.id} avail={avail} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
