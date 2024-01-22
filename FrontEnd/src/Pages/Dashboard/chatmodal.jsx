import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
} from '@coreui/react';
import { MdContactSupport } from 'react-icons/md';
import Avatar from "../../Assets/Avatar.webp";
import G_Logo from "../../Assets/G_Logo.png";

const ChatModal = ({ visible, setVisible, loading, chatHistory, message, handleSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');

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
            {loading?<CModalBody>
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
                        src={G_Logo}
                          alt="avatar"
                          className="chat-avatar"
                        />
                      </div>
                    ) : (
                      <div className="ask-for-help-chat-left">
                        <img
                        src={Avatar}
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
            </CModalBody>:
            <CModalBody>
              <div className="loading-spinner d-flex justify-content-center">
                <CSpinner color="primary" />
              </div>
            </CModalBody>}
            <CModalFooter className=" chat-message-send">
              <input
                type="text"
                className="form-control"
                placeholder={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <CButton color="primary" onClick={handleSendMessage}>
                Send
              </CButton>
            </CModalFooter>
          </CModal>

);
};

export default ChatModal;