import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const ProfileHeader = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h4>kundasingh066@gmail.com</h4>
        <Avatar
          sx={{ width: 40, height: 40 }}
          alt="profile logo"
          //   src={}
        >
          K
        </Avatar>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
};

export default ProfileHeader;
