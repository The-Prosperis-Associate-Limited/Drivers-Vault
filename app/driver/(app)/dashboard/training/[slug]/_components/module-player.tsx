"use client";

import { AppText } from "@/components/shared/app-text";
import { youTubeVideoId } from "@/lib/utils";
import { usePlaybackProgress } from "../_hooks/use-playback-progress";
import { VideoPlayer } from "./video-player";
import { YouTubePlayer } from "./youtube-player";
import type { CourseModule } from "@/types/training";

interface Props {
  module: CourseModule;
  poster?: string | null;
  startAt: number;
  isCompleted: boolean;
  onSavePosition: (position: number, duration: number) => void;
  onComplete: (position: number, duration: number) => void;
}

/*
  Three kinds of module, two of which are video:

  - a YouTube url has no media file behind it, so it plays in YouTube's iframe
    and reports position through their IFrame API;
  - any other url is a file the browser decodes (mp4/webm, hls on Safari), so it
    plays in a real <video>. This is the branch TEGAT's Cloudinary uploads land
    on, and it reports the same position and duration as the YouTube one;
  - a module with no video is a reading. It renders as text — never as an empty
    video frame.
*/
export const ModulePlayer = function ({
  module,
  poster,
  startAt,
  isCompleted,
  onSavePosition,
  onComplete,
}: Props) {
  const videoId = module.video_url ? youTubeVideoId(module.video_url) : null;

  const { handleProgress, handleEnded } = usePlaybackProgress({
    moduleId: module.id,
    isCompleted,
    onSave: onSavePosition,
    onComplete,
  });

  return (
    <div className="space-y-4">
      {videoId ? (
        <YouTubePlayer
          key={module.id}
          videoId={videoId}
          title={module.title}
          startAt={startAt}
          onProgress={handleProgress}
          onEnded={handleEnded}
        />
      ) : module.video_url ? (
        <VideoPlayer
          key={module.id}
          src={module.video_url}
          poster={poster}
          startAt={startAt}
          onProgress={handleProgress}
          onEnded={handleEnded}
        />
      ) : null}

      {module.description && (
        <AppText type="caption" className="text-muted-foreground block">
          {module.description}
        </AppText>
      )}

      {module.content && (
        <AppText type="body" className="leading-relaxed whitespace-pre-line">
          {module.content}
        </AppText>
      )}
    </div>
  );
};
