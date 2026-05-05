export default function CodeBlock({ title, code }) {
  return (
    <div className="glass-panel overflow-hidden rounded-lg text-sm shadow-glow">
      <div className="bg-theme-code-header border-theme-line flex items-center gap-2 border-b px-4 py-2 font-mono text-xs text-faint">
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="ml-2">{title}</span>
      </div>
      <pre className="bg-theme-code overflow-x-auto p-4 text-secondary">
        <code className="font-mono text-xs leading-6 sm:text-sm">{code}</code>
      </pre>
    </div>
  );
}
