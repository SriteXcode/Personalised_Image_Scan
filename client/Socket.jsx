import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL; // change if deployed  
const socket = io("https://personalised-image-scan.onrender.com", {
  transports: ["websocket", "polling"],
});

export default socket;
