import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ userData, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-container">
      <FaUserCircle
        size={34}
        className="profile-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="profile-dropdown">
          <h4>{userData.username}</h4>
          <p><strong>Mode:</strong> {userData.userMode}</p>
          {userData.userMode === "authority" && (
            <>
              <p><strong>Area:</strong> {userData.area}</p>
              <p><strong>Position:</strong> {userData.position}</p>
            </>
          )}
          <button className="logout-btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
