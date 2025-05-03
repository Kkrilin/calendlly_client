import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';
import LogoutPopOver from '../Utils/PopOver/LogoutPopOver';

const ProfileHeader = () => {
  const { data } = useSelector((state) => state.profile);

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
