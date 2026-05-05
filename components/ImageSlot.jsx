"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { ImageIcon } from "@/components/icons";

export default function ImageSlot({ src, alt, label, className = "", priority = false, interactive = true }) {
  const [failed, setFailed] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const modalTitleId = useId();
  const canFocus = interactive && loaded && !failed && src;

  useEffect(() => {
    if (!focused) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFocused(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focused]);

  const frameClassName = `bg-theme-slot border-theme-slot focus-ring group relative aspect-video w-full overflow-hidden rounded-lg border text-left disabled:cursor-default ${canFocus ? "cursor-zoom-in" : ""} ${className}`;
  const content = (
    <>
      {!failed && src ? (
        <Image
          src={src}
          alt={alt || ""}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          unoptimized
        />
      ) : null}
      <div className={`${!loaded || failed || !src ? "flex" : "hidden"} absolute inset-0 items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(0,0,0,0.05))] p-4`}>
        <div className="space-y-2 text-center">
          <ImageIcon className="mx-auto h-7 w-7 text-faint" />
          <span className="block break-words font-mono text-xs text-faint">{label}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-zinc-950/45" />
      {canFocus ? (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Enlarge
        </span>
      ) : null}
    </>
  );

  return (
    <>
      {interactive ? (
        <button
          type="button"
          aria-label={canFocus ? `Enlarge ${alt || label || "project image"}` : undefined}
          disabled={!canFocus}
          onClick={() => {
            if (canFocus) setFocused(true);
          }}
          className={frameClassName}
        >
          {content}
        </button>
      ) : (
        <div className={frameClassName}>{content}</div>
      )}

      {focused ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setFocused(false)}
        >
          <div className="max-h-[92vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 id={modalTitleId} className="truncate text-sm font-medium text-white">
                {alt || label || "Project image"}
              </h2>
              <button
                type="button"
                className="focus-ring rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                onClick={() => setFocused(false)}
              >
                Close
              </button>
            </div>
            <div className="relative h-[78vh] overflow-hidden rounded-lg border border-white/15 bg-black shadow-2xl">
              <Image src={src} alt={alt || ""} fill sizes="100vw" className="object-contain" unoptimized />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
