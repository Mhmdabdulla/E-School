import { Star } from "lucide-react"

interface CourseHeaderProps {
  title: string
  subtitle: string
  rating: number
  reviewCount: number
  instructor: any
}

export default function CourseHeader({ title, rating, reviewCount, instructor }: CourseHeaderProps) {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl md:text-2xl">{title}</h1>
      {/* <p className="mb-4 text-md text-muted-foreground">{subtitle}</p> */}

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : star <= rating
                      ? "fill-yellow-400 text-yellow-400 opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">{rating}</span>
          <span className="ml-1 text-muted-foreground">({reviewCount.toLocaleString()} ratings)</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm">Created by :</span>
          <span className="ml-1 font-medium">{instructor.name}</span>
        </div>
      </div>
    </div>
  )
}