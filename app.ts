import io from "socket.io";

const socketServer = new io.Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};

socketServer.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    socketServer.emit("message", "A user disconnected :(");
  });
  socket._error = (error) => {
    console.log(error);
  };
  socket.on("message", (message) => {
    console.log(message, "message");
    socketServer.emit("message", message);
  });
  socket.on("new-user", (name) => {
    // @ts-ignore
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
});
