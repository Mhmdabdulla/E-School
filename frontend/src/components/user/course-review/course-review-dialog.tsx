import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Star, SendHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";

type ReviewDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialRating?: number;
  initialReview?: string;
  onSubmit: (rating: number, review: string) => void;
};

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  review: z
    .string()
    .trim()
    .min(5, "Review must be at least 5 characters long")
    .max(500, "Review cannot exceed 500 characters"),
});

export default function ReviewDialog({
  isOpen,
  onOpenChange,
  mode = "create",
  initialRating = 0,
  initialReview = "",
  onSubmit,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [errors, setErrors] = useState<{
    rating?: string;
    review?: string;
  }>({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setRating(initialRating);
    setReview(initialReview);
    setErrors({});

    if (isOpen) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            textareaRef.current.value.length;
        }
      }, 0);
    }
  }, [initialRating, initialReview, isOpen]);

  const validateField = (field: "rating" | "review", value: number | string) => {
    const data = { rating, review };
    if (field === "rating") {
      data.rating = value as number;
    } else {
      data.review = value as string;
    }

    const result = reviewSchema.safeParse(data);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field
      );
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError ? fieldError.message : undefined,
      }));
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    validateField("rating", newRating);
  };

  const handleReviewChange = (newReview: string) => {
    setReview(newReview);
    validateField("review", newReview);
  };

  const handleSubmit = () => {
    const result = reviewSchema.safeParse({ rating, review });

    if (!result.success) {
      const newErrors: { rating?: string; review?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "rating") {
          newErrors.rating = issue.message;
        }
        if (issue.path[0] === "review") {
          newErrors.review = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    onSubmit(result.data.rating, result.data.review);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === "edit" ? "Edit Your Review" : "Write a Review"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 max-w-[400px]">
          <div>
            <Label className="mb-4 block">Rating</Label>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer transition-colors ${
                    star <= rating
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "stroke-muted"
                  }`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          <div>
            <Label className="mb-4 block">Review</Label>
            <Textarea
              ref={textareaRef}
              placeholder="Share your thoughts..."
              value={review}
              onChange={(e) => handleReviewChange(e.target.value)}
              rows={4}
              maxLength={500}
              className={errors.review ? "border-red-500" : ""}
            />
            <p className="text-sm text-muted-foreground mt-1">
              {review.length}/500 characters
            </p>
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">{errors.review}</p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            {mode === "edit" ? "Update" : "Submit"}
            <SendHorizontal size={12} strokeWidth={1} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}