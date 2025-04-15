import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { eventLookUpUrl, header } from "../../api";
import Loader from "../Loader/CircularLoader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../config";

const clientBaseUrl = config.clientBaseUrl;

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${eventLookUpUrl}/${userId}`, header)
      .then((res) => {
        setEvents(res.data.eventTypes);
      })
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        setTimeout(() => setLoading(false), 0);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      <div className="public_event_container">
        <h1 style={{ borderBottom: "1px solid grey" }}>Schedule An meeting</h1>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            padding: "2rem 2rem",
          }}
        >
          {events.map((et) => (
            <EventTypeCard eventType={et} key={et.id} public />
          ))}
        </div>
      </div>
    </div>
  );
};

const EventTypeCard = ({ eventType }) => {
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

export default AllEvent;
