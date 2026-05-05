const KEYWORDS = new Set([
  "and",
  "as",
  "async",
  "await",
  "catch",
  "class",
  "const",
  "default",
  "def",
  "else",
  "export",
  "false",
  "filter",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "let",
  "new",
  "not",
  "null",
  "or",
  "return",
  "true",
  "try",
  "undefined",
  "with",
]);

const BUILT_INS = new Set(["Date", "Math", "Promise", "React", "Set", "axios", "d3"]);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function token(className, value) {
  return `<span class="${className}">${escapeHtml(value)}</span>`;
}

function readString(line, start) {
  const quote = line[start];
  let index = start + 1;

  while (index < line.length) {
    if (line[index] === "\\" && index + 1 < line.length) {
      index += 2;
      continue;
    }
    if (line[index] === quote) {
      index += 1;
      break;
    }
    index += 1;
  }

  return index;
}

function highlightLine(line) {
  let index = 0;
  let output = "";

  while (index < line.length) {
    const rest = line.slice(index);
    const char = line[index];

    if (rest.startsWith("//") || rest.startsWith("#")) {
      output += token("code-token-comment", rest);
      break;
    }

    if (char === "'" || char === '"' || char === "`") {
      const end = readString(line, index);
      output += token("code-token-string", line.slice(index, end));
      index = end;
      continue;
    }

    if (/\d/.test(char)) {
      const match = rest.match(/^\d+(\.\d+)?/);
      output += token("code-token-number", match[0]);
      index += match[0].length;
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      const match = rest.match(/^[A-Za-z_$][\w$]*/);
      const word = match[0];
      const next = line.slice(index + word.length).trimStart()[0];
      const previous = line[index - 1];

      if (KEYWORDS.has(word)) {
        output += token("code-token-keyword", word);
      } else if (BUILT_INS.has(word)) {
        output += token("code-token-builtin", word);
      } else if (next === "(" && previous !== ".") {
        output += token("code-token-function", word);
      } else {
        output += escapeHtml(word);
      }

      index += word.length;
      continue;
    }

    if (/[{}()[\].,;:+\-*/%=<>!|&?]/.test(char)) {
      output += token("code-token-punctuation", char);
      index += 1;
      continue;
    }

    output += escapeHtml(char);
    index += 1;
  }

  return output || " ";
}

export default function CodeBlock({ title, code }) {
  const lines = code.split("\n");

  return (
    <div className="glass-panel overflow-hidden rounded-lg text-sm shadow-glow">
      <div className="bg-theme-code-header border-theme-line flex items-center gap-2 border-b px-4 py-2 font-mono text-xs text-faint">
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="h-2.5 w-2.5 rounded-full theme-node" />
        <span className="ml-2">{title}</span>
      </div>
      <pre className="bg-theme-code overflow-x-auto py-4 text-secondary">
        <code className="block font-mono text-xs leading-6 sm:text-sm">
          {lines.map((line, index) => (
            <span className="code-line" key={`${index}-${line}`}>
              <span className="code-line-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="code-line-content" dangerouslySetInnerHTML={{ __html: highlightLine(line) }} />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
