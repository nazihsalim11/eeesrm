"use client";

import { useState } from "react";
import type { Flashcard } from "@/types";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Layers } from "lucide-react";
import clsx from "clsx";

interface Props {
  flashcards: Flashcard[];
}

type CardStatus = "new" | "correct" | "wrong";

export function FlashcardDeck({ flashcards }: Props) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState<CardStatus[]>(
    flashcards.map(() => "new")
  );
  const [mode, setMode] = useState<"study" | "review">("study");

  const card = flashcards[current];
  const mastered = statuses.filter((s) => s === "correct").length;
  const progress = (mastered / flashcards.length) * 100;

  const next = () => {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c + 1) % flashcards.length), 150);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c - 1 + flashcards.length) % flashcards.length), 150);
  };

  const mark = (status: "correct" | "wrong") => {
    setStatuses((prev) => {
      const next = [...prev];
      next[current] = status;
      return next;
    });
    next();
  };

  const reset = () => {
    setStatuses(flashcards.map(() => "new"));
    setCurrent(0);
    setFlipped(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-600 text-sm">
        No flashcards for this topic.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 whitespace-nowrap">
          {mastered}/{flashcards.length} mastered
        </span>
        <button
          onClick={reset}
          className="text-neutral-600 hover:text-neutral-400 transition-colors"
          title="Reset all"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Card */}
      <div className="relative h-52 cursor-pointer" onClick={() => setFlipped((f) => !f)}>
        <div
          className={clsx(
            "absolute inset-0 transition-all duration-300",
            flipped ? "[transform:rotateY(180deg)]" : ""
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl border border-neutral-800 bg-neutral-900 p-5 flex flex-col items-center justify-center gap-3 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium">
              Question {current + 1} of {flashcards.length}
            </div>
            <p className="text-center text-neutral-200 font-medium leading-relaxed text-sm">
              {card.question}
            </p>
            <div className="text-[10px] text-neutral-600 flex items-center gap-1 mt-2">
              <RotateCcw size={10} />
              tap to reveal answer
            </div>
            {/* Status indicator */}
            {statuses[current] !== "new" && (
              <div
                className={clsx(
                  "absolute top-3 right-3 w-2 h-2 rounded-full",
                  statuses[current] === "correct" ? "bg-emerald-500" : "bg-rose-500"
                )}
              />
            )}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl border border-neutral-700 bg-neutral-850 bg-neutral-900 p-5 flex flex-col items-center justify-center gap-3"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-medium">
              Answer
            </div>
            <p className="text-center text-neutral-200 leading-relaxed text-sm">
              {card.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={prev}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all text-xs"
        >
          <ChevronLeft size={14} /> Prev
        </button>

        {flipped && (
          <div className="flex-1 flex items-center gap-2">
            <button
              onClick={() => mark("wrong")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-medium"
            >
              <XCircle size={14} /> Still Learning
            </button>
            <button
              onClick={() => mark("correct")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-medium"
            >
              <CheckCircle size={14} /> Got it!
            </button>
          </div>
        )}

        {!flipped && (
          <button
            onClick={() => setFlipped(true)}
            className="flex-1 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-medium"
          >
            Reveal Answer
          </button>
        )}

        <button
          onClick={next}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all text-xs"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>

      {/* All cards overview */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {flashcards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFlipped(false);
              setTimeout(() => setCurrent(i), 100);
            }}
            className={clsx(
              "w-7 h-7 rounded-lg text-[10px] font-medium transition-all",
              i === current
                ? "bg-blue-500 text-white"
                : statuses[i] === "correct"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : statuses[i] === "wrong"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-neutral-800 text-neutral-500 hover:bg-neutral-700"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
