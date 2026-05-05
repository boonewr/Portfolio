"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "@/components/icons";

export default function ImageSlot({ src, alt, label, className = "", priority = false }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900 ${className}`}>
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
      <div className={`${!loaded || failed || !src ? "flex" : "hidden"} absolute inset-0 items-center justify-center bg-[linear-gradient(135deg,rgba(39,39,42,0.8),rgba(9,9,11,0.95))] p-4`}>
        <div className="space-y-2 text-center">
          <ImageIcon className="mx-auto h-7 w-7 text-zinc-600" />
          <span className="block break-words font-mono text-xs text-zinc-500">{label}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent" />
    </div>
  );
}
