"use client";

import Image from "next/image";

interface ProductGalleryProps {
  title: string;
  imageUrl?: string;
}

export default function ProductGallery({
  title,
  imageUrl,
}: ProductGalleryProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <figure className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={800}
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <span className="text-muted-foreground text-3xl font-medium">No cover</span>
        )}
      </figure>
    </div>
  );
}
