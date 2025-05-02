import { toast } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { eventBaseUrl, header } from '../../api';
import { removeEventType } from '../../redux/eventTypeSlice';
import { useDispatch } from 'react-redux';

import axios from 'axios';

const EventCardSeeting = ({ eventType, handleClose }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  header.headers.Authorization = `Bearer ${token}`;

  const deleteEventUrl = `${eventBaseUrl}/${eventType.id}`;
  const handleDelete = () => {
    axios
      .delete(deleteEventUrl, header)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        dispatch(removeEventType({ id: eventType.id }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => handleClose(null));
  };

  return (
    <div style={{ borderRadius: '6px' }}>
      <div style={{ padding: '10px' }}>
        <div className="setting_card">
          <EditIcon />
          <span>Edit</span>
        </div>
        <div className="setting_card" onClick={handleDelete}>
          <DeleteIcon />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default EventCardSeeting;
