export default function Tag({ children }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}
