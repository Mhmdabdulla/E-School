import { Star, StarHalf } from "lucide-react"
import { cn } from "../../../lib/utils/className"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, size = "md", className }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className={cn("flex", className)}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
        } else {
          return <Star key={i} className={cn(sizeClasses[size], "text-muted-foreground")} />
        }
      })}
    </div>
  )
}