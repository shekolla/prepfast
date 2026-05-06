import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare Concepts Side-by-Side | InterviewPrep",
  description:
    "Compare any two interview concepts side-by-side — PostgreSQL vs MongoDB, Threading vs Multiprocessing, Promise.all vs allSettled. Aligned rows for anchor, basic, deep, interview answer, and trap. Deep-linkable.",
};

export default function ComparePage() {
  return <CompareClient />;
}
