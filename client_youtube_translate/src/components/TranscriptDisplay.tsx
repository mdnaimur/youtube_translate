import { useEffect, useRef } from "react";

import { ScrollArea } from "./ui/scroll-area";

// Define the type for a transcript item
interface TranscriptItem {
  start: number;
  text: string;
}
interface TranscriptDisplayProps {
  transcript: TranscriptItem[];
  currentTime: number;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  currentTime,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to active transcript item on `currentTime` update
  useEffect(() => {
    const activeIndex = transcript.findIndex(
      (item) => currentTime >= item.start && currentTime < item.start + 5
    );

    if (activeIndex !== -1 && containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      ) as HTMLElement;

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentTime, transcript]);

  if (!transcript || transcript.length === 0) {
    return <p className="text-red-500">No transcript available.</p>;
  }

  return (
    <div className=" py-4 justify-center">
      <h2 className="text-xl  text-cyan-300 font-semibold items-center pb-2">
        Transcripts
      </h2>
      <ScrollArea className="h-60 w-full md:w-3/4 mx-auto bg-black">
        <div ref={containerRef} className="p-4">
          <ul className="space-y-1">
            {transcript.map((item, index) => (
              <li
                key={index}
                data-index={index} // For identifying the active item
                className={`p-2 rounded-lg shadow-md ${
                  currentTime >= item.start &&
                  (index === transcript.length - 1 ||
                    currentTime < transcript[index + 1].start)
                    ? "bg-yellow-300 text-black border-yellow-600 font-bold"
                    : "text-gray-300"
                }`}
              >
                <strong className="text-gray-500 pr-2">
                  {item.start.toFixed(2)}:
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
};
