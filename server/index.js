import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "PUT", "POST"],
  },
});

import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

import path from "path";

const PORT = 3000 || process.env.PORT;
//const router = require("./routes/routes");

app.use(express.static(path.join(__dirname + "/../client/build")));
//app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("message", {
      user: "admin",
      text: `${user.name},Welcome to room ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined`,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("message---", message);
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("server is started ", PORT);
});
