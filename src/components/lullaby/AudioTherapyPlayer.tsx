import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import SessionTimer from "./SessionTimer";
import { useAudioTherapy } from "@/hooks/useAudioTherapy";

interface AudioTherapyPlayerProps {
  session: any;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
}

const AudioTherapyPlayer = ({ session, isPlaying, onPlayingChange }: AudioTherapyPlayerProps) => {
  const [volume, setVolume] = useState([80]);
  const [selectedDuration, setSelectedDuration] = useState(session.duration);
  
  const {
    currentTime,
    isSessionActive,
    startSession,
    pauseSession,
    stopSession
  } = useAudioTherapy(selectedDuration * 60, session.category); // Pass category to hook

  const handlePlay = () => {
    startSession();
    onPlayingChange(true);
  };

  const handlePause = () => {
    pauseSession();
    onPlayingChange(false);
  };

  const handleStop = () => {
    stopSession();
    onPlayingChange(false);
  };

  const handleSessionComplete = () => {
    onPlayingChange(false);
  };

  const durations = [5, 10, 15, 20, 30, 45, 60];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">{session.title}</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          {session.description}
        </p>
      </div>

      {/* Duration Selection */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Session Duration</h3>
          <div className="flex flex-wrap gap-3">
            {durations.map((duration) => (
              <Button
                key={duration}
                variant={selectedDuration === duration ? "default" : "outline"}
                onClick={() => setSelectedDuration(duration)}
                className={selectedDuration === duration 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }
                disabled={isSessionActive}
              >
                {duration} min
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Player */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-12">
          {/* Timer Display */}
          <div className="mb-12">
            <SessionTimer
              duration={selectedDuration * 60}
              currentTime={currentTime}
              isActive={isSessionActive}
              onComplete={handleSessionComplete}
            />
          </div>

          {/* Play Controls */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleStop}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full h-16 w-16"
              disabled={!isSessionActive && !isPlaying}
            >
              <Square className="h-8 w-8" />
            </Button>
            
            <Button
              onClick={isPlaying ? handlePause : handlePlay}
              className="bg-purple-600 hover:bg-purple-700 rounded-full h-24 w-24 shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <Volume2 className="h-5 w-5 text-white/70" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-white/70 text-sm w-12">{volume[0]}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <div className="mt-8 text-center">
        <p className="text-white/60">
          {session.category === 'anxiety' && "🌸 Breathing tones to help calm your mind and release tension"}
          {session.category === 'stress' && "🌊 Ocean wave sounds to wash away stress and promote relaxation"}  
          {session.category === 'sleep' && "🌙 Deep, soothing tones to guide you into restful sleep"}
        </p>
      </div>
    </div>
  );
};

export default AudioTherapyPlayer;
