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
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Transcript</h2>
      <ul className="space-y-2">
        {transcript.map((item, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              currentTime >= item.start &&
              (index === transcript.length - 1 ||
                currentTime < transcript[index + 1].start)
                ? "bg-blue-100 border-l-4 border-blue-500"
                : "bg-gray-100"
            }`}
          >
            <strong className="text-blue-600">{item.start.toFixed(2)}s:</strong>{" "}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
