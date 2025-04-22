import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import EditProfile from "../../ProfileHeader/EditProfile.js";

export default function LogoutPopOver({ children, eventType }) {
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
      <div
        onClick={handleClick}
        style={{ display: "flex", alignItems: "center" }}
      >
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <EditProfile handleClose={handleClose} />
      </Popover>
    </div>
  );
}
