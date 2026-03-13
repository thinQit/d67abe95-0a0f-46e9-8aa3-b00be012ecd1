"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search titles, authors…",
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("search") || "";
    setValue(param);
  }, [searchParams.get("search")]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  }

  return (
    <label className="relative block">
      <span className="sr-only">Search books</span>
      <input
        className={cn(
          "w-full py-2 px-4 pl-10 rounded-lg border border-border bg-card text-base shadow-inner focus:ring-1 focus:ring-primary transition"
        )}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        aria-label={placeholder}
      />
      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </label>
  );
}
