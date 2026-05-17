import { useState } from "react";
import { speak } from "../../utils/speech";
import "./PronunciationBtn.css";

const speechAvailable = typeof window !== "undefined" && !!window.speechSynthesis;

export function PronunciationBtn({ text }) {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (!speechAvailable || playing) return;
    setPlaying(true);
    speak(text).then(() => setPlaying(false));
  };

  if (!speechAvailable) {
    return (
      <button className="pron-btn pron-btn--disabled" disabled title="Your browser does not support speech synthesis">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      </button>
    );
  }

  if (playing) {
    return (
      <button className="pron-btn pron-btn--playing" onClick={handleClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      </button>
    );
  }

  return (
    <button className="pron-btn" onClick={handleClick} title="播放发音">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    </button>
  );
}
