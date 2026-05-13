import Link from "next/link";
import { subject } from "@/data";
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
} from "lucide-react";

const unitIcons = [BookOpen, Zap, Cpu, Radio, Activity];

const unitGradients: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
  purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
  green: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
  orange: "from-orange-500/20 to-orange-600/5 border-orange-500/20",
  red: "from-rose-500/20 to-rose-600/5 border-rose-500/20",
};

const unitIconColors: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
  red: "text-rose-400",
};

export default function HomePage() {
  const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
  const totalFormulas = subject.units.reduce(
    (acc, u) => acc + u.topics.reduce((a, t) => a + t.formulas.length, 0),
    0
  );
  const totalFlashcards = subject.units.reduce(
    (acc, u) => acc + u.topics.reduce((a, t) => a + t.flashcards.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-purple-950/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            {subject.code} · SRM Institute
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {subject.title}
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mb-8 leading-relaxed">
            Structured study notes, formulas with LaTeX rendering, and active recall flashcards —
            organized by unit and topic for efficient exam preparation.
          </p>
          <div className="max-w-xl">
            <SearchBar />
          </div>
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: BookOpen, label: "Units", value: subject.units.length },
              { icon: FileText, label: "Topics", value: totalTopics },
              { icon: Zap, label: "Formulas", value: `${totalFormulas}+` },
              { icon: Layers, label: "Flashcards", value: `${totalFlashcards}+` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-neutral-500" />
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-6">
          Study Units
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.units.map((unit, idx) => {
            const Icon = unitIcons[idx];
            const gradient = unitGradients[unit.color] || unitGradients.blue;
            const iconColor = unitIconColors[unit.color] || unitIconColors.blue;
            const formulaCount = unit.topics.reduce((a, t) => a + t.formulas.length, 0);
            const flashcardCount = unit.topics.reduce((a, t) => a + t.flashcards.length, 0);

            return (
              <Link
                key={unit.id}
                href={`/unit/${unit.id}`}
                className={`group relative rounded-2xl border bg-gradient-to-br ${gradient} p-5 hover:scale-[1.01] transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900/80 flex items-center justify-center">
                    <Icon size={18} className={iconColor} />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <div className="mb-1">
                  <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-widest">
                    Unit {idx + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-200 text-sm leading-snug mb-2 group-hover:text-white transition-colors">
                  {unit.title}
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                  {unit.description}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                  <span className="flex items-center gap-1">
                    <FileText size={10} />
                    {unit.topics.length} topics
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={10} />
                    {formulaCount} formulas
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers size={10} />
                    {flashcardCount} cards
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {unit.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic.id}
                      className="px-2 py-0.5 rounded-full bg-neutral-900/60 text-neutral-600 text-[9px]"
                    >
                      {topic.title.length > 22 ? topic.title.slice(0, 20) + "…" : topic.title}
                    </span>
                  ))}
                  {unit.topics.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-900/60 text-neutral-600 text-[9px]">
                      +{unit.topics.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Access */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Quick Start Topics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {subject.units.map((u, idx) => {
              const firstTopic = u.topics[0];
              return (
                <Link
                  key={`${u.id}-${firstTopic.id}`}
                  href={`/unit/${u.id}/${firstTopic.id}`}
                  className="p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 transition-all group"
                >
                  <div className={`text-[10px] font-medium ${unitIconColors[u.color]} mb-1`}>
                    Unit {idx + 1}
                  </div>
                  <div className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug line-clamp-2">
                    {firstTopic.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
