import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { ChevronLeft, MoreHorizontal } from "lucide-react"

interface MessageHeaderProps {
  name: string
  avatar: string
  online: boolean
  onBackClick?: () => void
}

export function MessageHeader({ name, avatar, online, onBackClick }: MessageHeaderProps) {
  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        {onBackClick && (
          <Button variant="ghost" size="icon" className="mr-1 md:hidden" onClick={onBackClick}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        )}
        <div className="relative">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
          )}
        </div>
        <div>
          <h2 className="font-medium">{name}</h2>
          {online && <p className="text-xs text-muted-foreground">Online</p>}
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
        <span className="sr-only">More options</span>
      </Button>
    </div>
  )
}