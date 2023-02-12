/* eslint-disable no-shadow */
/* eslint-disable no-console */
// import React, { useEffect, useState } from "react';
// import { useSearchParams } from 'react-router-dom';
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:3000', { autoConnect: false });
// const Chat = () => {
//   const [searchParams] = useSearchParams();
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [messages, setMessages] = useState('');
//   const [message, setMessage] = useState('');

//   const [users, setUsers] = useState([]);
//   //console.log(searchParams, ' : ', searchParams.get('room'));

//   useEffect(() => {
//     socket.connect();
//     socket.on('message', (message) => {
//       setMessages((messages) => [...messages, message]);
//       console.log('message: ', message);
//     });
//     socket.on('roomData', ({ users }) => {
//       setUsers(users);
//     });
//   }, []);

//   useEffect(() => {
//     const name = searchParams.get('name');
//     const room = searchParams.get('room');
//     setName(name);
//     setRoom(room);
//     socket.emit('join', { name, room }, (error) => {
//       if (error) {
//         alert(error);
//       }
//     });
//   }, [searchParams, name, room]);

// };

// export default Chat;

import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import Input from "./Input";
import InfoBar from "./InfoBar";
import Messages from "./Messages";
import Users from "./Users";
import "./Chat.css";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});

function Chat() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    // { user: "A", text: "aaa" },
    // { user: "B", text: "bbb" },
    // { user: "C", text: "ccc" },
  ]);

  // console.log(name, room);
  if (name && room) {
    socket.connect();
  }
  useEffect(() => {
    setName(searchParams.get("name"));
    setRoom(searchParams.get("room"));
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log("ERROR-join", error);
      }
      redirect("/");
    });
  }, [name, room, searchParams]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected", socket.id);
    });

    socket.on("message", (message) => {
      setMessages((messages) => {
        const newMessages = [...messages, message];

        console.log("new messages", newMessages);
        return newMessages;
      });
      console.log(message.user, message.text);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => socket.removeAllListeners();
  });

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(message);
    socket.emit("sendMessage", message, () => {
      setMessage("");
      console.log("Acknowledged-sendMessage");
    });
  };

  return (
    <div className="outerContainer p--20">
      <div className="innerContainer rounded">
        {/* infobar */}
        <InfoBar room={room} />

        {/* users */}

        <Users users={users} />
        {/* messages */}
        <Messages messages={messages} name={name} />
        {/* input */}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
