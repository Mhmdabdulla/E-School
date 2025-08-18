import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { cn } from "../../../lib/utils/className"

interface MessagePreviewProps {
  name: string
  message: string
  time: string
  avatar: string
  online: boolean
  unread: boolean
  isActive: boolean
  onClick: () => void
}

export function MessagePreview({
  name,
  message,
  time,
  avatar,
  online,
  unread,
  isActive,
  onClick,
}: MessagePreviewProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div
      className={cn(
        "flex mt-2 cursor-pointer items-center gap-3 border rounded-md p-3 transition-colors hover:bg-muted/50",
        isActive && "bg-muted/50",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-sm text-muted-foreground truncate">{message}</p>
      </div>
      {unread && <div className="h-2 w-2 rounded-full bg-black"></div>}
    </div>
  )
}