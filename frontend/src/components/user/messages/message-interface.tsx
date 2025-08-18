import { MessageSidebar } from "./message-sidebar"
import { MessagePanel } from "./message-panel"
import { useMediaQuery } from "../../../hooks/useMobile"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { fetchMessages } from "../../../redux/thunks/messageThunk"

export function MessagingInterface() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const user = useAppSelector((state) => state.auth.user)

  const [showSidebar, setShowSidebar] = useState(true)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chatId) {
      setLoading(true)
      setActiveChatId(chatId);
      dispatch(fetchMessages(chatId))
      if (isMobile) {
        setShowSidebar(false);
      }
    }
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, isMobile]);

  const handleChatSelect = (id: string) => {
    setActiveChatId(id)
    if (isMobile) {
      setShowSidebar(false)
    }
    if(user.role === "user"){
      navigate(`/user/messages/${id}`);
    }else{
      navigate(`/instructor/messages/${id}`);
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  if(loading){
    return <div></div>
  }

  return (
    <div className="flex h-full w-full overflow-hidden gap-2">
      {(showSidebar || !isMobile) && (
        <div className={`${isMobile ? "w-full" : "w-1/3"} h-full`}>
          <MessageSidebar onChatSelect={handleChatSelect} />
        </div>
      )}

      {(!showSidebar || !isMobile) && (
        <div className={`${isMobile ? "w-full" : "w-2/3"} h-full border rounded-md flex flex-col`}>
          <MessagePanel activeChatId={activeChatId} onBackClick={isMobile ? toggleSidebar : undefined} />
        </div>
      )}
    </div>
  )
}