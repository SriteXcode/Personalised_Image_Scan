import { io } from "socket.io-client";

const SOCKET_URL = "https://personalised-image-scan.onrender.com"; // change if deployed
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

export default socket;
