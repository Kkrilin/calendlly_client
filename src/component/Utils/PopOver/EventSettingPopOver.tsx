import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import EventCardSeeting from "../../EventTypes/EventCardSeeting.js";
import { EventTypeResponse } from "@/constant.js";

type EventSettingPopOverProps = {
  children: React.ReactNode;
  eventType: EventTypeResponse;
};

export default function EventSettingPopOver({ children, eventType }: EventSettingPopOverProps) {
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
        <EventCardSeeting eventType={eventType} handleClose={handleClose} />
      </Popover>
    </div>
  );
}
