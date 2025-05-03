import axios from 'axios';
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import LogoutPopOver from '../Utils/PopOver/LogoutPopOver';
import { useEffect } from 'react';
import { header, getUserUrl } from '../../api';
import { setProfileData } from '../../redux/profileSlice';

const ProfileHeader = () => {
  const { data } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (data && !Object.keys(data).length) {
        async function getUser() {
          const user = await axios.get(getUserUrl, header);
          dispatch(setProfileData({ data: user.data.userData }));
        }
        getUser();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h4>{data.email}</h4>
          <LogoutPopOver>
            <Avatar sx={{ width: 40, height: 40 }} alt="profile logo">
              {data.name && data.name[0]}
            </Avatar>
            <ArrowDropDownIcon />
          </LogoutPopOver>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
