import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { StarRating } from "./start-rating";
import type{ IPopulatedReview } from "../../../types/review";
import { timeAgo } from "../../../lib/utils/formatDate";
import { useSelector } from "react-redux";
import {type RootState } from "../../../redux/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import ReviewDialog from "./course-review-dialog";
import { ConfirmationDialog } from "../../common/ConfirmationDialogue";
import { deleteReview, updateReview } from "../../../services/reviewService";

interface StudentReviewsProps {
  reviews: IPopulatedReview[];
  hasMore: boolean;
  setReviews: (value: IPopulatedReview[] | ((value: IPopulatedReview[]) => IPopulatedReview[])) => void;
  setFilter: (value: string) => void;
  setSkip: (value: number | ((v: number) => number)) => void;
  setLoadMore: (value: boolean) => void;
}
export function StudentReviews({ reviews, hasMore, setFilter, setSkip, setLoadMore, setReviews }: StudentReviewsProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const userId = useSelector((state: RootState) => state.auth.user._id);

  const handleFilterChange = (value: string) => {
    setSkip(0);
    setFilter(value);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setSkip((prev) => prev + 5);
    setLoadMore(true);
    setLoading(false);
  };

  const handleEditReview = async (reviewId: string, rating: number, comment: string) => {
    console.log(reviewId, comment, rating);
    try {
      const data = await updateReview(reviewId, rating.toString(), comment);
      console.log(data);
      setReviews(prev =>
        prev.map(review =>
          review._id === reviewId
            ? { ...review, comment, rating }
            : review
        )
      );
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
       await deleteReview(reviewId)
      setReviews(prev =>
        prev.filter(review => review._id !== reviewId)
      );
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students Feedback</h2>
        <Select defaultValue="all" onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[150px] h-[30px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Star Rating</SelectItem>
            <SelectItem value="4">4 Star Rating</SelectItem>
            <SelectItem value="3">3 Star Rating</SelectItem>
            <SelectItem value="2">2 Star Rating</SelectItem>
            <SelectItem value="1">1 Star Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            userId={userId}
            onDelete={handleDeleteReview}
            onEdit={handleEditReview}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {hasMore && (
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-black hover:bg-black/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

interface ReviewCardProps {
  review: IPopulatedReview;
  userId: string;
  onEdit: (id: string, rating: number, comment: string) => void;
  onDelete: (reviewId: string) => void;
}

export function ReviewCard({ review, userId, onDelete, onEdit }: ReviewCardProps) {
  const isOwnReview = review.userId._id === userId;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <div className="relative flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={review.userId.profileImageUrl || "/placeholder.svg"} alt={review.userId.name} />
        <AvatarFallback>{review.userId.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
          <h3 className="font-medium">{review.userId.name}</h3>
          <span className="text-sm text-muted-foreground">• {timeAgo(review.createdAt)}</span>
        </div>
        <StarRating rating={review.rating} size="sm" className="mb-2" />
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </div>

      {isOwnReview && (
        <div className="absolute top-2 right-2 flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsEditing(true)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Review</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => setIsDeleting(true)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Review</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      {isEditing && (
        <ReviewDialog
          isOpen={true}
          onSubmit={(rating, comment) => onEdit(review._id, rating, comment)}
          onOpenChange={() => setIsEditing((prev) => !prev)}
          mode="edit"
          initialRating={review.rating}
          initialReview={review.comment}
        />
      )}

      {isDeleting && (
        <ConfirmationDialog
          isOpen={true}
          onClose={() => setIsDeleting((prev) => !prev)}
          onConfirm={()=> onDelete(review._id)}
          title="Confirm Deletion"
          description="Are you sure you want to delete this item?"
          type="delete"
        />
      )}
    </div>
  );
}