"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { subject } from "@/data";
import { useTheme } from "./ThemeProvider";
import {
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Zap,
  Cpu,
  Settings,
  Radio,
  Activity,
  Menu,
  X,
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

const unitBg: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20",
  purple: "bg-purple-500/10 border-purple-500/20",
  green: "bg-emerald-500/10 border-emerald-500/20",
  orange: "bg-orange-500/10 border-orange-500/20",
  red: "bg-rose-500/10 border-rose-500/20",
};

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [openUnits, setOpenUnits] = useState<Set<string>>(new Set(["unit-1"]));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleUnit = (id: string) => {
    setOpenUnits((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">EEE</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-neutral-100 dark:text-neutral-100 group-hover:text-white transition-colors">
              BEEE Notes
            </div>
            <div className="text-[10px] text-neutral-500">21EES101T · SRM</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {subject.units.map((unit, idx) => {
          const Icon = unitIcons[idx];
          const isOpen = openUnits.has(unit.id);
          const colorClass = unitColors[unit.color] || "text-blue-400";
          const bgClass = unitBg[unit.color] || "bg-blue-500/10 border-blue-500/20";

          return (
            <div key={unit.id}>
              <button
                onClick={() => toggleUnit(unit.id)}
                className={clsx(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all group",
                  isOpen
                    ? `${bgClass} border`
                    : "hover:bg-neutral-800/50 dark:hover:bg-neutral-800/50"
                )}
              >
                <Icon size={15} className={colorClass} />
                <span className="flex-1 text-xs font-medium text-neutral-300 dark:text-neutral-300 group-hover:text-white transition-colors leading-tight">
                  {unit.title}
                </span>
                {isOpen ? (
                  <ChevronDown size={12} className="text-neutral-500 flex-shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-neutral-500 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="mt-1 ml-4 pl-3 border-l border-neutral-800 space-y-0.5">
                  {unit.topics.map((topic) => {
                    const href = `/unit/${unit.id}/${topic.id}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={topic.id}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          "block px-2 py-1.5 rounded text-[11px] leading-snug transition-all",
                          active
                            ? `${colorClass} bg-neutral-800 font-medium`
                            : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
                        )}
                      >
                        {topic.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-neutral-800 flex items-center justify-between">
        <span className="text-[10px] text-neutral-600">5 Units · 35+ Topics</span>
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center transition-colors text-neutral-400 hover:text-white"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col bg-neutral-950 dark:bg-neutral-950 border-r border-neutral-800 h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-neutral-950/95 backdrop-blur border-b border-neutral-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">EEE</span>
          </div>
          <span className="text-sm font-semibold text-neutral-100">BEEE Notes</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={clsx(
          "lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-neutral-950 border-r border-neutral-800 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
