import React, { useState } from 'react';
import './menubar.css'; 
import Button from "../Button/button"
import { useAuthContext } from '@asgardeo/auth-react';
import { useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { signOut} = useAuthContext();

  const navigate = useNavigate();


  return (
    <div className="menu-bar">
      <p className='grama-name'>Grama Check</p>
      <div className="nav-menu">
        <Button className='menu-btn' onClick={()=> navigate("/dashboard")}>Main Menu</Button>
        <button className='menu-btn' onClick={() => signOut()}>Logout</button>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="menu-item" onClick={()=> navigate("/dashboard")}>Main Menu</button>
          <button className="menu-item" onClick={()=>signOut()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
