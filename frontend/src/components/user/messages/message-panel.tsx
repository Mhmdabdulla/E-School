import { MessageHeader } from "./message-header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {type Message } from "../../../redux/slices/messageSlice";
import { sendMessage, updateMessage } from "../../../redux/thunks/messageThunk";
import {type IUser } from "../../../types/user";
// import { updateChat } from "@/redux/slices/chatSlice";

interface MessagePanelProps {
  activeChatId: string | null;
  onBackClick?: () => void;
}

export function MessagePanel({ activeChatId, onBackClick }: MessagePanelProps) {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement>(null);

  const chatMessages = useAppSelector((state) => state.message.messages);
  const userId = useAppSelector((state) => state.auth.user._id);
  const onlineUsers = useAppSelector((state) => state.chat.onlineUsers)

  const participants = useAppSelector((state) => state.chat.chats).find(
    (chat) => chat._id.toString() === activeChatId?.toString()
  )?.participants as Partial<IUser>[];

  const chatDetails = participants?.find((p) => p._id?.toString() !== userId.toString());

  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);
  const dispatch = useAppDispatch();

  const handleSendMessage = (body: string, file?:File) => {
    if (!body.trim() && !file) return;

    if (isEditing) {
      console.log(isEditing)
      setIsEditing(null);
      dispatch(updateMessage({messageId:isEditing, body}))
      return;
    }

    const content = new FormData()

    if(body){
      content.append("body", body)
    }
    if(file){
      content.append("attachment", file)
    }

    dispatch(sendMessage({ chatId: activeChatId as string, content }));
    // dispatch(
    //   updateChat({
    //     _id: activeChatId,
    //     lastMessage: {
    //       body: content,
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     },
    //     updatedAt: new Date().toISOString(),
    //   })
    // );
  };

  if (!activeChatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <>
      <MessageHeader
        name={chatDetails?.name as string}
        avatar={chatDetails?.profileImageUrl as string}
        online={onlineUsers.includes(chatDetails?._id as string)}
        onBackClick={onBackClick}
      />
      <MessageList
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setInputMessage={setInputMessage}
        inputRef={messageInputRef as React.RefObject<HTMLInputElement>}
        messages={messages}
      />
      <MessageInput
        message={inputMessage}
        setMessage={setInputMessage}
        inputRef={messageInputRef as React.RefObject<HTMLInputElement>}
        onSendMessage={handleSendMessage}
      />
    </>
  );
}