
interface TherapyBackgroundProps {
  isPlaying: boolean;
  category?: string;
}

const TherapyBackground = ({ isPlaying, category }: TherapyBackgroundProps) => {
  const getBackgroundElements = () => {
    if (category === 'anxiety') {
      return (
        <div className="absolute inset-0">
          {/* Breathing animation for anxiety */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '1s' }} />
        </div>
      );
    }

    if (category === 'stress') {
      return (
        <div className="absolute inset-0">
          {/* Wave animation for stress */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/20 to-transparent">
            <div className={`absolute bottom-0 left-0 w-full h-16 bg-cyan-500/10 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
          <div className={`absolute top-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>
      );
    }

    if (category === 'sleep') {
      return (
        <div className="absolute inset-0">
          {/* Night sky animation for sleep */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-indigo-900/30" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white/30 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      );
    }

    // Default background
    return (
      <div className="absolute inset-0">
        <div className={`absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
        <div className={`absolute bottom-1/4 right-1/3 w-48 h-48 bg-indigo-500/5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '2s' }} />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {getBackgroundElements()}
    </div>
  );
};

export default TherapyBackground;
