const socket = io();

const usernameInput = document.getElementById("username");
const statusInput = document.getElementById("status");
const statusList = document.getElementById("statusList");
const updateBtn = document.getElementById("updateBtn");
const connectionStatus = document.getElementById("connectionStatus");

// Connection feedback
socket.on("connect", () => {
  connectionStatus.textContent = "🟢 Connected to server";
  connectionStatus.className = "status connected";
});

socket.on("disconnect", () => {
  connectionStatus.textContent = "🔴 Disconnected";
  connectionStatus.className = "status disconnected";
});

// Send update
updateBtn.addEventListener("click", () => {
  const user = usernameInput.value.trim();
  const status = statusInput.value.trim();

  if (!user || !status) {
    alert("Please enter operator name and order status.");
    return;
  }

  socket.emit("status_update", { user, status });
  statusInput.value = "";
});

// Receive live updates
socket.on("status_broadcast", (data) => {
  const li = document.createElement("li");
  li.classList.add("fade-in");

  const statusClass = data.status.toLowerCase();

  li.innerHTML = `
    <span class="time">${data.time}</span>
    <strong>${data.user}</strong> updated order to
    <span class="order-status ${statusClass}">
      ${data.status}
    </span>
  `;

  statusList.prepend(li);
});
