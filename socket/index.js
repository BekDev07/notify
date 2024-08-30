import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
  console.log(onlineUsers);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (requestBody) => {
    addNewUser(requestBody, socket.id);
    console.log("new user", onlineUsers);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("remove user", onlineUsers);
  });
});

console.log("socket server is running");

io.listen(5000);
