export default function Tag({ children }) {
  return (
    <span className="theme-tag rounded-md border px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
