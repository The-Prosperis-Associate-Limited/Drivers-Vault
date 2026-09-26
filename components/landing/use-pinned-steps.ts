"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

// Drives a pinned (sticky) section: scroll progress over the tall track maps
// to a discrete count of revealed steps, reversing on the way back up.
// Direct useTransform scrubbing is unreliable in motion v12 scroll timelines —
// discrete state + animate() is the dependable pattern.
export const usePinnedSteps = function (count: number, span = 0.85) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setRevealed(
      Math.max(0, Math.min(count, Math.ceil((value / span) * count))),
    );
  });

  return { trackRef, revealed };
};
