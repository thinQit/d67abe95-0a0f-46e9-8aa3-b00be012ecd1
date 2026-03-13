"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
}

export default function RatingStars({
  rating = 5,
  count,
}: RatingStarsProps) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-2" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i + 1 <= rounded ? "#8B5CF6" : "none"}
            className={i + 1 <= rounded ? "w-5 h-5 text-accent" : "w-5 h-5 text-muted-foreground"}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{rating}{count && <> · {count} reviews</>}</span>
    </div>
  );
}
