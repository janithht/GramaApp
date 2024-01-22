import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { MdContactSupport } from "react-icons/md";
import ChatMessage from "../ChatMessage/chatmessage.jsx"
import "./messagemodal.css";


const MessageModal = ({ visible, onClose, chatHistory, onSendMessage, message, onMessageChange }) => {
  return (
    <CModal
      scrollable
      visible={visible}
      onClose={onClose}
      aria-labelledby="ScrollingLongContentExampleLabel2"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          <MdContactSupport size={28} />
          Grama Support
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Map through chat history and render ChatMessage component */}
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} prevChat={chatHistory[index - 1]} />
        ))}
      </CModalBody>
      <CModalFooter className=" chat-message-send">
        <input
          type="text"
          className="form-control"
          placeholder={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <CButton /*style={{backgroundColor :"#A05B9D",borderColor:"#A05B9D"}}*/ color="primary" onClick={onSendMessage}>
          Send
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default MessageModal;