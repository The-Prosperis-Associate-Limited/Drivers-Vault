"use client";

import Cookies from "js-cookie";
import { io, type Socket } from "socket.io-client";
import { ENV } from "./utils";

let socket: Socket | null = null;

// One socket per tab, shared by the support chat and the admin inbox. The
// server authenticates the handshake with the same access token axios uses.
export const getChatSocket = function (): Socket | null {
  const token = Cookies.get("session_id");

  if (!token) return null;

  if (socket?.connected) return socket;

  if (socket) {
    socket.auth = { token };
    socket.connect();
    return socket;
  }

  socket = io(ENV.API_URL.replace(/\/api\/?$/, ""), {
    transports: ["websocket"],
    auth: { token },
    reconnectionAttempts: 5,
  });

  return socket;
};
