"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  poster?: string | null;
  startAt: number;
  onProgress: (position: number, duration: number) => void;
  onEnded: () => void;
}

/*
  The same contract as the YouTube player, over a file the browser can decode —
  mp4/webm anywhere, hls on Safari. This is the branch Drivers Vault's own uploads land
  on, and swapping a module's url from YouTube to Cloudinary needs no other
  change: resume and completion already work the same on both.
*/
export const VideoPlayer = function ({
  src,
  poster,
  startAt,
  onProgress,
  onEnded,
}: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  // Seeking has to wait for metadata: currentTime is ignored before the browser
  // knows how long the file is.
  useEffect(() => {
    const element = video.current;

    if (!element || startAt <= 0) return;

    const seek = () => {
      if (element.currentTime < startAt) element.currentTime = startAt;
    };

    if (element.readyState >= 1) seek();
    else element.addEventListener("loadedmetadata", seek, { once: true });

    return () => element.removeEventListener("loadedmetadata", seek);
  }, [src, startAt]);

  return (
    <video
      ref={video}
      key={src}
      src={src}
      poster={poster ?? undefined}
      controls
      playsInline
      preload="metadata"
      controlsList="nodownload"
      onTimeUpdate={(event) => {
        const element = event.currentTarget;

        if (element.duration > 0) {
          onProgressRef.current(
            Math.floor(element.currentTime),
            Math.floor(element.duration),
          );
        }
      }}
      onEnded={onEnded}
      className="aspect-video w-full rounded-xl bg-black"
    >
      Your browser cannot play this video. <a href={src}>Open it directly</a>.
    </video>
  );
};
