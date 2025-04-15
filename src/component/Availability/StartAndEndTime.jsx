import { useEffect, useState } from "react";
import { generateTimeOptions, toSeconds } from "../../utils";

const timeOptions = generateTimeOptions(15, 12);
import HoursDropDown from "../Utils/HoursDropDown";
import axios from "axios";
import { availabilityBaseUrl, header } from "../../api";
import toast from "react-hot-toast";
const StartAndEndTime = ({
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  checked,
  avail,
  setError,
  error,
}) => {
  useEffect(() => {
    if (toSeconds(startTime) > toSeconds(endTime)) {
      setError("startTime is large");
      return;
    }
    if (toSeconds(startTime) === toSeconds(endTime)) {
      setError("startTime and endTime equal");
      return;
    } else {
      setError("");
    }
  }, [startTime, endTime]);

  const token = localStorage.getItem("token");
  header.headers.Authorization = `Bearer ${token}`;

  const handleStartTimeChange = (e) => {
    if (error) {
      return;
    }
    const payload = {
      active: checked ? 1 : 0,
      startTime: e.target.value,
      endTime,
    };
    setStartTime(e.target.value);
    axios
      .put(`${availabilityBaseUrl}/${avail.id}`, payload, header)
      .then((res) => {
        toast.success("changes saved");
      })
      .catch((error) => {
        toast.error(error.messages);
      });
  };

  const handleEndTimeChange = (e) => {
    if (error) {
      return;
    }
    const payload = {
      active: checked ? 1 : 0,
      startTime,
      endTime: e.target.value,
    };

    setEndTime(e.target.value);
    axios
      .put(`${availabilityBaseUrl}/${avail.id}`, payload, header)
      .then((res) => {
        toast.success("changes saved");
      })
      .catch((error) => {
        toast.error(error.messages);
      });
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <select
          className="select_option"
          value={startTime}
          onChange={handleStartTimeChange}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <h3 style={{ margin: "0 4px" }}>-</h3>
        <select
          className="select_option"
          value={endTime}
          onChange={handleEndTimeChange}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <span style={{ marginLeft: "2rem" }}>X</span>
      </div>
      {error && <h5 style={{ color: "red", fontWeight: "300" }}>{error}</h5>}
    </div>
  );
};

export default StartAndEndTime;
