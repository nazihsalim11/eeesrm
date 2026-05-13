import { notFound } from "next/navigation";
import Link from "next/link";
import { subject } from "@/data";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import { TopicView } from "@/components/TopicView";
import {
  BookOpen,
  Zap,
  Cpu,
  Radio,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const unitIcons = [BookOpen, Zap, Cpu, Radio, Activity];

const unitColors: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
  red: "text-rose-400",
};

export function generateStaticParams() {
  return subject.units.flatMap((unit) =>
    unit.topics.map((topic) => ({ unitId: unit.id, topicId: topic.id }))
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ unitId: string; topicId: string }>;
}) {
  const { unitId, topicId } = await params;
  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const unit = subject.units[unitIndex];
  if (!unit) notFound();

  const topicIndex = unit.topics.findIndex((t) => t.id === topicId);
  const topic = unit.topics[topicIndex];
  if (!topic) notFound();

  const Icon = unitIcons[unitIndex] || BookOpen;
  const colorClass = unitColors[unit.color] || unitColors.blue;

  const prevTopic = topicIndex > 0 ? unit.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < unit.topics.length - 1 ? unit.topics[topicIndex + 1] : null;
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  return (
    <div className="flex min-h-screen bg-neutral-950">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 lg:top-0 mt-14 lg:mt-0 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-4">
          <Link
            href={`/unit/${unit.id}`}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors text-xs flex-shrink-0"
          >
            <ChevronLeft size={13} />
            <span className="hidden sm:inline">{unit.title}</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="text-neutral-800 hidden sm:inline">/</span>
          <span className={`text-xs font-medium ${colorClass} truncate hidden sm:block`}>
            {topic.title}
          </span>
          <div className="ml-auto">
            <SearchBar />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto lg:mx-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-[11px] text-neutral-600">
            <Link href="/" className="hover:text-neutral-400 transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/unit/${unit.id}`} className={`${colorClass} hover:opacity-80 transition-opacity flex items-center gap-1`}>
              <Icon size={10} />
              Unit {unitIndex + 1}
            </Link>
            <span>›</span>
            <span className="text-neutral-500 truncate">{topic.title}</span>
          </div>

          {/* Topic position */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-neutral-700">
              Topic {topicIndex + 1} of {unit.topics.length}
            </span>
            <div className="flex-1 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={clsx("h-full rounded-full transition-all", {
                  "bg-blue-500": unit.color === "blue",
                  "bg-purple-500": unit.color === "purple",
                  "bg-emerald-500": unit.color === "green",
                  "bg-orange-500": unit.color === "orange",
                  "bg-rose-500": unit.color === "red",
                })}
                style={{ width: `${((topicIndex + 1) / unit.topics.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-tight animate-fade-up">
            {topic.title}
          </h1>

          {/* Topic content */}
          <div className="animate-fade-up">
            <TopicView topic={topic} unitColor={unit.color} />
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-neutral-800 grid grid-cols-2 gap-3">
            <div>
              {prevTopic ? (
                <Link
                  href={`/unit/${unit.id}/${prevTopic.id}`}
                  className="flex flex-col gap-1 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 hover:bg-neutral-900 transition-all group"
                >
                  <span className="text-[10px] text-neutral-600 flex items-center gap-1">
                    <ChevronLeft size={10} /> Previous
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors line-clamp-1">
                    {prevTopic.title}
                  </span>
                </Link>
              ) : prevUnit ? (
                <Link
                  href={`/unit/${prevUnit.id}`}
                  className="flex flex-col gap-1 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 hover:bg-neutral-900 transition-all group"
                >
                  <span className="text-[10px] text-neutral-600 flex items-center gap-1">
                    <ChevronLeft size={10} /> Previous Unit
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors line-clamp-1">
                    {prevUnit.title}
                  </span>
                </Link>
              ) : null}
            </div>
            <div>
              {nextTopic ? (
                <Link
                  href={`/unit/${unit.id}/${nextTopic.id}`}
                  className="flex flex-col gap-1 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 hover:bg-neutral-900 transition-all group text-right"
                >
                  <span className="text-[10px] text-neutral-600 flex items-center justify-end gap-1">
                    Next <ChevronRight size={10} />
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors line-clamp-1">
                    {nextTopic.title}
                  </span>
                </Link>
              ) : nextUnit ? (
                <Link
                  href={`/unit/${nextUnit.id}`}
                  className="flex flex-col gap-1 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 hover:bg-neutral-900 transition-all group text-right"
                >
                  <span className="text-[10px] text-neutral-600 flex items-center justify-end gap-1">
                    Next Unit <ChevronRight size={10} />
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors line-clamp-1">
                    {nextUnit.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
