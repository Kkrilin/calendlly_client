import { useEffect, useState } from "react";
import { generateTimeOptions, toSeconds } from "../../utils";
import { availabilityBaseUrl, header } from "../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { ActiveStatus, AvailabilityResponse } from "@/constant";

const timeOptions = generateTimeOptions(15, 12);

export interface StartAndEndTimeProps {
  startTime: string;
  endTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setAvailablityError?: React.Dispatch<React.SetStateAction<boolean>>;
  checked?: boolean
  avail?: AvailabilityResponse
}



const StartAndEndTime = ({ setStartTime, setEndTime, startTime, endTime, checked, avail, setError, error, setAvailablityError }: StartAndEndTimeProps) => {

  const checkError = (startTime: string, endTime: string): boolean => {
    if (toSeconds(startTime) > toSeconds(endTime)) {
      if (setAvailablityError) {
        setAvailablityError(true);
      }
      setError("startTime is large");
      return true;
    }
    if (toSeconds(startTime) === toSeconds(endTime)) {
      if (setAvailablityError) {
        setAvailablityError(true);
      }
      setError("startTime and endTime equal");
      return true;
    } else {
      if (setAvailablityError) {
        setAvailablityError(false);
      }
      setError("");
    }
    return false;
  };
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
  }, []);

  const token = localStorage.getItem("token");
  if (token && header.headers) {
    header.headers.Authorization = `Bearer ${token}`;
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);
    if (checkError(e.target.value, endTime)) {
      return;
    }

    const payload = {
      active: checked ? ActiveStatus.ACTIVE : ActiveStatus.INACTIVE,
      startTime: e.target.value,
      endTime,
    };
    axios
      .put(`${availabilityBaseUrl}/${avail?.id}`, payload, header)
      .then((res) => {
        toast.success("changes saved");
      })
      .catch((error) => {
        toast.error(error.messages);
      });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
    if (checkError(startTime, e.target.value)) {
      return;
    }
    const payload = {
      active: checked ? ActiveStatus.ACTIVE : ActiveStatus.INACTIVE,
      startTime,
      endTime: e.target.value,
    };

    axios
      .put(`${availabilityBaseUrl}/${avail?.id}`, payload, header)
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
