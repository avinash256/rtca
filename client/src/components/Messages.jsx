/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

// import "./Messages.css";

// eslint-disable-next-line react/function-component-definition
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages rounded">
    {messages.map((message, i) => (
      <Message key={i} message={message} name={name} />
    ))}
  </ScrollToBottom>
);

export default Messages;
