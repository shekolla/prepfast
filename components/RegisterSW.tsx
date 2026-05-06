"use client";

import { useEffect } from "react";

// Kill switch — flip to false to disable the service worker without a full revert.
const PWA_ENABLED = true;

export default function RegisterSW() {
  useEffect(() => {
    if (!PWA_ENABLED) return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Wait until after page load so the SW install doesn't compete with first paint.
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures are non-fatal — the site still works.
      });
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
