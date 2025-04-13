import { useEffect, useState } from "react";
import { generateTimeOptions, toSeconds } from "../../utils";

const timeOptions = generateTimeOptions(15, 12);
import HoursDropDown from "../Utils/HoursDropDown";
const StartAndEndTime = ({ setStartTime, setEndTime, startTime, endTime }) => {
  const [error, setError] = useState("");

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
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <select
          className="select_option"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
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
          onChange={(e) => setEndTime(e.target.value)}
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
