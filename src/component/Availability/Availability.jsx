import StartAndEndTime from "./StartAndEndTime";
// import { weekDays } from "../../utils";
import { useState } from "react";
import WeekDay from "./WeekDay";

const Availability = () => {
  const [weekDays, setWeekDays] = useState([]);
  const payload = {};

  useState(() => {
    
  }, []);

  return (
    <>
      <h1>Availability</h1>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: "20px",
          marginTop: "4rem",
          paddingBottom: "2rem",
          borderTop: "1px solid #e7f1ff",
        }}
      >
        <h3>Schedule</h3>
        <div className="availability_container">
          <h3>Weekly hours</h3>
          <div className="weekly_hour_container">
            {weekDays.map((week) => (
              <WeekDay key={week} week={week} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
