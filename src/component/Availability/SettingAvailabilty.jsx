import { weekDays } from '../../utils';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Loader from '../Loader/CircularLoader.jsx';
import { availabilityBaseUrl, header } from '../../api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import WeekDaysForSettings from './WeekDaysForSettings.jsx';

const SettingAvailabilty = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [availabilityError, setAvailablityError] = useState(false);

  const handleSubmit = () => {
    if (availabilityError) {
      toast.error('availabilty is not correct');
      return;
    }
    const selectWeekDay = availabilities.some((av) => av.active);
    if (!selectWeekDay || !availabilities.length) {
      toast.error('please select at least one');
      return;
    }

    axios
      .post(availabilityBaseUrl, { availabilities }, header)
      .then((res) => {
        navigate('/user/event-type');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(availabilityBaseUrl, header)
      .then((res) => {
        if (res.data.availability.length) {
          navigate('/user/event-type', { replace: true });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '30vw' }}>
        <h1>meeting Availability</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '2rem',
            paddingBottom: '2rem',
            borderTop: '1px solid #e7f1ff',
          }}
        >
          <div className="availability_container">
            <p style={{ color: 'blue' }}>
              set your availability for us to get started latter you can change it
            </p>
            <h3>Weekly hours</h3>
            <div className="weekly_hour_container">
              {weekDays.map((week) => (
                <WeekDaysForSettings
                  key={week}
                  week={week}
                  setAvailabilities={setAvailabilities}
                  setAvailablityError={setAvailablityError}
                />
              ))}
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingAvailabilty;
