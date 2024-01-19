import React, { useState } from "react";
import MenuBar from "../../Components/MenuBar/menubar.jsx";
import "../../Components/MenuBar/menubar.css";
import applyCertificate from "../../Assets/Apply.png";
import statusCheck from "../../Assets/Status.png";
import help from "../../Assets/Help.png";
import "./dashboard.css";
import Tile from "../../Components/Tile/tile.jsx";
import { useNavigate } from "react-router-dom";
import { MdContactSupport } from "react-icons/md";
import { useAuthContext } from "@asgardeo/auth-react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getBasicUserInfo } = useAuthContext();
  const [message, setMessage] = useState("Type your message here...");
  console.log(getBasicUserInfo());
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="container">
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
          <Tile text="Check the Status" image={statusCheck} />
          <div className="dashboard-tile" onClick={() => setVisible(!visible)}>
            <div className="tile-content">
              <div className="tile-image">
                <img src={help} alt="Ask for Help" />
              </div>
              <div className="tile-text">Ask for Help</div>
            </div>
          </div>
          <CModal
            scrollable
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="ScrollingLongContentExampleLabel2">
            <CModalHeader>
              <CModalTitle id="ScrollingLongContentExampleLabel2">
                <MdContactSupport size={28} />
                Grama Support
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <>
                <div className="ask-for-help-chat-left">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww"
                    alt="avatar"
                    className="chat-avatar"
                  />
                  <div className="chat-divider-left">
                    <div>
                      <span className="chat-username">Grama </span>
                      <span className="chat-time">9:12 AM</span>
                    </div>
                    <p className="chat-text chat-text-left">
                      hello111111111111111111111111111111111111111111
                    </p>
                  </div>
                </div>
              </>
              <>
                <div className="ask-for-help-chat-right">
                  <div className="chat-divider-right">
                    <div>
                      <span className="chat-username">Grama Support </span>
                      <span className="chat-time">9:12 AM</span>
                    </div>
                    <p className="chat-text chat-text-right">hello</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww"
                    alt="avatar"
                    className="chat-avatar"
                  />
                </div>
              </>
            </CModalBody>
            <CModalFooter className=" chat-message-send">
              <input
                type="text"
                className="form-control"
                placeholder={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <CButton
                color="primary"
                onClick={() => {
                  setVisible(false);
                  console.log("before: ", message);
                  setMessage("");
                  console.log("after:", message);
                }}>
                Send
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
