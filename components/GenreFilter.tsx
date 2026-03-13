"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  genres: string[];
  toggles?: string[];
  sortOptions?: string[];
}

export default function GenreFilter({
  genres = [],
  toggles = ["Featured only", "In stock"],
  sortOptions = [
    "Featured",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Top Rated",
  ],
}: Partial<GenreFilterProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedGenre = searchParams.get("genre") || "";
  const isFeatured = searchParams.get("featured") === "true";
  const isInStock = searchParams.get("inStock") === "true";
  const selectedSort = searchParams.get("sort") || "";

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            className={cn(
              "px-3 py-1 text-sm rounded-md border",
              selectedGenre === genre
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-foreground border-border hover:bg-primary/10"
            )}
            onClick={() =>
              setParam("genre", selectedGenre === genre ? null : genre)
            }
            type="button"
            aria-pressed={selectedGenre === genre}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className={cn(
            "px-3 py-1 text-sm rounded-md border",
            isFeatured
              ? "bg-accent text-accent-foreground border-accent"
              : "bg-muted text-foreground border-border hover:bg-accent/10"
          )}
          onClick={() => setParam("featured", isFeatured ? null : "true")}
          type="button"
          aria-pressed={isFeatured}
        >
          Featured only
        </button>
        <button
          className={cn(
            "px-3 py-1 text-sm rounded-md border",
            isInStock
              ? "bg-emerald-100 text-emerald-700 border-emerald-300"
              : "bg-muted text-foreground border-border hover:bg-emerald-100"
          )}
          onClick={() => setParam("inStock", isInStock ? null : "true")}
          type="button"
          aria-pressed={isInStock}
        >
          In stock
        </button>
        <select
          className="ml-2 border border-border rounded-md px-3 py-1 text-sm bg-card"
          value={selectedSort}
          onChange={(e) => setParam("sort", e.target.value)}
        >
          <option value="">Sort: Featured</option>
          <option value="created_desc">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Top Rated</option>
        </select>
      </div>
    </section>
  );
}
