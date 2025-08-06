// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LectureInfoProps {
  title: string
  students: number
  lastUpdated: string
  comments: number
}

export function LectureInfo({ title, lastUpdated, comments }: LectureInfoProps) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
        {/* <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Avatar key={i} className="border-2 border-background w-8 h-8">
              <AvatarImage src={`/placeholder.svg?text=${i}`} />
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex items-center justify-center w-8 h-8 rounded-full text-xs">+</div>
          <div className="ml-4 text-sm text-muted-foreground">
            <span className="font-medium">{students}</span> Students watching
          </div>
        </div> */}

        <div className="text-sm text-muted-foreground">
          <span>Last updated: {lastUpdated}</span>
          <span className="mx-2">•</span>
          <span>Comments: {comments}</span>
        </div>
      </div>
    </div>
  )
}