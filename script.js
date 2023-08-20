const socket = io("http://localhost:3000");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const pinMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messages.append(messageElement);
};

const userName = prompt("What is your name?");
pinMessage("Welcome to the chat");
socket.emit("new-user", userName);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  socket.emit("message", message);
  input.value = "";
});
