/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, Socket } from "socket.io";
import jwt from 'jsonwebtoken'


const userSocketMap: Record<string, string> = {};

let io: Server;

export const initSocketServer = (server: Server) => {
  io = server;

  io.use((socket, next) => {
    const token = socket.handshake.query.token as string;
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
      socket.data.user = user.userId;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.user;
    userSocketMap[userId] = socket.id;

    console.log(`user is connected to socket : ${userId}->${socket.id}`)

    server.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        server.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
  });
};

export const getIO = () => io;
export const getUserSocketId = (userId: string) => userSocketMap[userId];