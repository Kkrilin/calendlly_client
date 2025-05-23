import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link } from 'react-router-dom';
import { format12Hour } from '../../utils';
import { bookingBaseUrl, header } from '../../api';
import axios from 'axios';
import toast from 'react-hot-toast';

const Meeting = ({ meeting, setAllMeetings, date }) => {
  const handleMeetingCancel = () => {
    const toastId = toast.loading('Cancelling meeting...');

    axios
      .delete(`${bookingBaseUrl}/${meeting.id}`, header)
      .then(() => {
        setAllMeetings((prev) => {
          const all = { ...prev };
          const filtered = all[date]?.filter((m) => m.id !== meeting.id) || [];
          if (!filtered.length) {
            delete all[date];
          } else {
            all[date] = filtered;
          }
          return all;
        });

        toast.success('Meeting canceled', { id: toastId });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message || 'Failed to cancel meeting', {
          id: toastId,
        });
      });
  };

  return (
    <div className="meeting_card" style={{ padding: '1rem 0 1rem 2.5rem' }}>
      <div>
        <span className="time">{format12Hour(new Date(meeting.start_time))}</span>
        <span> - </span>
        <span className="time">{format12Hour(new Date(meeting.end_time))}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '25rem' }}>
          <h3 style={{ fontWeight: '400' }}>
            <span className="name"> guest name: </span>
            {meeting.guest_name}
          </h3>
          <h3 style={{ fontWeight: '400' }}>
            <span className="email"> guest email: </span>
            {meeting.guest_email}
          </h3>
        </div>
        {meeting.rescheduleReason && (
          <div>
            <p>rescheduleReason: {meeting.rescheduleReason}</p>
            <p>rescheduleBy: {meeting.rescheduleBy}</p>
          </div>
        )}
        <div>
          <h3 style={{ fontWeight: '400' }}>
            <span className="name"> Event Type: </span>
            {meeting.EventType?.title}
          </h3>
        </div>
        <div style={{ marginRight: '1rem' }}>
          <div className="delete_res" onClick={handleMeetingCancel}>
            <span>Cancel</span>
            <DeleteIcon />
          </div>
          <Link to={`/booking/rescheduling/${meeting.id}`}>
            <div className="delete_res">
              <span>Reschedule</span>
              <AutorenewIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
