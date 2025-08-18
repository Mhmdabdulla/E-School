import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Search, Plus } from "lucide-react"
import { MessagePreview } from "./message-preview"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import {type IUser } from "../../../types/user"
import { fetchChats } from "../../../redux/thunks/chatThunk"
import { fetchMessages } from "../../../redux/thunks/messageThunk"
import { formatTimeWithoutSeconds } from "../../../lib/utils/dateUtils"

interface MessageSidebarProps {
  onChatSelect: (id: string) => void
}

export function MessageSidebar({ onChatSelect }: MessageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const getChats = async () => {
      try {
        dispatch(fetchChats())
      } catch (error) {
        console.error(error)
      }
    }

    getChats()
  }, [dispatch]);

     const {chats} = useAppSelector((state) => state.chat);
     const {user} = useAppSelector((state) => state.auth)
     const onlineUsers = useAppSelector((state) => state.chat.onlineUsers)

  const handleChangeChat = (chatId: string) => {
    onChatSelect(chatId)
    dispatch(fetchMessages(chatId))
  }

  return (
    <div className="flex h-full flex-col border rounded-md">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Compose</span>
        </Button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar px-4">
        {chats.map((chat) => {
        const participants = chat.participants as Partial<IUser>[]
        const targetUser = participants.filter(p => p._id !== user._id)[0]
        return (
          <MessagePreview
            key={chat._id}
            name={targetUser.name as string}
            message={chat.lastMessage?.body as string}
            time={formatTimeWithoutSeconds(new Date(chat.updatedAt))}
            avatar={targetUser.profileImageUrl as string}
            online={onlineUsers.includes(targetUser._id as string)}
            unread={false}
            isActive={onlineUsers.includes(targetUser._id as string)}
            onClick={() => handleChangeChat(chat._id)}
          />
        )

        })}
      </div>
    </div>
  )
}