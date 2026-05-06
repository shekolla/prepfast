import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-700 mb-4">404</div>
        <h1 className="text-xl font-semibold text-white mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The topic you&apos;re looking for doesn&apos;t exist yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2"
        >
          ← Back to all topics
        </Link>
      </div>
    </div>
  );
}
