import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL; // change if deployed  
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

export default socket;
