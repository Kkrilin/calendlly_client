import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { config } from "../../config";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import EventSettingPopOver from "../Utils/PopOver/EventSettingPopOver";
import { EventTypeResponse } from "@/constant";

const { clientBaseUrl } = config;

interface EventTypeCardProps {
  eventType: EventTypeResponse;
}

const EventTypeCard = ({ eventType }: EventTypeCardProps) => {

  const handleCopy = () => {
    const url = `${clientBaseUrl}/book/event/${eventType.userId}/${eventType.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err.message);
      });
  };
  return (
    <div className="event_card_container">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <input id={eventType.id} type="checkbox" />
          <EventSettingPopOver eventType={eventType}>
            <SettingsIcon style={{ width: "1rem", height: "1rem" }} />
            <ArrowDropDownIcon />
          </EventSettingPopOver>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            // padding: "10px 0",
            padding: "0 0 1rem 1rem",
            borderBottom: "1px solid #e7f1ff",
          }}
        >
          <h4 style={{ fontWeight: "400" }}>{eventType.title}</h4>
          <span style={{ fontWeight: "400", color: "rgb(78, 108, 150)" }}>
            {eventType.durationMinutes} min
          </span>
          <Link
            to={`/book/event/${eventType.userId}/${eventType.id}`}
            target="_blank"
            className="booking_page"
          >
            View booking page
          </Link>
        </div>
        <div
          style={{
            color: "blue",
            display: "flex",
            fontWeight: "400",
            cursor: "pointer",
            padding: "1rem",
          }}
          onClick={handleCopy}
        >
          <ContentCopyIcon style={{ width: "1rem", height: "1rem" }} />
          <h4 style={{ fontSize: "0.875rem", fontWeight: "400" }}>Copy link</h4>
        </div>
      </div>
    </div>
  );
};

export default EventTypeCard;
