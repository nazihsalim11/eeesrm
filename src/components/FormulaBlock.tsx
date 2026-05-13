"use client";

import { useEffect, useRef, useState } from "react";
import type { Formula } from "@/types";
import { Copy, Check } from "lucide-react";

interface Props {
  formula: Formula;
}

export function FormulaBlock({ formula }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const renderKatex = async () => {
      if (!containerRef.current) return;
      try {
        const katex = await import("katex");
        containerRef.current.innerHTML = katex.default.renderToString(
          formula.latex,
          {
            throwOnError: false,
            displayMode: true,
            output: "html",
          }
        );
      } catch {
        if (containerRef.current) {
          containerRef.current.textContent = formula.latex;
        }
      }
    };
    renderKatex();
  }, [formula.latex]);

  const copy = () => {
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-xl bg-neutral-900/80 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/50 border-b border-neutral-800">
        <span className="text-xs font-medium text-neutral-300">{formula.label}</span>
        <button
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-neutral-300"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
        </button>
      </div>
      <div className="px-4 py-4 overflow-x-auto">
        <div ref={containerRef} className="formula-display text-neutral-100" />
      </div>
      {formula.description && (
        <div className="px-4 pb-3 text-[11px] text-neutral-600">
          {formula.description}
        </div>
      )}
    </div>
  );
}
