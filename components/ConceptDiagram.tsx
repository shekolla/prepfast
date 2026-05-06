"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

interface Props {
  source: string;
  caption?: string;
}

/**
 * Client-only Mermaid renderer. Lazy-imports `mermaid` so the ~400KB chunk
 * only ships on pages that actually contain a diagram.
 *
 * Static export friendly: renders to inline SVG after hydration via
 * DOMParser (no innerHTML). Mermaid runs with securityLevel: "strict"
 * which sanitizes labels; source itself comes from our own data files.
 */
export default function ConceptDiagram({ source, caption }: Props) {
  const id = useId().replace(/:/g, "_");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          themeVariables: {
            background: "transparent",
            primaryColor: "#1f2937",
            primaryTextColor: "#e5e7eb",
            primaryBorderColor: "#4b5563",
            lineColor: "#9ca3af",
            secondaryColor: "#312e81",
            tertiaryColor: "#1e1b4b",
            clusterBkg: "#111827",
            clusterBorder: "#374151",
          },
        });
        const { svg } = await mermaid.render(`mmd-${id}`, source);
        if (cancelled || !containerRef.current) return;

        // text/html parsing is more lenient than image/svg+xml — tolerates
        // HTML <br>, unescaped entities, and the foreignObject contents
        // Mermaid emits for multi-line node labels.
        const parsed = new DOMParser().parseFromString(svg, "text/html");
        const svgEl = parsed.body.querySelector("svg");
        if (!svgEl) {
          throw new Error("Diagram missing <svg> root");
        }
        containerRef.current.replaceChildren(svgEl);
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        const detail = e instanceof Error ? e.message : String(e);
        // eslint-disable-next-line no-console
        console.error("[ConceptDiagram]", detail);
        setError(detail);
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, source]);

  return (
    <figure
      className="my-4 rounded-xl border border-gray-800 bg-gray-950/60 p-4 overflow-hidden"
      aria-label={caption ?? "Diagram"}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
          Diagram
        </span>
      </div>
      {status === "loading" && (
        <div className="h-32 grid place-items-center text-gray-500 text-xs">
          Rendering diagram…
        </div>
      )}
      {status === "error" && (
        <pre className="text-xs text-red-300 whitespace-pre-wrap break-words">
          {error ?? "Failed to render diagram."}
        </pre>
      )}
      <div
        ref={containerRef}
        className={`mermaid-host w-full overflow-x-auto [&_svg]:!max-w-full [&_svg]:!h-auto ${
          status === "ready" ? "" : "hidden"
        }`}
      />
      {caption && status === "ready" && (
        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
