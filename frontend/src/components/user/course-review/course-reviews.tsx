import { useEffect, useState } from "react";
import { StudentReviews } from "./student-review";
import { fetchCourseReviews } from "../../../services/reviewService";
import {type IPopulatedReview } from "../../../types/review";
import { useAppSelector } from "../../../redux/store";

interface CourseReviewsProps {
  courseId: string;
}
export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const [reviews, setReviews] = useState<IPopulatedReview[]>([]);
  const [hasMore, setHasMore] = useState<boolean>();
  const [filter, setFilter] = useState<string>("all");
  const [skip, setSkip] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const newReview = useAppSelector(state => state.review.reviews)

  const getCourseReviews = async () => {
    try {
      const data = await fetchCourseReviews(courseId, skip, 5, filter);
      console.log(data);
      if (loadMore) {
        setLoadMore(false);
        setReviews((prev) => [...prev, ...data.reviews]);
      } else {
        setReviews(data.reviews);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, skip]);

  useEffect(()=> {
    setReviews(prev => [...newReview, ...prev])
  },[newReview])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* <h1 className="text-2xl font-bold mb-6">Course Rating</h1> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <CourseRatingOverview rating={4.8} />
        </div>
        <div className="md:col-span-2">
          <RatingDistribution
            distribution={[
              { stars: 5, percentage: 75 },
              { stars: 4, percentage: 21 },
              { stars: 3, percentage: 3 },
              { stars: 2, percentage: 1 },
              { stars: 1, percentage: 0.5 },
            ]}
          />
        </div>
      </div> */}

      <StudentReviews
        setLoadMore={setLoadMore}
        reviews={reviews}
        hasMore={hasMore as boolean}
        setFilter={setFilter}
        setSkip={setSkip}
        setReviews={setReviews}
      />
    </div>
  );
}