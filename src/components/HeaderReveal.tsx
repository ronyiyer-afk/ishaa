"use client";

import React from "react";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function HeaderReveal() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const max = 220; // px scrolled to reach full reveal
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      setProgress(clamp(y / max));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const translateY = (1 - progress) * 24; // px
  const opacity = progress;

  return (
    <header
      aria-hidden={false}
      className="pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 w-full max-w-3xl"
      style={{ transform: `translateX(-50%)` }}
    >
      <div
        style={{ transform: `translateY(${translateY}px)`, opacity }}
        className="mx-auto flex w-fit flex-col items-center gap-2 rounded-full px-4 py-2 transition-transform duration-150 ease-out pointer-events-auto"
      >
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-3xl font-bold text-white/95 ring-4 ring-white/5">I</div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold leading-snug">Ishaa</h1>
            <p className="text-sm text-muted-foreground">For you Ishaa :)</p>
          </div>
        </div>
      </div>
    </header>
  );
}
