import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Progress } from "@radix-ui/react-progress"

interface CourseReviewsProps {
  reviews: any
  rating: number
}

export default function CourseReviews({ reviews, rating }: CourseReviewsProps) {

  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review:any) => {
    const ratingIndex = Math.floor(review.rating) - 1
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingCounts[ratingIndex]++
    }
  })

  const totalReviews = reviews.length

  if(reviews === 0){
    return <div> no reviews for this course</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Student Reviews</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold">{rating}</div>
            <div className="space-y-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : star <= rating
                          ? "fill-yellow-400 text-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Course Rating</p>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <div className="w-6 text-sm">{star}</div>
                <Progress
                  value={totalReviews > 0 ? (ratingCounts[star - 1] / totalReviews) * 100 : 0}
                  className="h-2"
                />
                <div className="w-10 text-right text-sm text-muted-foreground">
                  {totalReviews > 0 ? Math.round((ratingCounts[star - 1] / totalReviews) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-muted-foreground">{totalReviews.toLocaleString()} reviews for this course</p>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, 3).map((review:any, index:any) => (
          <div key={index} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.userAvatar} alt={review.userName} />
                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}