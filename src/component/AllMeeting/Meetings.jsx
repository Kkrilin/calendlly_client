import Meeting from './Meeting';

const Meetings = ({ date, meetings, setAllMeetings }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div>
      <h3
        style={{
          fontWeight: '600',
          backgroundColor: '#FAFAFA',
          padding: '1rem 0 1rem 1.6rem',
          borderTop: '1px solid lightBlue',
          borderBottom: '1px solid lightBlue',
        }}
      >
        {new Date(date).toLocaleDateString(undefined, options)}
      </h3>
      {meetings.map((meeting) => (
        <Meeting key={meeting.id} meeting={meeting} setAllMeetings={setAllMeetings} date={date} />
      ))}
    </div>
  );
};

export default Meetings;
