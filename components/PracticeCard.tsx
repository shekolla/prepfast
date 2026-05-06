"use client";

import { useState } from "react";
import type { PracticeQuestion } from "@/content/types";

export default function PracticeCard({ item }: { item: PracticeQuestion }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <p className="text-gray-300 text-sm font-medium">{item.question}</p>
      <pre className="bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm text-green-300 font-mono overflow-x-auto whitespace-pre-wrap">
        {item.code}
      </pre>
      <button
        onClick={() => setRevealed((v) => !v)}
        className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded"
      >
        {revealed ? "Hide Answer" : "Show Answer"}
      </button>
      {revealed && (
        <div className="bg-gray-800 rounded-lg p-4">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{item.answer}</pre>
        </div>
      )}
    </div>
  );
}
