"use client";

import { useEffect, useRef } from "react";

interface YouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

interface YouTubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

/*
  YouTube hands back no media file, so the only way to know where a driver got to
  is its own IFrame API — `getCurrentTime` on an interval while playing. The
  script is a singleton: YouTube calls `onYouTubeIframeAPIReady` exactly once for
  the page, so a second <script> tag would never fire and the player would hang.
*/
const loadApi = function () {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise<YouTubeApi>((resolve) => {
    const existing = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      existing?.();
      resolve(window.YT as YouTubeApi);
    };

    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      document.body.appendChild(script);
    }
  });
};

interface Props {
  videoId: string;
  title: string;
  startAt: number;
  onProgress: (position: number, duration: number) => void;
  onEnded: () => void;
}

const POLL_MS = 1000;

export const YouTubePlayer = function ({
  videoId,
  title,
  startAt,
  onProgress,
  onEnded,
}: Props) {
  const mount = useRef<HTMLDivElement>(null);

  // Held in refs so changing handlers never tears down and rebuilds the player
  // mid-watch, which would drop the driver back to the start.
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);
  const startAtRef = useRef(startAt);

  // Assigned in an effect, not during render: writing a ref while rendering is
  // what the React Compiler refuses, and it would be unsafe under concurrent
  // rendering besides.
  useEffect(() => {
    onProgressRef.current = onProgress;
    onEndedRef.current = onEnded;
  });

  useEffect(() => {
    let player: YouTubePlayer | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const stopPolling = () => {
      if (poll) clearInterval(poll);
      poll = null;
    };

    const report = () => {
      if (!player) return;

      const position = Math.floor(player.getCurrentTime());
      const duration = Math.floor(player.getDuration());

      if (duration > 0) onProgressRef.current(position, duration);
    };

    loadApi().then((api) => {
      if (cancelled || !mount.current) return;

      player = new api.Player(mount.current, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            if (startAtRef.current > 0) {
              player?.seekTo(startAtRef.current, true);
            }
          },
          onStateChange: (event) => {
            if (event.data === api.PlayerState.PLAYING) {
              stopPolling();
              poll = setInterval(report, POLL_MS);
              return;
            }

            stopPolling();
            report();

            if (event.data === api.PlayerState.ENDED) onEndedRef.current();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopPolling();
      // A last read before teardown, so switching module keeps the position.
      try {
        report();
        player?.destroy();
      } catch {
        // The iframe can already be gone on a fast unmount; nothing to save.
      }
    };
  }, [videoId]);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <div ref={mount} title={title} className="h-full w-full" />
    </div>
  );
};
