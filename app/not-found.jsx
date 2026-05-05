import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-primary">Project not found</h1>
        <p className="text-secondary">The requested project page does not exist.</p>
        <Link href="/" className="focus-ring inline-flex rounded-md text-sm font-medium text-accent hover:text-accent-strong">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
