import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
const ProfileHeader = () => {
  const { data, loading } = useSelector((state) => state.profile);

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
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="profile logo"
            //   src={}
          >
            {data.name[0]}
          </Avatar>
          <ArrowDropDownIcon />
        </div>
      </div>
    </>
    // }
  );
};

export default ProfileHeader;
