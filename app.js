// WebSocket placeholder
const socket = new WebSocket("ws://192.168.4.1/sms");

const msgContainer = document.getElementById("messages");
const input = document.getElementById("text-input");
const sendBtn = document.getElementById("send-btn");

// Update fake clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}, 1000);

socket.onmessage = (event) => {
  const msg = document.createElement("div");
  msg.className = "message incoming";
  msg.textContent = event.data;
  msgContainer.appendChild(msg);
  msgContainer.scrollTop = msgContainer.scrollHeight;
};

sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  socket.send(text);

  const msg = document.createElement("div");
  msg.className = "message outgoing";
  msg.textContent = text;
  msgContainer.appendChild(msg);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  input.value = "";
};
