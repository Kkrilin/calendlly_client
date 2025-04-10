import { Avatar, Button } from "@mui/material";

const EventType = () => {
  return (
    <>
      <h1>Event Type</h1>
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
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="profile logo"
            //   src={}
          >
            K
          </Avatar>
          <div>
            <h3>Kundan singh patel</h3>
            <h3>
              booking link for all event
              (http://localhost:5173/book/kundansingh066)
            </h3>
          </div>
        </div>
        <Button
          className="new_create_button"
          variant="outlined"
          color="primary"
        >
          new event type
        </Button>
      </div>
    </>
  );
};

export default EventType;
