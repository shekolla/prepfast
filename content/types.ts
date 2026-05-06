// Shared types used across all topic data files and components

export type DepthLevel = "basic" | "expected" | "deep";

export interface LastHourSummary {
  /** 5–7 most important things to know — scannable bullets */
  keyTakeaways: string[];
  /** Compact one-liners for the highest-signal concepts */
  mustKnowConcepts: { name: string; oneLiner: string }[];
  /** Critical traps / misconceptions that trip people up in interviews */
  topTraps: string[];
}

export interface Concept {
  id: string;
  title: string;
  category: string;
  basic: string;
  expected: string;
  deep: string;
  interviewAnswer: string;
  trap: string;
  memoryAnchor?: string;
}

export interface CategoryMeta {
  id: string;
  label: string;
  description: string;
}

export interface TreeNode {
  id: string;
  label: string;
  nodeType: "category" | "concept";
  conceptId?: string;
  relatedIds?: string[];
  importance: "critical" | "high" | "medium";
  children?: TreeNode[];
}

export interface MentalModel {
  whatItIs: string;
  whyItExists: string;
  whenToUse: string[];
  whereItFails: string[];
}

export interface InterviewPattern {
  question: string;
  answer: string;
  whyAsked: string;
  trap: string;
}

export interface CommonMistake {
  wrong: string;
  correct: string;
}

export interface PracticeQuestion {
  code: string;
  question: string;
  answer: string;
}

export interface TopicData {
  topicTitle: string;
  topicMeta: string;
  lastUpdated: string; // ISO date string, e.g. "2026-04-10"
  lastHourConceptIds: string[];
  lastHourSummary: LastHourSummary;
  mentalModel: MentalModel;
  categories: CategoryMeta[];
  mentalModelTree: TreeNode;
  concepts: Concept[];
  interviewPatterns: InterviewPattern[];
  commonMistakes: CommonMistake[];
  practiceQuestions: PracticeQuestion[];
}
