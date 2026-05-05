export default function CodeBlock({ title, code }) {
  return (
    <div className="glass-panel overflow-hidden rounded-lg text-sm shadow-glow">
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-500">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2">{title}</span>
      </div>
      <pre className="overflow-x-auto bg-zinc-900/60 p-4 text-zinc-300">
        <code className="font-mono text-xs leading-6 sm:text-sm">{code}</code>
      </pre>
    </div>
  );
}
