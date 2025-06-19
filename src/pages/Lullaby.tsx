
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TherapyCategories from "@/components/lullaby/TherapyCategories";
import AudioTherapyPlayer from "@/components/lullaby/AudioTherapyPlayer";
import TherapyBackground from "@/components/lullaby/TherapyBackground";

const Lullaby = () => {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReturnToSpotify = () => {
    navigate("/");
  };

  const handleSessionSelect = (session: any) => {
    setSelectedSession(session);
  };

  const handleBackToCategories = () => {
    setSelectedSession(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <TherapyBackground isPlaying={isPlaying} category={selectedSession?.category} />
      
      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedSession && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToCategories}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold text-white">
            {selectedSession ? selectedSession.title : "Lullaby Audio Therapy"}
          </h1>
        </div>
        
        <Button
          variant="outline"
          onClick={handleReturnToSpotify}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          Return to Spotify
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6">
        {!selectedSession ? (
          <TherapyCategories onSessionSelect={handleSessionSelect} />
        ) : (
          <AudioTherapyPlayer
            session={selectedSession}
            isPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
          />
        )}
      </main>
    </div>
  );
};

export default Lullaby;
