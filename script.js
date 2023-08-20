const socket = io("http://localhost:3000");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const users = document.getElementById("users");

const pinMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messages.append(messageElement);
};

const pinUser = (user) => {
  const userElement = document.createElement("div");
  userElement.innerText = user;
  users.innerHTML = `${user}`;
};

const userName = prompt("What is your name?");
pinMessage("Welcome to the chat");
socket.emit("new-user", userName);

socket.on("users", (data) => {
  pinUser(Object.values(data));
});

socket.on("chat-message", (data) => {
  pinMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (data) => {
  pinMessage(`${data} connected`);
});

socket.on("user-disconnected", (data) => {
  pinMessage(`${data} disconnected`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  pinMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  input.value = "";
});
