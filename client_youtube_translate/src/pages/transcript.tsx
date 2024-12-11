import { useRef, useState } from "react";

import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { TranscriptForm } from "@/components/TranscriptForm";
import { fetchTranscript } from "../services/api";

export default function TranscriptPage() {
  const [transcript, setTranscript] = useState<
    { start: number; text: string }[] | null
  >(null);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleFetchTranscript = async (url: string) => {
    setError(null);
    setTranscript(null);

    try {
      const videoIdtoUrl = extractVideoId(url);
      setVideoUrl(videoIdtoUrl);

      const data = await fetchTranscript(url);
      setTranscript(data.transcript);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        YouTube Transcript Fetcher
      </h1>
      <TranscriptForm onSubmit={handleFetchTranscript} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {videoUrl && (
        <div className="mt-6">
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
      )}
      <div>
        <h3>Translate is shown</h3>
      </div>
      {transcript && (
        <TranscriptDisplay transcript={transcript} currentTime={currentTime} />
      )}
    </div>
  );
}

const extractVideoId = (url: string): string => {
  const match =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
  return match ? match[1] : "";
};
