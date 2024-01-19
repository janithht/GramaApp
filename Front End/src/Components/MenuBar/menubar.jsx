import React, { useEffect, useState } from "react";
import "./menubar.css";
import Button from "../Button/button";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getBasicUserInfo } = useAuthContext();
  const [user, setUser] = useState();

  useEffect(() => {
    getBasicUserInfo()?.then((user) => {
      setUser(user);
    });
  }, [getBasicUserInfo]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { signOut } = useAuthContext();

  const navigate = useNavigate();

  return (
    <div className="menu-bar">
      <p className="grama-name">Grama Check</p>
      <div className="nav-menu">
        <img
          src={user?.picture}
          alt="avatar"
          className="chat-avatar"
        />
        <p className="user-name">{user?.name}</p>
        <Button className="menu-btn" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="menu-item">Main Menu</button>
          {/* <MdContactSupport className="support-icon" size={35} />  */}
          <button className="menu-item">Support</button>
          <button className="menu-item" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
