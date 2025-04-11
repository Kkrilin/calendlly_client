import { useEffect, useState } from "react";
import { generateTimeOptions, toSeconds } from "../../utils";

const timeOptions = generateTimeOptions(15, 12);
import HoursDropDown from "../Utils/HoursDropDown";
const StartAndEndTime = ({ payload }) => {
  const [startTime, setStartTime] = useState("09:00 am");
  const [endTime, setEndTime] = useState("05:00 pm");
  const [error, setError] = useState("");

  console.log("startTime", startTime);
  console.log("endTime", endTime);
  console.log(startTime > endTime);
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
