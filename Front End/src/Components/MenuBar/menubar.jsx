// import React from 'react';
// import './menubar.css';
// import { useAuthContext } from '@asgardeo/auth-react';
// import Button from "../Button/button"


// const MenuBar = () => {
//   const { signOut} = useAuthContext();

//   const handleLogout = () => {
//     <button onClick={() => signOut()}>Logout</button>
//     console.log('Logout clicked');
//   };

//   return (
//     <div className="menu-bar">
//       <p>Grama Check</p>
//       <div className="menu-items">
//         <Button style={{ backgroundColor: '#fff', color: '#BA68C8' }} onClick={handleLogout}>
//           Logout
//         </Button>      
//       </div>
//     </div>
//   );
// };

// export default MenuBar;

// MenuBar.jsx

import React, { useState } from 'react';
import './menubar.css'; // You can style your menu bar in a separate CSS file
import Button from "../Button/button"
import { useAuthContext } from '@asgardeo/auth-react';

const MenuBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { signOut} = useAuthContext();

  const handleLogout = () => {
    <button onClick={() => signOut()}>Logout</button>
    console.log('Logout clicked');
  };

  return (
    <div className="menu-bar">
      <p>Grama Check</p>
      <div className="nav-menu">
        <button className='main-menu-btn'>Main Menu</button>
        <Button style={{ backgroundColor: '#fff', color: '#BA68C8' }} onClick={handleLogout}>Logout</Button>
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
