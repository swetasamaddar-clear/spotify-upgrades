
import { useState, useEffect, useRef } from "react";

export const useAudioTherapy = (sessionDuration: number) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSession = () => {
    setIsSessionActive(true);
    setIsPaused(false);
    startAudio();
    startTimer();
  };

  const pauseSession = () => {
    setIsPaused(true);
    stopAudio();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopSession = () => {
    setIsSessionActive(false);
    setIsPaused(false);
    setCurrentTime(0);
    stopAudio();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= sessionDuration) {
          setIsSessionActive(false);
          stopAudio();
          return sessionDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const startAudio = () => {
    try {
      // Create Web Audio API context for generated therapeutic sounds
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const context = audioContextRef.current;
      
      // Create oscillators for binaural beats and ambient tones
      oscillatorRef.current = context.createOscillator();
      gainNodeRef.current = context.createGain();
      
      // Configure therapeutic frequency (around 40Hz for focus, 10Hz for relaxation)
      oscillatorRef.current.frequency.setValueAtTime(220, context.currentTime); // Base tone
      oscillatorRef.current.type = 'sine';
      
      // Set volume
      gainNodeRef.current.gain.setValueAtTime(0.1, context.currentTime);
      
      // Connect nodes
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(context.destination);
      
      // Start audio
      oscillatorRef.current.start();
      
      // Add gentle fade-in
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 2);
      
    } catch (error) {
      console.log("Audio context not available:", error);
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        // Fade out before stopping
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 1);
        }
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current = null;
          }
          if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }
        }, 1000);
      } catch (error) {
        console.log("Error stopping audio:", error);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopAudio();
    };
  }, []);

  // Auto-stop when session completes
  useEffect(() => {
    if (currentTime >= sessionDuration && isSessionActive) {
      stopSession();
    }
  }, [currentTime, sessionDuration, isSessionActive]);

  return {
    isSessionActive,
    currentTime,
    isPaused,
    startSession,
    pauseSession,
    stopSession
  };
};
