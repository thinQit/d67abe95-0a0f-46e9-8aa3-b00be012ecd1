"use client";

import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function EmptyState({
  title = "Nothing here yet",
  description = "Try adjusting filters or check back later.",
  buttonLabel,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-16">
      <BookOpen className="h-12 w-12 text-muted-foreground mb-5" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {buttonLabel && buttonHref && (
        <a
          href={buttonHref}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
        >
          {buttonLabel}
        </a>
      )}
    </div>
  );
}
