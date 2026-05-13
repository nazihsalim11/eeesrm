import Fuse from "fuse.js";
import { subject } from "@/data";
import type { Topic, Unit } from "@/types";

export type SearchResult = {
  type: "topic" | "formula" | "flashcard" | "concept";
  unitId: string;
  unitTitle: string;
  topicId: string;
  topicTitle: string;
  text: string;
  highlight?: string;
};

function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      items.push({
        type: "topic",
        unitId: unit.id,
        unitTitle: unit.title,
        topicId: topic.id,
        topicTitle: topic.title,
        text: topic.title,
        highlight: topic.summary,
      });

      for (const concept of topic.keyConcepts) {
        items.push({
          type: "concept",
          unitId: unit.id,
          unitTitle: unit.title,
          topicId: topic.id,
          topicTitle: topic.title,
          text: concept,
        });
      }

      for (const formula of topic.formulas) {
        items.push({
          type: "formula",
          unitId: unit.id,
          unitTitle: unit.title,
          topicId: topic.id,
          topicTitle: topic.title,
          text: formula.label + " " + (formula.description || ""),
        });
      }

      for (const card of topic.flashcards) {
        items.push({
          type: "flashcard",
          unitId: unit.id,
          unitTitle: unit.title,
          topicId: topic.id,
          topicTitle: topic.title,
          text: card.question,
          highlight: card.answer,
        });
      }
    }
  }

  return items;
}

const searchIndex = buildSearchIndex();

const fuse = new Fuse(searchIndex, {
  keys: ["text", "topicTitle", "unitTitle"],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item);
}
