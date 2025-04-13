import { useEffect, useState } from "react";
import StartAndEndTime from "./StartAndEndTime";

const WeekDay = ({ week }) => {
  const [startTime, setStartTime] = useState("09:00 am");
  const [endTime, setEndTime] = useState("05:00 pm");
  const [checked, setChecked] = useState(false);
  const handleCheckBoxSelect = (e) => {
    console.log(e.target.checked, "weeekday");
    setChecked((preState) => !preState);
  };

  useEffect(() =>{

  }, [])
  return (
    <div className="week_days">
      <div style={{ marginRight: "40px" }}>
        <label
          style={{
            width: "3rem",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
          htmlFor={week}
        >
          <input
            onChange={handleCheckBoxSelect}
            id={week}
            type="checkbox"
            style={{
              width: "25px",
              height: "25px",
            }}
            // value={week}
          />
          {week.toUpperCase()}
        </label>
      </div>
      {checked && (
        <StartAndEndTime
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      )}
      {!checked && <h5>Unavailable</h5>}
    </div>
  );
};

export default WeekDay;
