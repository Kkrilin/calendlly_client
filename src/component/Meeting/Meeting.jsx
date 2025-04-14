import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { bookingBaseUrl, header } from "../../api";
import toast from "react-hot-toast";
const Meeting = () => {
  const [meetings, setMeetings] = useState({});

  useEffect(() => {
    axios
      .get(bookingBaseUrl, header)
      .then((res) => {
        setMeetings(res.data.meetings);
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);
  return (
    <>
      <h1>Meeting</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "4rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid #e7f1ff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <h3>UpComingMeeting</h3>
          </div>
        </div>
        {/* <Button
          className="new_create_button"
          variant="outlined"
          color="primary"
        ></Button> */}
      </div>
    </>
  );
};

export default Meeting;
