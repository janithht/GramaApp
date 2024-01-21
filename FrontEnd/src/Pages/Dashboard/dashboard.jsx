import React, { useState, useEffect } from "react";
import MenuBar from "../../Components/MenuBar/menubar.jsx";
import "../../Components/MenuBar/menubar.css";
import applyCertificate from "../../Assets/Apply.png";
import statusCheck from "../../Assets/Status.png";
import help from "../../Assets/Help.png";
import "./dashboard.css";
import Tile from "../../Components/Tile/tile.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdContactSupport } from "react-icons/md";
import moment from "moment";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  // CSpinner,
} from "@coreui/react";
import { getToken } from "../../Utils/getToken.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleToken = async () => {
    const token = await getToken();
    setToken(token);
  };

  useEffect(() => {
    // handleToken();
    // if (token !== "") {
      axios
        .get(
          "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/slackconnector-evm/slackservice-3b5/v1.0/getMessages",
          // {
          //   headers: {
          //     Accept: "application/scim+json",
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
        .then((res) => {
          setChatHistory([]);
          res?.data?.map((chat) => {
            const formatted = moment.unix(chat.timestamp).format("LLLL");
            const current_date = moment().format("MMM Do YY");
            const chat_date = moment(formatted).format("MMM Do YY");
            var date_object = new Date(formatted);
            var time_only = date_object.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            var date;
            if (current_date !== chat_date) {
              date = formatted.slice(0, -14);
              if (date.endsWith(",")) {
                date = formatted.slice(0, -15);
              }
              if (date.endsWith("1")) {
                date += "st";
              } else if (date.endsWith("2")) {
                date += "nd";
              } else if (date.endsWith("3")) {
                date += "rd";
              } else {
                date += "th";
              }
            } else {
              date = "Today";
            }
            setChatHistory((prev) => [
              ...prev,
              {
                user: chat.user,
                message: chat.message,
                timestamp: formatted,
                time_only,
                date,
              },
            ]);
          });
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  }, [visible]);

  const handleSendMessage = () => {
    // if (token !== "") {
      axios
        .post(
          `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/slackconnector-evm/slackservice-3b5/v1.0/sendMessage?message=${message}`,
          // {
          //   headers: {
          //     Accept: "application/scim+json",
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
        .then((res) => setVisible(false))
        .catch((err) => {
          console.log("error:", err);
        });
    // }
  };

  return (
    // loading ?
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
              {chatHistory?.map((chat, index) => {
                return (
                  <span key={index}>
                    {chatHistory[index - 1]?.date !==
                      chatHistory[index]?.date && (
                      <div className="date-divider">
                        <span>{chat?.date}</span>
                      </div>
                    )}
                    {chat?.user === "Grama Support" ? (
                      <div className="ask-for-help-chat-right">
                        <div className="chat-divider-right">
                          <div>
                            <span className="chat-username">
                              {chat?.user} (citizen){" "}
                            </span>
                            <span className="chat-time">{chat?.time_only}</span>
                          </div>
                          <p className="chat-text chat-text-right">
                            {chat?.message}
                          </p>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/web-login-7e719.appspot.com/o/log4.png?alt=media&token=6fcb1e62-ecda-4da2-8b65-bce92fc187d8"
                          alt="avatar"
                          className="chat-avatar"
                        />
                      </div>
                    ) : (
                      <div className="ask-for-help-chat-left">
                        <img
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww"
                          alt="avatar"
                          className="chat-avatar"
                        />
                        <div className="chat-divider-left">
                          <div>
                            <span className="chat-username">
                              {chat?.user} (Grama){" "}
                            </span>
                            <span className="chat-time">{chat?.time_only}</span>
                          </div>
                          <p className="chat-text chat-text-left">
                            {chat?.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </span>
                );
              })}
            </CModalBody>
            <CModalFooter className=" chat-message-send">
              <input
                type="text"
                className="form-control"
                placeholder={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <CButton color="primary" onClick={handleSendMessage}>
                Send
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    </div>
  );
  // ) : (
  //   <div className="d-flex justify-content-center align-items-center">
  //     <CSpinner className="m-5" color="primary" />
  //   </div>
};

export default Dashboard;