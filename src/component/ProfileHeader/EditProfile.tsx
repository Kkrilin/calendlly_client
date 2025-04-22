import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const EventCardSeeting = ({ handleClose }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ borderRadius: "6px" }}>
      <div style={{ padding: "10px" }}>
        <Link to="/user/edit">
          <div className="setting_card" onClick={handleClose}>
            <EditIcon />
            <span>Edit Profile</span>
          </div>
        </Link>
        <div className="setting_card" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default EventCardSeeting;
