import { Avatar } from "@mui/material";
import CreateEventPopOver from "../Utils/PopOver/CreateEventPopOver.js";
import { eventBaseUrl, header } from "../../api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/CircularLoader.js";
import EventTypeCard from "./EventTypeCard.js";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../config.js";
import { setEventTypeData } from "../../redux/eventTypeSlice.js";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { EventTypeResponse } from "../../constant";

const EventTypes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { data } = useSelector((state: RootState) => state.profile);
  const { events } = useSelector((state: RootState) => state.eventType);
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token");
  if (header.headers && token) {
    header.headers.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ eventTypes: EventTypeResponse[] }>(
          eventBaseUrl,
          header
        );
        console.log(res.data.eventTypes);
        dispatch(setEventTypeData({ data: res.data.eventTypes }));
      } catch (err) {
        console.error(err);
        setError("Failed to load event types.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventTypes();
  }, [dispatch]);

  return (
    <>
      <h1>Event Type</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "4rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid #e7f1ff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Avatar sx={{ width: 40, height: 40 }} alt="profile logo">
            {data?.name?.[0] || "U"}
          </Avatar>
          <div>
            <h3>{data.name}</h3>
            <h3>Booking link for all event</h3>
            <Link
              style={{ color: "blue" }}
              to={`${config.clientBaseUrl}/book/event/${data.id}`}
              target="_blank"
            >
              {`${config.clientBaseUrl}/book/event/${data.id}`}
            </Link>
          </div>
        </div>
        <CreateEventPopOver>new event type</CreateEventPopOver>
      </div>
      {loading && <Loader />}
      {!loading && (
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {events.map((et) => (
            <EventTypeCard eventType={et} key={et.id} />
          ))}
        </div>
      )}
      {!loading && !events.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20rem",
          }}
        >
          <CreateEventPopOver>new event type</CreateEventPopOver>
        </div>
      )}
    </>
  );
};

export default EventTypes;
