import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function VideoPlayer({ src, poster }) {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
      <Plyr
        source={{
          type: "video",
          title: "Sample Movie",
          sources: [
            { src, type: "video/mp4" },
          ],
          poster,
          tracks: [
            {
              kind: "captions",
              label: "English",
              srclang: "en",
              src: "/subtitles/en.vtt",
              default: true,
            },
            {
              kind: "captions",
              label: "Hindi",
              srclang: "hi",
              src: "/subtitles/hi.vtt",
            },
            {
              kind: "captions",
              label: "Spanish",
              srclang: "es",
              src: "/subtitles/es.vtt",
            },
            // Example audio track (works in browsers that support alternate audio)
            {
              kind: "descriptions",
              label: "Director's Commentary",
              srclang: "en",
              src: "/audio/commentary.vtt",
            },
          ],
        }}
        options={{
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "fullscreen",
          ],
          settings: ["captions", "quality", "speed", "loop"],
        }}
      />
      <style jsx global>{`
        :root {
          --plyr-color-main: #e50914; /* Netflix red */
        }
        .plyr--video .plyr__controls {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
        }
      `}</style>
    </div>
  );
}
