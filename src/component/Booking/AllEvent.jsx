import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { eventLookUpUrl, header } from '../../api';
import Loader from '../Loader/CircularLoader';
import EventTypeCard from '../EventTypes/EventTypeCard';

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${eventLookUpUrl}/${userId}`, header)
      .then((res) => {
        setEvents(res.data.eventTypes);
      })
      .catch((error) => toast.error('Something went wrong'))
      .finally(() => {
        setTimeout(() => setLoading(false), 0);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem',
      }}
    >
      <div className="public_event_container">
        <h1 style={{ borderBottom: '1px solid grey' }}>Schedule An meeting</h1>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            padding: '2rem 2rem',
          }}
        >
          {events.length &&
            events.map((et) => <EventTypeCard eventType={et} key={et.id} publicCard />)}
          {!events.length && <h3>there is no event</h3>}
        </div>
      </div>
    </div>
  );
};

export default AllEvent;
