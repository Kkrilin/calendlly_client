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
