import StartAndEndTime from "./StartAndEndTime";
import { weekDays } from "../../utils";

const Availability = () => {
  const payload = {};
  const handleCheckBoxSelect = (e) => {
    console.log(e.target.value);
  };
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
              <div key={week} className="week_days">
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
                    />
                    {week.toUpperCase()}
                  </label>
                </div>
                <StartAndEndTime />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
