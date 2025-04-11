import LeftSideBar from "../LeftSidebar/LeftSideBar.jsx";
import ProfileHeader from "../ProfileHeader.jsx/ProfileHeader.jsx";
import { Outlet } from "react-router-dom";
function ProfileLayout() {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <LeftSideBar />
      <div
        style={{
          width: "86vw",
          padding: "2rem 12rem",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <ProfileHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
