export interface Formula {
  label: string;
  latex: string;
  description?: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  keyConcepts: string[];
  notes: string[];
  formulas: Formula[];
  flashcards: Flashcard[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  units: Unit[];
}
