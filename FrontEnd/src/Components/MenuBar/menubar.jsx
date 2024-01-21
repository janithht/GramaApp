import React, { useEffect, useState } from "react";
import "./menubar.css";
import Button from "../Button/button";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { IoHome,IoLogOut } from "react-icons/io5";

const MenuBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getBasicUserInfo } = useAuthContext();
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
        <img src={`${user?.picture || 'https://st4.depositphotos.com/21557188/23289/v/450/depositphotos_232898026-stock-illustration-simple-silhouette-man-flat-icon.jpg'}`} alt="avatar" className="chat-avatar mt-0" />
        <span className="user-name">
          {user?.givenName} {user?.familyName}
        </span>
      </span>
      <div className="nav-menu">
        <Button className="menu-btn" onClick={() => navigate("/dashboard")}>
          <IoHome size={25} />
        </Button>
        <Button className="menu-btn" onClick={() => signOut()}>
          <IoLogOut size={25}/>
        </Button>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <p className=" mobile-username">
            {user?.givenName} {user?.familyName}
          </p>
          <button className="menu-item" onClick={() => navigate("/dashboard")}>
          <IoHome size={20} /> Main Menu
          </button>
          <button className="menu-item" onClick={() => signOut()}>
            <IoLogOut size={20}/> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
