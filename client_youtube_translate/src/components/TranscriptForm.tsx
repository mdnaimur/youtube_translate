import { FC, useState } from "react";

interface TranscriptFormProps {
  onSubmit: (videoUrl: string) => void;
}

export const TranscriptForm: FC<TranscriptFormProps> = ({ onSubmit }) => {
  //
  const [videoUrl, setVideoUrl] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(videoUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-24 flex flex-col gap-3 items-center justify-center  md:flex-row md:items-center md:gap-9 max-w-md mx-auto"
    >
      <div className="flex justify-between gap-4">
        <p className="text-white text-xl">URL:</p>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border border-white rounded-md shadow-sm bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className=" w-1/3 ml-9 md:w-[160px]   bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};
