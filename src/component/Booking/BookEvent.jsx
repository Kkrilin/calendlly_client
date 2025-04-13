import { Button } from "@mui/material";

const BookEvent = ({ handleClose }) => {
  return (
    <div>
      <div>
        <h3>Enter Details</h3>
        <form>
          <label htmlFor="name">
            name <sup>*</sup>
            <input type="text" id="name" />
          </label>
          <label htmlFor="email">
            email <sup>*</sup>
            <input type="email" id="name" />
          </label>
        </form>
        <Button onClick={handleClose} variant="contained">
          Schedule Event
        </Button>
      </div>
    </div>
  );
};

export default BookEvent;
