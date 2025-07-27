import { useState } from "react"
import { Play } from "lucide-react"

interface CoursePreviewProps {
  thumbnailUrl: string
  trailer: string
}

export default function CoursePreview({ thumbnailUrl, trailer }: CoursePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
    // In a real implementation, this would trigger video playback
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      {!isPlaying ? (
        <>
          <img src={thumbnailUrl || "/placeholder.svg"} alt="Course preview" className="object-cover w-full h-full"  />
          <button
            onClick={handlePlayClick}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110"
            aria-label="Play video"
          >
            <Play className="h-8 w-8 fill-current" />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <video
          src={trailer}
          controls
          autoPlay
          className="absolute top-0 left-0 h-full w-full object-cover"
        /> 
        </div>
      )}
    </div>
  )
}