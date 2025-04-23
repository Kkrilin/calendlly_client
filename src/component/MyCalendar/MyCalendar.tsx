import { AvailabilityResponse } from "@/constant";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


interface MyCalendarProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  availabilities: AvailabilityResponse[];
  setTimeSlots: React.Dispatch<React.SetStateAction<string[]>>;
}

function MyCalendar({ date, setDate, availabilities, setTimeSlots }: MyCalendarProps) {
  const today = new Date();

  const disabledDate = new Set();
  availabilities.forEach((av) => {
    if (av.active === 0) {
      disabledDate.add(av.day_of_week);
    }
  });

  const disableNonAvailableDays = ({ date }: { date: Date }) => {
    const nonAvailableDays = disabledDate.has(date.getDay());
    return nonAvailableDays;
  };

  return (
    <div>
      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        minDate={today}
        tileDisabled={disableNonAvailableDays}
      />
    </div>
  );
}

export default MyCalendar;
