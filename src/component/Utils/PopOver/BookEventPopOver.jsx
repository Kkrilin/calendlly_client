import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import BookEvent from "../../Booking/BookEvent";

export default function BookEventPopOver({
  children,
  bookTime,
  bookDate,
  setBookingResponse
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span
        className="next"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 1200 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BookEvent
          bookTime={bookTime}
          bookDate={bookDate}
          handleClose={handleClose}
          setBookingResponse={setBookingResponse}
        />
      </Popover>
    </div>
  );
}
