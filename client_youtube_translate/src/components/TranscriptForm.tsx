import { FC, useState } from "react";

interface TranscriptFormProps {
  onSubmit: (videoUrl: string) => void; // Define the type of 'onSubmit' function
}

export const TranscriptForm: FC<TranscriptFormProps> = ({ onSubmit }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(videoUrl);
    if (onSubmit) onSubmit(videoUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Fetch Transcript
      </button>
    </form>
  );
};
