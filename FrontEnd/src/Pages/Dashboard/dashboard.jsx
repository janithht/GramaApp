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
import moment from "moment";
import { getToken } from "../../Utils/getToken.js";
import ChatModal from "./chatmodel.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleToken = async () => {
    const token = await getToken();
    setToken(token);
  };

  useEffect(() => {
    setMessage("");
    handleToken();
    if (token !== "") {
      axios
        .get(
          "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/slackconnector-evm/slackservice-3b5/v1.0/getMessages",
          {
            headers: {
              Accept: "application/scim+json",
              Authorization: `Bearer ${token}`,
            },
          }
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
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [visible]);

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
          loading={loading}
          chatHistory={chatHistory}
        />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;