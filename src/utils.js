import moment from "moment";
export const generateTimeOptions = (interval = 15, format = 12) => {
  const times = [];
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

export const toSeconds = (timeStr) => {
  const time = moment(timeStr, ["h:mm A"]); // e.g "09:00 AM"
  return time.hours() * 3600 + time.minutes() * 60;
};

export const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const dayOfWeeks = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

export function getTimeSlots(startTime, endTime, meetingDuration) {
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

function format12Hour(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

