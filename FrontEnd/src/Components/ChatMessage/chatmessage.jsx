import React from "react";
import "./chatmessage.css";

const ChatMessage = ({ chat, prevChat }) => {
  return (
    <span>
      {prevChat?.date !== chat.date && (
        <div className="date-divider">
          <span>{chat.date}</span>
        </div>
      )}
      {/* Render chat messages based on the user */}
      {chat.user === "Grama Support" ? (
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
};

export default ChatMessage;