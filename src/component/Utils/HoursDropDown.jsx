import { generateTimeOptions } from "../../utils";

const timeOptions = generateTimeOptions(15, 12);
const HoursDropDown = () => {
  return (
    <select className="select_option">
      {timeOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default HoursDropDown;
