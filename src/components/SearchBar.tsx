"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { search, SearchResult } from "@/lib/search";
import { Search, X, Hash, Zap, HelpCircle, BookOpen } from "lucide-react";
import clsx from "clsx";

const typeIcons: Record<SearchResult["type"], React.ElementType> = {
  topic: BookOpen,
  formula: Zap,
  flashcard: HelpCircle,
  concept: Hash,
};

const typeColors: Record<SearchResult["type"], string> = {
  topic: "text-blue-400",
  formula: "text-purple-400",
  flashcard: "text-emerald-400",
  concept: "text-orange-400",
};

const typeBadge: Record<SearchResult["type"], string> = {
  topic: "bg-blue-500/15 text-blue-400",
  formula: "bg-purple-500/15 text-purple-400",
  flashcard: "bg-emerald-500/15 text-emerald-400",
  concept: "bg-orange-500/15 text-orange-400",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const r = search(query).slice(0, 8);
    setResults(r);
    setSelected(0);
  }, [query]);

  const navigate = (result: SearchResult) => {
    router.push(`/unit/${result.unitId}/${result.topicId}`);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected]);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search topics, formulas, flashcards…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-20 py-2 text-sm bg-neutral-900 dark:bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="text-neutral-500 hover:text-neutral-300"
            >
              <X size={13} />
            </button>
          )}
          <span className="text-[10px] text-neutral-600 border border-neutral-800 rounded px-1 py-0.5 hidden sm:block">
            ⌘K
          </span>
        </div>
      </div>

      {open && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-20 overflow-hidden">
            {results.map((result, i) => {
              const Icon = typeIcons[result.type];
              return (
                <button
                  key={i}
                  onClick={() => navigate(result)}
                  className={clsx(
                    "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-neutral-800/50 last:border-0",
                    i === selected
                      ? "bg-neutral-800"
                      : "hover:bg-neutral-800/50"
                  )}
                >
                  <Icon
                    size={14}
                    className={clsx("mt-0.5 flex-shrink-0", typeColors[result.type])}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-neutral-200 font-medium truncate">
                        {result.text}
                      </span>
                      <span
                        className={clsx(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0",
                          typeBadge[result.type]
                        )}
                      >
                        {result.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {result.unitTitle} › {result.topicTitle}
                    </div>
                    {result.highlight && (
                      <div className="text-[11px] text-neutral-600 mt-1 line-clamp-1">
                        {result.highlight}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
