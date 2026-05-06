"use client";

/**
 * Hand-drawn Canvas share card — 1200×630 (Twitter/OG ratio).
 * Editorial minimalist: dark bg, indigo accent bar, headline + 3-4 content lines,
 * branded footer. Zero external deps.
 */

const W = 1200;
const H = 630;

// Colors pulled from the dark-theme palette used across the app.
const BG = "#0b0f19";
const FG = "#e5e7eb";
const MUTED = "#94a3b8";
const ACCENT = "#818cf8"; // indigo-400
const ACCENT_DIM = "#4f46e5"; // indigo-600
const RULE = "#1f2937"; // gray-800
const A_COLOR = "#818cf8"; // indigo
const B_COLOR = "#f472b6"; // pink

export type ShareCardConfig =
  | {
      kind: "compress";
      topicTitle: string;
      sizeKB: number;
      tierLabel: string;
      anchors: { title: string; text: string }[]; // up to 4 shown
      shareUrl: string;
    }
  | {
      kind: "compare";
      a: { title: string; topic: string; anchor: string };
      b: { title: string; topic: string; anchor: string };
      shareUrl: string;
    };

/** Wrap text across multiple lines, honoring word boundaries. Returns lines drawn count. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): number {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const trimmed = lines.slice(0, maxLines);
  // If original had more content than we rendered, append ellipsis to last line
  const joined = trimmed.join(" ");
  if (joined.length < text.length && trimmed.length > 0) {
    const last = trimmed[trimmed.length - 1];
    let truncated = last;
    while (ctx.measureText(truncated + " …").width > maxWidth && truncated.length > 0) {
      truncated = truncated.slice(0, -1);
    }
    trimmed[trimmed.length - 1] = truncated.trimEnd() + " …";
  }
  trimmed.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return trimmed.length;
}

function drawCommonChrome(ctx: CanvasRenderingContext2D) {
  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // Top accent bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, ACCENT_DIM);
  grad.addColorStop(1, "#ec4899");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 6);

  // Brand mark top-left
  ctx.fillStyle = ACCENT;
  ctx.font = "600 22px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("prepfast.in", 56, 40);

  // Platform tag top-right
  ctx.fillStyle = MUTED;
  ctx.font = "400 16px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("Interview revision · free & open source", W - 56, 44);
  ctx.textAlign = "left";
}

function drawCompressCard(
  ctx: CanvasRenderingContext2D,
  cfg: Extract<ShareCardConfig, { kind: "compress" }>
) {
  drawCommonChrome(ctx);

  // Eyebrow
  ctx.fillStyle = MUTED;
  ctx.font = "600 18px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.fillText(`${cfg.topicTitle.toUpperCase()} · ${cfg.tierLabel.toUpperCase()}`, 56, 110);

  // Headline
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 72px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  const headline = `I fit ${cfg.topicTitle} in ${cfg.sizeKB.toFixed(2)} KB`;
  ctx.fillText(headline, 56, 148);

  // Divider
  ctx.fillStyle = RULE;
  ctx.fillRect(56, 250, W - 112, 1);

  // Anchors — 3-4 lines
  ctx.fillStyle = FG;
  ctx.font = "500 22px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  let y = 280;
  const maxItems = Math.min(cfg.anchors.length, 3);
  for (let i = 0; i < maxItems; i++) {
    const a = cfg.anchors[i];
    // bullet
    ctx.fillStyle = ACCENT;
    ctx.fillText("■ ", 56, y);
    const bulletW = ctx.measureText("■ ").width;
    // title
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 22px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    ctx.fillText(a.title, 56 + bulletW, y);
    const titleW = ctx.measureText(a.title).width;
    // separator + body wrap
    ctx.fillStyle = MUTED;
    ctx.font = "400 22px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    const bodyX = 56 + bulletW + titleW + 16;
    const bodyMax = W - 112 - (bodyX - 56);
    const bodyLines = wrapText(ctx, a.text, bodyX, y, bodyMax, 30, 2);
    y += Math.max(1, bodyLines) * 34 + 14;
    if (y > H - 140) break;
  }

  // Footer: tagline + URL
  ctx.fillStyle = RULE;
  ctx.fillRect(56, H - 96, W - 112, 1);
  ctx.fillStyle = MUTED;
  ctx.font = "500 20px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.fillText("Store the anchors. Re-derive the rest.", 56, H - 72);
  ctx.textAlign = "right";
  ctx.fillStyle = ACCENT;
  ctx.fillText(cfg.shareUrl, W - 56, H - 72);
  ctx.textAlign = "left";
}

function drawCompareCard(
  ctx: CanvasRenderingContext2D,
  cfg: Extract<ShareCardConfig, { kind: "compare" }>
) {
  drawCommonChrome(ctx);

  // Eyebrow
  ctx.fillStyle = MUTED;
  ctx.font = "600 18px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.fillText("COMPARE · SIDE BY SIDE", 56, 110);

  // Headline with VS
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 56px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  const vs = " vs ";
  const vsW = ctx.measureText(vs).width;
  // Measure both titles, truncate if needed
  const maxHeadWidth = W - 112;
  const titleA = cfg.a.title;
  const titleB = cfg.b.title;
  const aW = ctx.measureText(titleA).width;
  const bW = ctx.measureText(titleB).width;
  const total = aW + vsW + bW;

  if (total <= maxHeadWidth) {
    ctx.fillStyle = A_COLOR;
    ctx.fillText(titleA, 56, 148);
    ctx.fillStyle = MUTED;
    ctx.fillText(vs, 56 + aW, 148);
    ctx.fillStyle = B_COLOR;
    ctx.fillText(titleB, 56 + aW + vsW, 148);
  } else {
    // Stack on two lines
    ctx.fillStyle = A_COLOR;
    ctx.fillText(titleA, 56, 148);
    ctx.fillStyle = MUTED;
    ctx.font = "600 28px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    ctx.fillText("vs", 56, 210);
    ctx.fillStyle = B_COLOR;
    ctx.font = "700 56px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    ctx.fillText(titleB, 56, 246);
  }

  // Two-column body
  const colY = total <= maxHeadWidth ? 260 : 340;
  const colW = (W - 112 - 40) / 2;

  const drawCol = (x: number, color: string, topic: string, anchor: string) => {
    // Color accent bar
    ctx.fillStyle = color;
    ctx.fillRect(x, colY, 4, 140);
    // Topic eyebrow
    ctx.fillStyle = MUTED;
    ctx.font = "600 14px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    ctx.fillText(topic.toUpperCase(), x + 20, colY + 6);
    // Anchor body
    ctx.fillStyle = FG;
    ctx.font = "500 20px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
    wrapText(ctx, anchor, x + 20, colY + 36, colW - 24, 28, 5);
  };

  drawCol(56, A_COLOR, cfg.a.topic, cfg.a.anchor);
  drawCol(56 + colW + 40, B_COLOR, cfg.b.topic, cfg.b.anchor);

  // Footer
  ctx.fillStyle = RULE;
  ctx.fillRect(56, H - 96, W - 112, 1);
  ctx.fillStyle = MUTED;
  ctx.font = "500 20px ui-sans-serif, -apple-system, system-ui, 'Segoe UI', sans-serif";
  ctx.fillText("Memory anchors, side by side.", 56, H - 72);
  ctx.textAlign = "right";
  ctx.fillStyle = ACCENT;
  ctx.fillText(cfg.shareUrl, W - 56, H - 72);
  ctx.textAlign = "left";
}

export async function generateSharePng(cfg: ShareCardConfig): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  if (cfg.kind === "compress") drawCompressCard(ctx, cfg);
  else drawCompareCard(ctx, cfg);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob returned null"))),
      "image/png",
      0.95
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Returns true if the file was shared natively (mobile Web Share API). */
export async function tryNativeShare(blob: Blob, filename: string, text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !("share" in navigator)) return false;
  try {
    const file = new File([blob], filename, { type: "image/png" });
    const data = { files: [file], text } as ShareData;
    // Some browsers expose canShare; guard for it.
    type NavWithCanShare = Navigator & { canShare?: (d: ShareData) => boolean };
    const nav = navigator as NavWithCanShare;
    if (typeof nav.canShare === "function" && !nav.canShare(data)) return false;
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}

export function buildTweetUrl(text: string, url: string): string {
  const qs = new URLSearchParams({ text, url });
  return `https://twitter.com/intent/tweet?${qs.toString()}`;
}
