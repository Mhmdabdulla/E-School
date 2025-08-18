import { Button } from "../../ui/button"
import { Send, Paperclip, X } from "lucide-react"
import { type FormEvent, useState, useRef } from "react"

interface MessageInputProps {
  onSendMessage: (message: string, file?: File) => void
  inputRef: React.RefObject<HTMLInputElement>
  message: string
  setMessage: (val: string) => void
}

export function MessageInput({ onSendMessage, inputRef, message, setMessage }: MessageInputProps) {
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachedFile(file)
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else if (file.type.startsWith('video/') || file.type === 'application/pdf') {
        setPreviewUrl(null)
      }
    }
  }

  const handleRemoveAttachment = () => {
    setAttachedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(attachedFile)
    if (message.trim() || attachedFile) {
      if(attachedFile){
        onSendMessage(message, attachedFile)
      }else{
        onSendMessage(message)
      }
      setMessage("")
      setAttachedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const renderPreview = () => {
    if (!attachedFile) return null

    if (attachedFile.type.startsWith('image/') && previewUrl) {
      return (
        <div className="relative max-w-[200px] mt-2 mb-2">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg border border-border" />
          <Button
            size="icon"
            variant="secondary"
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full"
            onClick={handleRemoveAttachment}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
    }

    if (attachedFile.type.startsWith('video/')) {
      return (
        <div className="relative flex items-center gap-2 mt-2 p-2 bg-muted rounded-lg max-w-[200px]">
          <div className="w-12 h-12 bg-background flex items-center justify-center rounded border border-border">
            <span className="text-foreground font-semibold text-sm">Video</span>
          </div>
          <span className="text-sm truncate text-foreground">{attachedFile.name}</span>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full"
            onClick={handleRemoveAttachment}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
    }

    if (attachedFile.type === 'application/pdf') {
      return (
        <div className="relative flex items-center gap-2 mt-2 p-2 bg-muted rounded-lg max-w-[200px]">
          <div className="w-12 h-12 bg-background flex items-center justify-center rounded border border-border">
            <span className="text-foreground font-semibold text-sm">PDF</span>
          </div>
          <span className="text-sm truncate text-foreground">{attachedFile.name}</span>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full"
            onClick={handleRemoveAttachment}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
    }

    return null
  }

  return (
    <div className="border-t p-4 bg-background">
      {renderPreview()}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message"
            className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Attach file</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-foreground text-background hover:bg-muted-foreground"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}