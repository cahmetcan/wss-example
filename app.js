
const io = require("socket.io")

const socketServer = new io.Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};

socketServer.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
    socketServer.emit("users", users);
  });
  socket._error = (error) => {
    console.log(error);
  };
  socket.on("message", (message) => {
    console.log(message, "message");
    socketServer.emit("message", message);
  });
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    socketServer.emit("users", users);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
});
