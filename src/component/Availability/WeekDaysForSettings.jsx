import React from 'react';
import StartAndEndTime from './StartAndEndTime';

const WeekDaysForSettings = ({ week, setAvailabilities, setAvailablityError }) => {
  const [startTime, setStartTime] = useState('09:00 am');
  const [endTime, setEndTime] = useState('05:00 pm');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (setAvailabilities && !setAvailabilities.length) {
      setAvailabilities((preState) => {
        const availability = {
          dayOfWeek: week,
          startTime,
          endTime,
          active: checked ? 1 : 0,
        };
        return [...preState, availability];
      });
    } else if (setAvailabilities && setAvailabilities.length) {
      setAvailabilities((preState) => {
        const filterState = preState.filter((prv) => prv.dayOfWeek !== week);
        const availability = {
          dayOfWeek: week,
          startTime,
          endTime,
          active: checked ? 1 : 0,
        };
        return [...filterState, availability];
      });
    }
  }, [checked, startTime, endTime]);

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
          htmlFor={week}
        >
          <input
            onChange={() => setChecked((preState) => !preState)}
            id={week}
            type="checkbox"
            style={{
              width: '25px',
              height: '25px',
            }}
          />
          {week.toUpperCase()}
        </label>
      </div>
      <StartAndEndTime
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setError={setError}
        error={error}
        setAvailablityError={setAvailablityError}
      />
    </div>
  );
};

export default WeekDaysForSettings;
