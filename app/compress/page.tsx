import CompressClient from "./CompressClient";

export const metadata = {
  title: "Compression Mode — Store Python in 2 KB | InterviewPrep",
  description:
    "What if you only had a few KB of memory to remember Python, System Design, or Databases? Compression Mode shows the bare-minimum anchors that let you re-derive the rest. Three tiers: Seed (~1 KB), Cheatsheet (~3 KB), Full Recall (~10 KB).",
};

export default function CompressPage() {
  return <CompressClient />;
}
