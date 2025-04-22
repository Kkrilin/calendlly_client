import { Button } from "@mui/material";
import { useState } from "react";
import { eventBaseUrl } from "../../api.js";
import { header } from "../../api.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addEventType } from "../../redux/eventTypeSlice.js";
import { AppDispatch } from "@/redux/store.js";
import { EventTypeResponse } from "@/constant.js";

const CreateEventType = ({ handleClose }: { handleClose: () => void }) => {
  const [eventName, setEventName] = useState<string>("");
  const [duration, setDuration] = useState<number>(15);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const handleEventNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError(`event name can't be empty`);
    } else {
      setError("");
    }
    setEventName(e.target.value);
  };

  const handleEventSubmit = async () => {
    if (!eventName) {
      setError(`event name can't be empty`);
      return;
    }
    const payload = {
      eventName,
      duration,
    };
    axios
      .post<{ eventType: EventTypeResponse }>(eventBaseUrl, payload, header)
      .then((res) => {
        dispatch(addEventType(res.data.eventType));
        handleClose();
      })
      .catch((error) => {
        console.log("error create", error);
      });
  };
  return (
    <div className="create_event_container">
      <div style={{ padding: "1rem" }}>
        <h3>New Event Type</h3>
        <div>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "16px",
            }}
            htmlFor="evnet_name"
          >
            Event Name
            <input
              onChange={handleEventNameInput}
              id="event_name"
              type="text"
              placeholder="Name your event"
              value={eventName}
            />
            {error && <h6 className="error">{error}</h6>}
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "16px",
            }}
            htmlFor="duration"
          >
            Duration
            <select
              onChange={(e) => setDuration(parseInt(e.target.value))}
              id="duration"
              className="select_option"
              defaultValue={duration}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
            </select>
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleEventSubmit}>submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventType;
