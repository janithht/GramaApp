import React, { useEffect, useState } from "react";
import "./menubar.css";
import Button from "../Button/button";
import { useAuthContext } from "@asgardeo/auth-react";

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

  return (
    <div className="menu-bar">
      <span>
      <img src={user?.picture} alt="avatar" className="chat-avatar mt-0" />
      <span className="user-name">{user?.name}</span>
      </span>
      <div className="nav-menu">
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
          <p className=" mobile-username">{user?.name}</p>
          <button className="menu-item" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
