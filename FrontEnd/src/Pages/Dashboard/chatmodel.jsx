import React, { useState,useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
} from "@coreui/react";
import { MdContactSupport } from "react-icons/md";
import Avatar from "../../Assets/Avatar.webp";
import G_Logo from "../../Assets/G_Logo.png";
import axios from "axios";
import { getToken } from "../../Utils/getToken.js";
import moment from "moment";


const ChatModal = ({ visible, setVisible, }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSendMessage = () => {
    handleToken();
    if (token !== "") {
      axios
        .post(
          `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/slackconnector-evm/slackservice-3b5/v1.0/sendMessage?message=${message}`,
          {},
          {
            headers: {
              Accept: "application/scim+json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setVisible(false);
          setMessage("");
        })
        .catch((err) => {
          console.log("error:", err);
        });
    }
  };

  return (
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
      {loading ? (
        <CModalBody>
          {chatHistory?.map((chat, index) => {
            return (
              <span key={index}>
                {chatHistory[index - 1]?.date !== chatHistory[index]?.date && (
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
                    <img src={G_Logo} alt="avatar" className="chat-avatar" />
                  </div>
                ) : (
                  <div className="ask-for-help-chat-left">
                    <img src={Avatar} alt="avatar" className="chat-avatar" />
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
      ) : (
        <CModalBody>
          <div className="loading-spinner d-flex justify-content-center">
            <CSpinner color="primary" />
          </div>
        </CModalBody>
      )}
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
  );
};

export default ChatModal;
