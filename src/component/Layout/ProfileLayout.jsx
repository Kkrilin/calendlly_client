import { useEffect, useState } from 'react';
import LeftSideBar from '../LeftSidebar/LeftSideBar.jsx';
import ProfileHeader from '../ProfileHeader/ProfileHeader.jsx';
import { Outlet } from 'react-router-dom';
import { availabilityBaseUrl, header } from '../../api.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/CircularLoader.jsx';
import toast from 'react-hot-toast';

function ProfileLayout() {
  const [loading, setLoading] = useState(true);
  const [isAvailabilityExit, setIsAvailabilityExist] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  header.headers.Authorization = `Bearer ${token}`;
  console.log(header, 'profileLaylout');
  useEffect(() => {
    axios
      .get(availabilityBaseUrl, header)
      .then((res) => {
        if (!res.data.availability.length) {
          navigate('/setting/availabilty');
        } else {
          setIsAvailabilityExist(true);
        }
      })
      .catch((error) => {
        console.log('111111111111111');
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isAvailabilityExit && (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <LeftSideBar />
          <div
            style={{
              width: '86vw',
              padding: '2rem 12rem',
              overflowY: 'auto',
              height: '100vh',
              backgroundColor: '#FAFAFA',
            }}
          >
            <ProfileHeader />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileLayout;
