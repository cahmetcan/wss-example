const messages = document.getElementById("messages");
const users = document.getElementById("users");

const pinMessage = (message, messages) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messages.append(messageElement);
  };
  
  const pinUser = (user) => {
    const userElement = document.createElement("div");
    userElement.innerText = user;
    users.innerHTML = `${user}`;
  };

  export { pinMessage, pinUser };