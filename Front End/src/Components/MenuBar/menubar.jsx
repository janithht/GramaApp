import React, { useState } from 'react';
import './menubar.css'; 
import Button from "../Button/button"
import { useAuthContext } from '@asgardeo/auth-react';


const MenuBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { signOut} = useAuthContext() || {};

  return (
    <div className="menu-bar">
      <p className='grama-name'>Grama Check</p>
      <div className="nav-menu">
        <Button className='menu-btn'>Main Menu</Button>
        <Button className='menu-btn' onClick={() => signOut()}>Logout</Button>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
        <span className="menu-dot"></span>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="menu-item">Main Menu</button>
          <button className="menu-item">Logout</button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
