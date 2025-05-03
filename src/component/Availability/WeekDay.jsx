import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import StartAndEndTime from './StartAndEndTime';
import { dayOfWeeks } from '../../utils';
import { availabilityBaseUrl, header } from '../../api';

const WeekDay = ({ avail }) => {
  const [startTime, setStartTime] = useState('09:00 am');
  const [endTime, setEndTime] = useState('05:00 pm');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const [startHours, startMinute] = avail?.start_time?.split(':');
    const [endHours, endMinute] = avail?.end_time?.split(':');

    const startTime = new Date(0, 0, 0, startHours, startMinute).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const endTime = new Date(0, 0, 0, endHours, endMinute).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setStartTime(startTime);
    setEndTime(endTime);
    setChecked(!!avail.active);
  }, []);

  const handleChecked = (e) => {
    const payload = {
      active: e.target.checked ? 1 : 0,
    };
    axios
      .put(`${availabilityBaseUrl}/${avail.id}`, payload, header)
      .then((res) => {
        setChecked((preState) => !preState);
        toast.success('changes saved');
      })
      .catch((error) => {
        toast.error(error.messages);
      });
  };

  return (
    <div className="week_days">
      <div style={{ marginRight: '40px' }}>
        <label
          style={{
            width: '3rem',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          htmlFor={avail.id}
        >
          <input
            onChange={handleChecked}
            id={avail.id}
            type="checkbox"
            style={{
              width: '25px',
              height: '25px',
            }}
            checked={checked}
          />
          {dayOfWeeks[avail.day_of_week].toUpperCase()}
        </label>
      </div>
      {checked && (
        <StartAndEndTime
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          checked={checked}
          avail={avail}
          error={error}
          setError={setError}
        />
      )}
      {!checked && <h4 style={{ color: 'rgb(163, 161, 161)', fontWeight: '400' }}>Unavailable</h4>}
    </div>
  );
};

export default WeekDay;
