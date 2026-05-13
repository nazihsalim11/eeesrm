"use client";

import { useState } from "react";
import type { Topic } from "@/types";
import { FormulaBlock } from "./FormulaBlock";
import { FlashcardDeck } from "./FlashcardDeck";
import {
  FileText,
  Zap,
  Layers,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";

type Tab = "notes" | "formulas" | "flashcards";

interface Props {
  topic: Topic;
  unitColor: string;
}

const tabColors: Record<string, string> = {
  blue: "text-blue-400 border-blue-500",
  purple: "text-purple-400 border-purple-500",
  green: "text-emerald-400 border-emerald-500",
  orange: "text-orange-400 border-orange-500",
  red: "text-rose-400 border-rose-500",
};

const accentBg: Record<string, string> = {
  blue: "bg-blue-500/10",
  purple: "bg-purple-500/10",
  green: "bg-emerald-500/10",
  orange: "bg-orange-500/10",
  red: "bg-rose-500/10",
};

export function TopicView({ topic, unitColor }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("notes");
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const colorClass = tabColors[unitColor] || tabColors.blue;
  const bgClass = accentBg[unitColor] || accentBg.blue;

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "notes", label: "Study Notes", icon: FileText },
    { id: "formulas", label: "Formulas", icon: Zap, count: topic.formulas.length },
    { id: "flashcards", label: "Flashcards", icon: Layers, count: topic.flashcards.length },
  ];

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className={clsx("rounded-xl p-5 border border-neutral-800", bgClass)}>
        <div className="flex items-start gap-3">
          <Star size={16} className={clsx("mt-0.5 flex-shrink-0", colorClass.split(" ")[0])} />
          <div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
              Summary
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">{topic.summary}</p>
          </div>
        </div>
      </div>

      {/* Key concepts */}
      <div className="rounded-xl border border-neutral-800 overflow-hidden">
        <div className="px-5 py-3 bg-neutral-900/50 border-b border-neutral-800 flex items-center gap-2">
          <CheckCircle2 size={14} className={colorClass.split(" ")[0]} />
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-widest">
            Key Concepts
          </span>
          <span className="ml-auto text-xs text-neutral-600">
            {topic.keyConcepts.length} items
          </span>
        </div>
        <div className="p-4 grid gap-2">
          {topic.keyConcepts.map((concept, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition-colors group"
            >
              <span
                className={clsx(
                  "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5",
                  bgClass,
                  colorClass.split(" ")[0]
                )}
              >
                {i + 1}
              </span>
              <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
                {concept}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-neutral-800 overflow-hidden">
        <div className="flex border-b border-neutral-800 bg-neutral-900/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center gap-2 px-5 py-3 text-xs font-medium transition-all border-b-2 -mb-px",
                  active
                    ? `${colorClass} bg-neutral-900/50`
                    : "text-neutral-600 border-transparent hover:text-neutral-400"
                )}
              >
                <Icon size={13} />
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={clsx(
                      "px-1.5 py-0.5 rounded text-[10px]",
                      active ? bgClass : "bg-neutral-800"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          {/* Notes tab */}
          {activeTab === "notes" && (
            <div className="space-y-2">
              {topic.notes.map((note, i) => {
                const expanded = expandedNotes.has(i);
                const isLong = note.length > 120;
                return (
                  <div
                    key={i}
                    className="rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700/50 transition-colors"
                  >
                    <div
                      className={clsx(
                        "flex items-start gap-3 p-4",
                        isLong && "cursor-pointer"
                      )}
                      onClick={() =>
                        isLong &&
                        setExpandedNotes((prev) => {
                          const next = new Set(prev);
                          next.has(i) ? next.delete(i) : next.add(i);
                          return next;
                        })
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />
                      <p
                        className={clsx(
                          "text-sm text-neutral-400 leading-relaxed flex-1",
                          isLong && !expanded && "line-clamp-2"
                        )}
                      >
                        {note}
                      </p>
                      {isLong && (
                        <span className="flex-shrink-0 text-neutral-600">
                          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Formulas tab */}
          {activeTab === "formulas" && (
            <div>
              {topic.formulas.length === 0 ? (
                <div className="text-center py-8 text-neutral-600 text-sm">
                  No formulas for this topic.
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {topic.formulas.map((formula, i) => (
                    <FormulaBlock key={i} formula={formula} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Flashcards tab */}
          {activeTab === "flashcards" && (
            <FlashcardDeck flashcards={topic.flashcards} />
          )}
        </div>
      </div>
    </div>
  );
}
