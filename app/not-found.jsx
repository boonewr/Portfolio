import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-white">Project not found</h1>
        <p className="text-zinc-400">The requested project page does not exist.</p>
        <Link href="/" className="focus-ring inline-flex rounded-md text-sm font-medium text-blue-300 hover:text-blue-200">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
