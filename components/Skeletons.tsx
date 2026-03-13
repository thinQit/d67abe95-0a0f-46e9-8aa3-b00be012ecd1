"use client";

interface SkeletonsProps {
  type?: "products" | "table" | "pdp";
}

export default function Skeletons({ type = "products" }: SkeletonsProps) {
  if (type === "products") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-muted animate-pulse h-64" />
        ))}
      </div>
    );
  }
  if (type === "table") {
    return (
      <div className="overflow-x-auto">
        <div className="w-full border border-border rounded-xl animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex py-3 px-4 border-b last:border-b-0 bg-muted" />
          ))}
        </div>
      </div>
    );
  }
  // PDP skeleton
  if (type === "pdp") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-80 bg-muted rounded-xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-5 bg-muted rounded w-3/5 animate-pulse" />
          <div className="h-12 bg-muted rounded w-32 animate-pulse" />
        </div>
      </div>
    );
  }
  return null;
}
