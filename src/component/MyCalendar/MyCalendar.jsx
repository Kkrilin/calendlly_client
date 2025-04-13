import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar({ date, setDate, availabilities }) {
  const today = new Date();

  const disabledDate = new Set();
  availabilities.forEach((av) => {
    if (av.active === 0) {
      disabledDate.add(av.day_of_week);
    }
  });

  const disableNonAvailableDays = ({ date }) => {
    const nonAvailableDays = disabledDate.has(date.getDay());
    // const isAfterToday = date > today.setHours(0, 0, 0, 0);
    return nonAvailableDays;
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        minDate={today}
        tileDisabled={disableNonAvailableDays}
      />
    </div>
  );
}

export default MyCalendar;
