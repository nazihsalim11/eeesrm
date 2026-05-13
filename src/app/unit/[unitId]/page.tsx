import { notFound } from "next/navigation";
import Link from "next/link";
import { subject } from "@/data";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import {
  BookOpen,
  Zap,
  Cpu,
  Radio,
  Activity,
  ArrowRight,
  Layers,
  FileText,
  ChevronLeft,
} from "lucide-react";

const unitIcons = [BookOpen, Zap, Cpu, Radio, Activity];

const unitColors: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
  red: "text-rose-400",
};

const unitBorders: Record<string, string> = {
  blue: "border-blue-500/30",
  purple: "border-purple-500/30",
  green: "border-emerald-500/30",
  orange: "border-orange-500/30",
  red: "border-rose-500/30",
};

export function generateStaticParams() {
  return subject.units.map((unit) => ({ unitId: unit.id }));
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const unit = subject.units[unitIndex];
  if (!unit) notFound();

  const Icon = unitIcons[unitIndex] || BookOpen;
  const colorClass = unitColors[unit.color] || unitColors.blue;
  const borderClass = unitBorders[unit.color] || unitBorders.blue;

  return (
    <div className="flex min-h-screen bg-neutral-950">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 lg:top-0 mt-14 lg:mt-0 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm px-6 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors text-xs"
          >
            <ChevronLeft size={14} />
            Home
          </Link>
          <span className="text-neutral-800">/</span>
          <span className={`text-xs font-medium ${colorClass}`}>{unit.title}</span>
          <div className="ml-auto hidden sm:block">
            <SearchBar />
          </div>
        </div>

        {/* Header */}
        <div className="px-6 pt-8 pb-6 border-b border-neutral-800">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Icon size={18} className={colorClass} />
              </div>
              <span className="text-xs text-neutral-600 uppercase tracking-widest font-medium">
                Unit {unitIndex + 1} of {subject.units.length}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{unit.title}</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">{unit.description}</p>

            <div className="flex items-center gap-6 mt-4 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <FileText size={12} /> {unit.topics.length} topics
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={12} />
                {unit.topics.reduce((a, t) => a + t.formulas.length, 0)} formulas
              </span>
              <span className="flex items-center gap-1.5">
                <Layers size={12} />
                {unit.topics.reduce((a, t) => a + t.flashcards.length, 0)} flashcards
              </span>
            </div>
          </div>
        </div>

        {/* Topic list */}
        <div className="px-6 py-8 max-w-3xl">
          <div className="space-y-3">
            {unit.topics.map((topic, i) => (
              <Link
                key={topic.id}
                href={`/unit/${unit.id}/${topic.id}`}
                className={`group flex items-start gap-4 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 hover:bg-neutral-900 transition-all`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border ${borderClass} bg-neutral-900 flex items-center justify-center flex-shrink-0`}
                >
                  <span className={`text-xs font-bold ${colorClass}`}>{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {topic.summary}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-neutral-700">
                    <span>{topic.keyConcepts.length} concepts</span>
                    <span>{topic.formulas.length} formulas</span>
                    <span>{topic.flashcards.length} flashcards</span>
                  </div>
                </div>
                <ArrowRight
                  size={15}
                  className="text-neutral-700 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
