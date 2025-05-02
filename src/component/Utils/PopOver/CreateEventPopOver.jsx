import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import CreateEventType from '../../EventTypes/CreateEventType.jsx';

export default function CreateEventPopOver({ children }) {
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
      <Button
        className="create_button"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 1200 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <CreateEventType handleClose={handleClose} />
      </Popover>
    </div>
  );
}
