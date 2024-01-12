import React from 'react';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "../../Components/MenuBar/menubar.css";
import { PiCertificateLight } from "react-icons/pi";
import { TbStatusChange } from "react-icons/tb";
import { IoMdHelp } from "react-icons/io";
import './dashboard.css';

const Dashboard = () => {
    return (
      <div>
        <MenuBar />
          <div className="main-container"> {/* Added a wrapper div with class "big-box" */}
            <div className="menu-container">
              <button className="menu-button">
                <PiCertificateLight className="icon" />
                Apply for Grama Certificate
              </button>
      
              <button className="menu-button">
                <TbStatusChange className="icon" />
                Check Status
              </button>
      
              <button className="menu-button">
                <IoMdHelp className="icon" />
                Help
              </button>
            </div>
          </div>
        </div>
      );
    };

export default Dashboard;
