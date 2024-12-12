import { useEffect, useRef, useState } from "react";

import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { TranscriptForm } from "@/components/TranscriptForm";
import { fetchTranscript } from "../services/api";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function TranscriptPage() {
  // variable
  const [transcript, setTranscript] = useState<
    { start: number; text: string }[] | null
  >(null);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleFetchTranscript = async (url: string) => {
    setError(null);
    setTranscript(null);

    try {
      const videoIdtoUrl = extractVideoId(url);
      if (!videoIdtoUrl) {
        throw new Error("Invalid YouTube URL.");
      }

      setVideoUrl(videoIdtoUrl);

      const data = await fetchTranscript(url);
      setTranscript(data.transcript);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transcript. Please try again.");
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (videoUrl) {
      const onYouTubeIframeAPIReady = () => {
        const player = new YT.Player("youtube-player", {
          videoId: videoUrl,
          events: {
            onReady: () => {
              // Start polling the player's current time
              const updateTime = () => {
                setCurrentTime(player.getCurrentTime());
                requestAnimationFrame(updateTime);
              };
              updateTime();
            },
          },
        });
      };

      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        document.body.appendChild(script);
      } else {
        onYouTubeIframeAPIReady();
      }
    }
  }, [videoUrl]);

  return (
    <div className="bg-slate-600 max-w-4xl mx-auto p-6">
      <p className=" text-xl font-bold text-center text-white  mb-6">
        YouTube Transcript
      </p>
      <TranscriptForm onSubmit={handleFetchTranscript} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="flex">
        {videoUrl ? (
          <div className="mt-6 pr-10 md:pt-36  mx-auto">
            <div id="youtube-player" className="rounded-lg shadow-md"></div>
          </div>
        ) : (
          <div className="mt-6 mb-6 mx-auto w-[420px] h-[420px] bg-slate-400 flex items-center justify-center">
            <div className="flex items-center justify-center w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-1.698A1 1 0 0010 10.131v3.738a1 1 0 001.555.832l3.197-1.698a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <p className="text-white">YouTube Video Player</p>
            </div>
          </div>
        )}
        {/* {videoUrl && (
          <div className="mt-6 mb-6">
            <iframe
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${videoUrl}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        )} */}
      </div>

      <div>
        {transcript && (
          <TranscriptDisplay
            transcript={transcript}
            currentTime={currentTime}
          />
        )}
      </div>
    </div>
  );
}

const extractVideoId = (url: string): string => {
  const match =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
  return match ? match[1] : "";
};
