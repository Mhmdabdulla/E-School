import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { Star } from "lucide-react";

interface RatingCardProps {
  averageRating: number;
  starPercentages: Record<number, number>; // e.g., { 5: 60, 4: 25, 3: 10, 2: 3, 1: 2 }
  totalReviews?: number; // Optional prop for total number of reviews
}

export function RatingCard({ averageRating, starPercentages, totalReviews = 0 }: RatingCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Course Rating</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {/* Average Rating Section */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/ 5.0</span>
            </div>
            <div className="flex justify-center md:justify-start mt-2" role="img" aria-label={`Average rating: ${averageRating.toFixed(1)} stars`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Star Distribution Section */}
          <div className="w-full md:w-2/3 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <RatingBar key={star} stars={star} percentage={starPercentages[star] || 0} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RatingBar({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center w-20" role="img" aria-label={`${stars} star${stars !== 1 ? "s" : ""}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i <= stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <Progress
        value={percentage}
        className="h-2 flex-1"
        aria-label={`${percentage}% of reviews are ${stars} stars`}
      />
      <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
    </div>
  );
}