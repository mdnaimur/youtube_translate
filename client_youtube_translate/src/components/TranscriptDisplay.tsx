import { ScrollArea } from "./ui/scroll-area";

// Define the type for a transcript item
interface TranscriptItem {
  start: number;
  text: string;
}

// Define the props for the component
interface TranscriptDisplayProps {
  transcript: TranscriptItem[];
  currentTime: number;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  currentTime,
}) => {
  if (!transcript || transcript.length === 0) {
    return <p className="text-red-500">No transcript available.</p>;
  }

  return (
    <div className="mt-8 py-9 ">
      <h2 className="text-xl text-cyan-300 font-semibold items-center pb-2">
        Transcripts
      </h2>
      <ScrollArea className="h-72 w-full bg-black">
        <div className="p-4">
          <ul className="space-y-2">
            {transcript.map((item, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg shadow-md ${
                  currentTime >= item.start &&
                  (index === transcript.length - 1 ||
                    currentTime < transcript[index + 1].start)
                    ? "bg-blue-100  border-blue-500"
                    : "text-gray-100"
                }`}
              >
                <strong className="text-yellow-50 pr-2">
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
