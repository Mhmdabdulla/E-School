/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {type RootState } from "../redux/store";
import { addMessage, deleteMessageFromState, updateMessageInState } from "../redux/slices/messageSlice";
import { updateChat, updateOnlineUsers } from "../redux/slices/chatSlice";
import { addNotification } from "../redux/slices/notificationSlice";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL_FOR_SOCKET

const SocketContext = createContext<Socket | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()
  useEffect(() => {
    if (user && accessToken) {
      const newSocket = io(SOCKET_URL, {
        query: { token: accessToken },
      });

      setSocket(newSocket)

      newSocket.on("connection", () => {
        setIsConnected(true);
      });

      newSocket.on("getOnlineUsers", (users) => {
        console.log(users)
        dispatch(updateOnlineUsers(users))
      })

      newSocket.on("newMessage", (message) => {
        dispatch(addMessage(message))
        dispatch(updateChat({
          _id:message.chatId,
          lastMessage:message,
          updatedAt:new Date().toISOString()
        }))
      })

      newSocket.on("receiveNotification", (notification) => {
        dispatch(addNotification(notification))
      })

      newSocket.on("updateMessage", (message) => {
        dispatch(updateMessageInState(message))
      })

      newSocket.on("deleteMessage", (message)=> {
        dispatch(deleteMessageFromState(message._id))
      }) 

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      setSocket(null);
      setIsConnected(false);
    }
  }, [user, accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};