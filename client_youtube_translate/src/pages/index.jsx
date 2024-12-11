import React from "react";
import TranscriptPage from "./transcript";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-center">
        Welcome to YouTube Transcript Fetcher
      </h1>
      <TranscriptPage />
    </div>
  );
};

export default Home;
