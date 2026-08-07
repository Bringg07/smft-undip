import React from "react";

/**
 * Renderer Markdown ringan (tanpa dependency eksternal).
 * Mendukung: **bold**, *italic*, `code`, [link](url),
 * heading (##, ###), list (- / *), kutipan (>), dan paragraf.
 *
 * Aman: hasil di-render sebagai elemen React, BUKAN innerHTML,
 * sehingga teks dari pengguna tidak bisa mengeksekusi HTML/script.
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyPrefix}-b${key}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={`${keyPrefix}-i${key}`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-c${key}`}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-gold-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        nodes.push(
          <a
            key={`${keyPrefix}-a${key}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-gold-400 underline decoration-gold-400/40 underline-offset-4 transition-colors hover:text-gold-300"
          >
            {label}
          </a>
        );
      } else {
        nodes.push(token);
      }
    }

    lastIndex = match.index + token.length;
    key += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let blockKey = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    // Heading
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={blockKey} className="mt-6 font-heading text-xl text-white">
          {renderInline(line.slice(4).trim(), `h3-${blockKey}`)}
        </h3>
      );
      blockKey += 1;
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={blockKey} className="mt-7 font-heading text-2xl text-white">
          {renderInline(line.slice(3).trim(), `h2-${blockKey}`)}
        </h2>
      );
      blockKey += 1;
      i += 1;
      continue;
    }

    // Kutipan
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={blockKey}
          className="my-4 border-l-2 border-gold-400/60 bg-gold-400/5 px-5 py-3 text-white/80 italic"
        >
          {renderInline(line.slice(2).trim(), `q-${blockKey}`)}
        </blockquote>
      );
      blockKey += 1;
      i += 1;
      continue;
    }

    // List
    if (/^[-*•]\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i].trim())) {
        items.push(
          <li key={`li-${blockKey}-${i}`} className="flex gap-3">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span>{renderInline(lines[i].trim().slice(2), `li-${blockKey}-${i}`)}</span>
          </li>
        );
        i += 1;
      }
      blocks.push(
        <ul key={blockKey} className="my-4 space-y-2 text-white/75">
          {items}
        </ul>
      );
      blockKey += 1;
      continue;
    }

    // Paragraf biasa
    blocks.push(
      <p key={blockKey} className="font-body text-base leading-relaxed text-white/75 md:text-lg">
        {renderInline(line, `p-${blockKey}`)}
      </p>
    );
    blockKey += 1;
    i += 1;
  }

  return <div className="space-y-6">{blocks}</div>;
}
