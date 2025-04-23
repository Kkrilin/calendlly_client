import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import EditProfile from "../../ProfileHeader/EditProfile.js";

interface LogoutPopOverProps {
  children: React.ReactNode;
}


export default function LogoutPopOver({ children }: LogoutPopOverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        onClick={e => handleClick}
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
