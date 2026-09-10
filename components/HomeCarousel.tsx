"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A horizontal, swipeable row for the home page sections.
 *
 * ETIA is a distributor, not the manufacturer: a visitor arrives to look at
 * equipment, not to read a taxonomy. A row that scrolls sideways shows the
 * pictures at a size worth looking at and keeps the section to one screen,
 * where a grid of five or six tiles pushed everything below it out of reach.
 *
 * Touch scrolls natively; the arrows exist for a mouse and disable themselves
 * at either end so they never look broken.
 */
export default function HomeCarousel({
  children,
  label,
  tone = "light",
}: {
  children: React.ReactNode;
  label: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    // Card widths are percentages of the viewport, so a resize changes where
    // the ends are.
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrow =
    tone === "dark"
      ? "border-white/30 bg-white/10 text-white hover:bg-white/20 disabled:opacity-25"
      : "border-[#D9E4EA] bg-white text-[#143C96] hover:border-[#143C96] disabled:opacity-30";

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={sync}
        role="group"
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:gap-5 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Hidden where there is nothing to scroll to, and on touch, where the
          row is swiped rather than clicked. */}
      <div className="mt-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label={`${label}: previous`}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-default ${arrow}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label={`${label}: next`}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-default ${arrow}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
