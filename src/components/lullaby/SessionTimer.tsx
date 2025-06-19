
import { useEffect } from "react";

interface SessionTimerProps {
  duration: number; // in seconds
  currentTime: number;
  isActive: boolean;
  onComplete: () => void;
}

const SessionTimer = ({ duration, currentTime, isActive, onComplete }: SessionTimerProps) => {
  const remainingTime = Math.max(0, duration - currentTime);
  const progress = currentTime / duration;

  useEffect(() => {
    if (remainingTime === 0 && isActive) {
      onComplete();
    }
  }, [remainingTime, isActive, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const circumference = 2 * Math.PI * 120; // radius of 120
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        {/* Background Circle */}
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-white mb-2">
            {formatTime(remainingTime)}
          </div>
          <div className="text-white/60 text-sm">
            {isActive ? "Remaining" : "Duration"}
          </div>
        </div>
      </div>

      {/* Session Status */}
      <div className="text-center">
        <div className="text-white/80 font-medium">
          {!isActive && remainingTime === duration && "Ready to begin"}
          {isActive && "Session in progress"}
          {remainingTime === 0 && "Session complete"}
        </div>
      </div>
    </div>
  );
};

export default SessionTimer;
