import * as React from 'react';
import Popover from '@mui/material/Popover';
import EventCardSeeting from '../../EventTypes/EventCardSeeting.jsx';

export default function EventSettingPopOver({ children, eventType }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div onClick={handleClick} style={{ display: 'flex', alignItems: 'center' }}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <EventCardSeeting eventType={eventType} handleClose={handleClose} />
      </Popover>
    </div>
  );
}
