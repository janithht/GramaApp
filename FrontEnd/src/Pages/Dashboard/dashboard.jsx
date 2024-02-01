import React, { useState } from "react";
import MenuBar from "../../Components/MenuBar/menubar.jsx";
import "../../Components/MenuBar/menubar.css";
import applyCertificate from "../../Assets/Apply.png";
import statusCheck from "../../Assets/Status.png";
import help from "../../Assets/Help.png";
import "./dashboard.css";
import Tile from "../../Components/Tile/tile.jsx";
import { useNavigate } from "react-router-dom";
import ChatModal from "./chatmodel.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <div className="full-container">
      <div className="menubar-container">
      <MenuBar />
      </div>
      <div className="main-container">
        <p className="welcome-heading">Welcome to Grama Check!</p>
        <div className="menu-container">
          <Tile
            text="Apply for Certificate"
            image={applyCertificate}
            onClick={() => navigate("/application")}
          />
          <Tile text="Check the Status" image={statusCheck} onClick={() => navigate("/statuscheck")}/>
          <div className="dashboard-tile" onClick={() => setVisible(!visible)}>
            <div className="tile-content">
              <div className="tile-image">
                <img src={help} alt="Ask for Help" />
              </div>
              <div className="tile-text">Ask for Help</div>
            </div>
          </div>
          <ChatModal
          visible={visible}
          setVisible={setVisible}
        />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;