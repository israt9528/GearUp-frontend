"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { isAxiosError } from "axios"; // For strict error typing
import { reviewApi, CreateReviewDto } from "@/api/review.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gearId: string;
  gearName: string;
}

export function ReviewModal({
  isOpen,
  onClose,
  gearId,
  gearName,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateReviewDto) => reviewApi.createReview(data),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(5);
      // Invalidate queries so if we are looking at reviews, they refresh
      queryClient.invalidateQueries({ queryKey: ["gear-reviews", gearId] });
      onClose();
    },
    // STRICT TYPING: Removed 'any' and handled backend error messages
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response?.data) {
        // This will catch your specific backend errors like "You have already submitted a review..."
        const backendMessage = error.response.data.message;
        toast.error(backendMessage || "Failed to submit review");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    mutation.mutate({ gearId, rating, comment });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            How was your experience renting the{" "}
            <span className="font-semibold text-primary">{gearName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="comment"
              className="text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like about it? Was it in good condition?"
              className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
