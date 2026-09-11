import { useCallback, useEffect, useRef } from "react";

interface Options {
  moduleId: string;
  isCompleted: boolean;
  onSave: (position: number, duration: number) => void;
  onComplete: (position: number, duration: number) => void;
}

// Both players tick about once a second. Writing that to the server would be a
// request per second per driver, so ticks are held and flushed on this interval.
const SAVE_EVERY_SECONDS = 15;

// Credits at the end mean a driver who has watched the module never reaches the
// last frame. Ninety percent is watched.
const COMPLETE_AT = 0.9;

export const usePlaybackProgress = function ({
  moduleId,
  isCompleted,
  onSave,
  onComplete,
}: Options) {
  const latest = useRef({ position: 0, duration: 0 });
  const lastSavedAt = useRef(0);
  const hasCompleted = useRef(isCompleted);

  const onSaveRef = useRef(onSave);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onSaveRef.current = onSave;
    onCompleteRef.current = onComplete;
  });

  // A new module starts its own accounting, and inherits its own completed flag.
  useEffect(() => {
    latest.current = { position: 0, duration: 0 };
    lastSavedAt.current = 0;
    hasCompleted.current = isCompleted;
  }, [moduleId, isCompleted]);

  const flush = useCallback(() => {
    const { position, duration } = latest.current;

    if (!duration || position <= 0) return;

    lastSavedAt.current = position;
    onSaveRef.current(position, duration);
  }, []);

  const handleProgress = useCallback(
    (position: number, duration: number) => {
      latest.current = { position, duration };

      if (!hasCompleted.current && position >= duration * COMPLETE_AT) {
        hasCompleted.current = true;
        lastSavedAt.current = position;
        onCompleteRef.current(position, duration);
        return;
      }

      // Scrubbing backwards must not trigger a save storm, so the gap is measured
      // in absolute terms.
      if (Math.abs(position - lastSavedAt.current) >= SAVE_EVERY_SECONDS) {
        flush();
      }
    },
    [flush],
  );

  const handleEnded = useCallback(() => {
    const { position, duration } = latest.current;

    if (hasCompleted.current) return flush();

    hasCompleted.current = true;
    onCompleteRef.current(position, duration || position);
  }, [flush]);

  // Leaving the page mid-module still keeps the driver's place.
  useEffect(() => {
    const save = () => flush();

    window.addEventListener("pagehide", save);

    return () => {
      window.removeEventListener("pagehide", save);
      save();
    };
  }, [flush, moduleId]);

  return { handleProgress, handleEnded };
};
