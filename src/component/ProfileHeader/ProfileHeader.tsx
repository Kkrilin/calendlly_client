import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import LogoutPopOver from "../Utils/PopOver/LogoutPopOver";
import { RootState } from "../../redux/store";
const ProfileHeader = () => {
  const { data, loading } = useSelector((state: RootState) => state.profile);

  // if (loading) {
  //   return <></>;
  // }
  return (
    // {loading
    <>
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
          <h4>{data.email}</h4>
          <LogoutPopOver>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt="profile logo"
            //   src={}
            >
              {data.name[0]}
            </Avatar>
            <ArrowDropDownIcon />
          </LogoutPopOver>
        </div>
      </div>
    </>
    // }
  );
};

export default ProfileHeader;
