import "../styles/globals.css";

import TranscriptPage from "./transcript";

const Home = () => {
  return (
    <div className="bg-black w-full h-[1140px] items-center justify-center">
      <div className="pt-10">
        {/* <p className="text-xl md:text-5xl font-bold text-center text-slate-500">
          Welcome to YouTube Transcript Fetcher
        </p> */}
        <TranscriptPage />
      </div>
    </div>
  );
};

export default Home;
