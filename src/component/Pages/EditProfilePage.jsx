import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { userBaseUrl, header } from '../../api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../../redux/profileSlice';
import toast from 'react-hot-toast';

const EditProfilePage = () => {
  const { data } = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const [field, setField] = useState('');
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
  });
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  header.headers.Authorization = `Bearer ${token}`;

  const handleClick = (e) => {
    const fieldName = e.currentTarget.dataset.field;
    if (edit && field === fieldName) {
      axios
        .post(userBaseUrl, formData, header)
        .then((res) => {
          dispatch(setProfileData({ data: res.data.userData }));
          toast.success('changes saved');
        })
        .catch((error) => toast.error('something wen wrong'));
    }
    setEdit((prevState) => !prevState);
    setField(fieldName);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <h1>User Profile</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '2rem 0',
            borderBottom: '1px solid greylight',
          }}
        >
          <Avatar sx={{ width: 180, height: 180 }} alt="profile logo">
            {data.name[0]}
          </Avatar>
          <div>
            <h2>{data.name}</h2>
            <h3>{data.email}</h3>
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          {/* Name Field */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              padding: '1rem',
            }}
          >
            <span>
              <span className="field">name: </span>
              {edit && field === 'name' ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '16rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid grey',
                    fontSize: '0.875rem',
                  }}
                />
              ) : (
                <span
                  style={{
                    display: 'inline-block',
                    width: '16rem',
                    height: '2rem',
                  }}
                >
                  {data.name}
                </span>
              )}
            </span>
            <span data-field="name" onClick={handleClick}>
              {edit && field === 'name' ? <SaveIcon /> : <EditIcon />}
            </span>
            {edit && field === 'name' && <CloseIcon onClick={() => setEdit(false)} />}
          </div>
          {/* Email Field */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              padding: '1rem',
            }}
          >
            <span>
              <span className="field">email: </span>
              {edit && field === 'email' ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '16rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid grey',
                    fontSize: '0.875rem',
                  }}
                />
              ) : (
                <span
                  style={{
                    display: 'inline-block',
                    width: '16rem',
                    height: '2rem',
                  }}
                >
                  {data.email}
                </span>
              )}
            </span>
            <span data-field="email" onClick={handleClick}>
              {edit && field === 'email' ? <SaveIcon /> : <EditIcon />}
            </span>
            {edit && field === 'email' && <CloseIcon onClick={() => setEdit(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
