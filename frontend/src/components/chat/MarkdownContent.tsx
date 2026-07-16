import { Fragment, ReactNode } from "react";

interface Props {
  content: string;
}

const inlinePattern =
  /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;

const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  Array.from(text.matchAll(inlinePattern)).forEach((result) => {
    const match = result[0];
    const offset = result.index ?? 0;

    if (offset > cursor) {
      nodes.push(text.slice(cursor, offset));
    }

    if (match.startsWith("**")) {
      nodes.push(
        <strong key={`${match}-${offset}`}>
          {match.slice(2, -2)}
        </strong>
      );
    } else if (match.startsWith("`")) {
      nodes.push(
        <code
          key={`${match}-${offset}`}
          className="rounded bg-zinc-950 px-1.5 py-0.5 text-[0.85em] text-cyan-200"
        >
          {match.slice(1, -1)}
        </code>
      );
    } else {
      const linkMatch = match.match(
        /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/
      );

      if (linkMatch) {
        nodes.push(
          <a
            key={`${match}-${offset}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-4"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    cursor = offset + match.length;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
};

const MarkdownContent = ({ content }: Props) => {
  const blocks = content.split(/```/g);

  return (
    <div className="space-y-3 text-sm leading-7 text-zinc-100 sm:text-[15px]">
      {blocks.map((block, blockIndex) => {
        if (blockIndex % 2 === 1) {
          return (
            <pre
              key={blockIndex}
              className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs leading-6 text-zinc-200"
            >
              <code>{block.trim()}</code>
            </pre>
          );
        }

        const lines = block.split("\n");
        const elements: ReactNode[] = [];
        let index = 0;

        while (index < lines.length) {
          const line = lines[index].trim();

          if (!line) {
            index += 1;
            continue;
          }

          if (line.startsWith("### ")) {
            elements.push(
              <h3
                key={`${blockIndex}-${index}`}
                className="pt-1 text-base font-semibold text-white"
              >
                {renderInline(line.slice(4))}
              </h3>
            );
            index += 1;
            continue;
          }

          if (line.startsWith("## ")) {
            elements.push(
              <h2
                key={`${blockIndex}-${index}`}
                className="pt-1 text-lg font-semibold text-white"
              >
                {renderInline(line.slice(3))}
              </h2>
            );
            index += 1;
            continue;
          }

          if (line.startsWith("# ")) {
            elements.push(
              <h1
                key={`${blockIndex}-${index}`}
                className="pt-1 text-xl font-semibold text-white"
              >
                {renderInline(line.slice(2))}
              </h1>
            );
            index += 1;
            continue;
          }

          if (/^[-*]\s+/.test(line)) {
            const items: string[] = [];

            while (
              index < lines.length &&
              /^[-*]\s+/.test(lines[index].trim())
            ) {
              items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
              index += 1;
            }

            elements.push(
              <ul
                key={`${blockIndex}-${index}-ul`}
                className="list-disc space-y-1 pl-5"
              >
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ul>
            );
            continue;
          }

          if (/^\d+\.\s+/.test(line)) {
            const items: string[] = [];

            while (
              index < lines.length &&
              /^\d+\.\s+/.test(lines[index].trim())
            ) {
              items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
              index += 1;
            }

            elements.push(
              <ol
                key={`${blockIndex}-${index}-ol`}
                className="list-decimal space-y-1 pl-5"
              >
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ol>
            );
            continue;
          }

          elements.push(
            <p key={`${blockIndex}-${index}`}>
              {renderInline(line)}
            </p>
          );
          index += 1;
        }

        return (
          <Fragment key={blockIndex}>
            {elements}
          </Fragment>
        );
      })}
    </div>
  );
};

export default MarkdownContent;
