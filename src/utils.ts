import moment from "moment";
import { DayOfWeek } from "./constant";
export const generateTimeOptions = (interval : number = 15, format : number = 12) => {
  const times : string[] = [];
  const totalMinutesInDay = 24 * 60;

  for (let minutes = 0; minutes < totalMinutesInDay; minutes += interval) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const formattedTime = new Date(0, 0, 0, hrs, mins).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === 12,
    });

    times.push(formattedTime);
  }

  return times;
};

export const toSeconds = (timeStr:string) => {
  const time = moment(timeStr, ["h:mm A"]); // e.g "09:00 AM"
  return time.hours() * 3600 + time.minutes() * 60;
};

export const weekDays: DayOfWeek[] = [
  DayOfWeek.SUN,
  DayOfWeek.MON,
  DayOfWeek.TUE,
  DayOfWeek.WED,
  DayOfWeek.THU,
  DayOfWeek.FRI,
  DayOfWeek.SAT,
];


export const dayOfWeeks = {
  "0": "sun",
  "1": "mon",
  "2": "tue",
  "3": "wed",
  "4": "thu",
  "5": "fri",
  "6": "sat",
};


export function getTimeSlots(startTime: string, endTime: string, meetingDuration: number) {
  const slots = [];

  // Convert "HH:mm:ss" to a Date object for today
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMin, 0, 0);

  while (current < end) {
    const next = new Date(current.getTime() + meetingDuration * 60000);

    if (next > end) break;

    slots.push(format12Hour(current));
    current = next;
  }

  return slots;
}

export function format12Hour(date: Date) {
  const istDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return istDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
