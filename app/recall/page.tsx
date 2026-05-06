import RecallClient from "./RecallClient";

export const metadata = {
  title: "Active Recall — Flashcards with Spaced Repetition | InterviewPrep",
  description:
    "Test whether you actually remember what you read. Flashcards auto-generated from every concept — memory anchors, titles, and traps. Spaced-repetition scheduler (SM-2) runs entirely in localStorage. Zero backend, zero signup.",
};

export default function RecallPage() {
  return <RecallClient />;
}
