import { Link } from 'react-router-dom';
import CreateEventPopOver from '../Utils/PopOver/CreateEventPopOver';

const LeftSideBar = () => {
  return (
    <div className="left_sidebar">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          height: '15vh',
        }}
      >
        <Link className="header_logo" to="/user/event-type">
          <img
            className="logo"
            decoding="async"
            loading="eager"
            src="https://images.ctfassets.net/9haz2glq4wt0/3u3bSJcxg7Yk8RKpbO5Ygc/039d9e7e9a490b9ce006ba4f107c1da1/Calendly_Logo.webp?h=256&fm=webp&fit=pad&w=256&q=100"
            alt=""
            style={{ width: '40px', height: '40px' }}
          />
          <h4
            style={{
              cursor: 'pointer',
              color: 'rgb(0, 107, 255)',
              fontSize: '1.8rem',
              fontWeight: '400',
            }}
          >
            Calendlly
          </h4>
        </Link>
        <CreateEventPopOver>
          {/* <Button className="create_button" variant="outlined" color="primary">
        </Button> */}
          Create
        </CreateEventPopOver>
      </div>
      <div
        style={{
          width: '98%',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginLeft: '4px',
        }}
      >
        <div>
          <div style={{ borderBottom: '1px solid #e7f1ff' }}>
            <Link to="event-type">
              <h3>Event Types</h3>
            </Link>
            <Link to="meeting">
              <h3>Meetings</h3>
            </Link>
            <Link to="availability">
              <h3>Availability</h3>
            </Link>
          </div>
          <div>
            <h3>Contacts</h3>
            <h3>Workflows</h3>
            <h3>Integration & apps</h3>
            <h3>Routings</h3>
          </div>
        </div>
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <h3>Upgrade Plan</h3>
          <h3>Analytics</h3>
          <h3>Admin center</h3>
          <h3>help</h3>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
