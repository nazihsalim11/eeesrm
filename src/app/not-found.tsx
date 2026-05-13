import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-neutral-800 mb-4">404</div>
        <h1 className="text-xl font-semibold text-neutral-300 mb-2">Page not found</h1>
        <p className="text-neutral-600 text-sm mb-6">
          The topic or unit you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
