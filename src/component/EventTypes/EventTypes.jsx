import { Avatar } from '@mui/material';
import CreateEventPopOver from '../Utils/PopOver/CreateEventPopOver.jsx';
import { eventBaseUrl } from '../../api.js';
import { header } from '../../api.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/CircularLoader.jsx';
import EventTypeCard from './EventTypeCard.jsx';
import { useSelector } from 'react-redux';
import { config } from '../../config.js';
import { useDispatch } from 'react-redux';
import { setEventTypeData } from '../../redux/eventTypeSlice.js';
import { Link } from 'react-router-dom';

const EventTypes = () => {
  const [loading, setLoading] = useState(true);
  const { data } = useSelector((state) => state.profile);
  const { events } = useSelector((state) => state.eventType);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  header.headers.Authorization = `Bearer ${token}`;
  console.log('header------------------', header);
  useEffect(() => {
    setLoading(true);
    axios
      .get(eventBaseUrl, header)
      .then((res) => {
        dispatch(setEventTypeData({ data: res.data.eventTypes }));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Event Type</h1>
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
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="profile logo"
          >
            K
          </Avatar>
          <div>
            <h3>{data.name}</h3>
            <h3>booking link for all event</h3>
            <Link
              style={{ color: 'blue' }}
              to={`${config.clientBaseUrl}/book/event/${data.id}`}
              target="_blank"
            >{`${config.clientBaseUrl}/book/event/${data.id}`}</Link>
          </div>
        </div>
        <CreateEventPopOver>
          new event type
        </CreateEventPopOver>
      </div>
      {loading && <Loader />}
      {!loading && (
        <div
          style={{
            display: 'flex',
            marginTop: '2rem',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {events.map((et) => (
            <EventTypeCard eventType={et} key={et.id} />
          ))}
        </div>
      )}
      {!events.length && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20rem',
          }}
        >
          <CreateEventPopOver>new event type</CreateEventPopOver>
        </div>
      )}
    </>
  );
};

export default EventTypes;
