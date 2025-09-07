import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // change if deployed
const Socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

export default Socket;
