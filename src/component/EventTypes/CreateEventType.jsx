import { Button } from '@mui/material';
import { useState } from 'react';
import { eventBaseUrl } from '../../api.js';
import { header } from '../../api.js';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEventType } from '../../redux/eventTypeSlice.js';

const CreateEventType = ({ handleClose }) => {
  const [eventName, setEventName] = useState('');
  const [duration, setDuration] = useState(15);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleEventNameInput = (e) => {
    if (!e.target.value) {
      setError(`event name can't be empty`);
    } else {
      setError('');
    }
    setEventName(e.target.value);
  };

  const handleEventSubmit = async () => {
    if (!eventName) {
      setError(`event name can't be empty`);
      return;
    }
    const payload = {
      eventName,
      duration,
    };
    axios
      .post(eventBaseUrl, payload, header)
      .then((res) => {
        dispatch(addEventType(res.data.eventType));
        handleClose(null);
      })
      .catch((error) => {
        console.log('error create', error);
      });
  };
  return (
    <div className="create_event_container">
      <div style={{ padding: '1rem' }}>
        <h3>New Event Type</h3>
        <div>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '16px',
            }}
            htmlFor="evnet_name"
          >
            Event Name
            <input
              onInput={handleEventNameInput}
              id="event_name"
              type="text"
              placeholder="Name your event"
              value={eventName}
            />
            {error && <h6 className="error">{error}</h6>}
          </label>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '16px',
            }}
            htmlFor="duration"
          >
            Duration
            <select
              onChange={(e) => setDuration(e.target.value)}
              id="duration"
              className="select_option"
              defaultValue={duration}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
            </select>
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={() => handleClose(null)}>cancel</Button>
          <Button onClick={handleEventSubmit}>submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventType;
