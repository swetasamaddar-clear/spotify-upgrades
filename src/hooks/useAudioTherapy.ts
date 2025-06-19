
import { useState, useEffect, useRef } from "react";

export const useAudioTherapy = (sessionDuration: number, category: string = 'anxiety') => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

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

  // Create white noise buffer
  const createWhiteNoise = (context: AudioContext): AudioBuffer => {
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    return buffer;
  };

  const startAudio = () => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const context = audioContextRef.current;
      
      // Create main gain node
      gainNodeRef.current = context.createGain();
      gainNodeRef.current.connect(context.destination);
      gainNodeRef.current.gain.setValueAtTime(0, context.currentTime);
      
      // Clear previous oscillators
      oscillatorsRef.current = [];

      if (category === 'anxiety') {
        // Anxiety: Calming breathing rhythm tones
        const breathingTone = context.createOscillator();
        breathingTone.frequency.setValueAtTime(220, context.currentTime);
        breathingTone.type = 'sine';
        
        const breathingGain = context.createGain();
        breathingGain.gain.setValueAtTime(0.1, context.currentTime);
        
        breathingTone.connect(breathingGain);
        breathingGain.connect(gainNodeRef.current);
        breathingTone.start();
        
        // Add gentle breathing pattern modulation
        const lfo = context.createOscillator();
        lfo.frequency.setValueAtTime(0.2, context.currentTime); // 0.2 Hz for slow breathing
        lfo.type = 'sine';
        
        const lfoGain = context.createGain();
        lfoGain.gain.setValueAtTime(0.02, context.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(breathingGain.gain);
        lfo.start();
        
        oscillatorsRef.current = [breathingTone, lfo];
        
      } else if (category === 'stress') {
        // Stress: Ocean waves and nature sounds
        const whiteNoise = createWhiteNoise(context);
        const noiseSource = context.createBufferSource();
        noiseSource.buffer = whiteNoise;
        noiseSource.loop = true;
        
        // Create bandpass filter for ocean wave effect
        const lowpass = context.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(800, context.currentTime);
        
        const highpass = context.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(200, context.currentTime);
        
        const waveGain = context.createGain();
        waveGain.gain.setValueAtTime(0.05, context.currentTime);
        
        noiseSource.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(waveGain);
        waveGain.connect(gainNodeRef.current);
        
        // Add wave modulation
        const waveLfo = context.createOscillator();
        waveLfo.frequency.setValueAtTime(0.1, context.currentTime);
        waveLfo.type = 'sine';
        
        const waveLfoGain = context.createGain();
        waveLfoGain.gain.setValueAtTime(0.02, context.currentTime);
        
        waveLfo.connect(waveLfoGain);
        waveLfoGain.connect(waveGain.gain);
        waveLfo.start();
        noiseSource.start();
        
        noiseNodeRef.current = noiseSource;
        oscillatorsRef.current = [waveLfo];
        
      } else if (category === 'sleep') {
        // Sleep: Deep, low frequency tones and gentle harmonics
        const baseTone = context.createOscillator();
        baseTone.frequency.setValueAtTime(110, context.currentTime); // Lower frequency for sleep
        baseTone.type = 'sine';
        
        const harmonic = context.createOscillator();
        harmonic.frequency.setValueAtTime(165, context.currentTime); // Perfect fifth
        harmonic.type = 'sine';
        
        const baseGain = context.createGain();
        baseGain.gain.setValueAtTime(0.08, context.currentTime);
        
        const harmonicGain = context.createGain();
        harmonicGain.gain.setValueAtTime(0.04, context.currentTime);
        
        baseTone.connect(baseGain);
        harmonic.connect(harmonicGain);
        baseGain.connect(gainNodeRef.current);
        harmonicGain.connect(gainNodeRef.current);
        
        baseTone.start();
        harmonic.start();
        
        // Add very slow modulation for dreamlike effect
        const sleepLfo = context.createOscillator();
        sleepLfo.frequency.setValueAtTime(0.05, context.currentTime);
        sleepLfo.type = 'sine';
        
        const sleepLfoGain = context.createGain();
        sleepLfoGain.gain.setValueAtTime(0.01, context.currentTime);
        
        sleepLfo.connect(sleepLfoGain);
        sleepLfoGain.connect(baseGain.gain);
        sleepLfo.start();
        
        oscillatorsRef.current = [baseTone, harmonic, sleepLfo];
      }
      
      // Gentle fade-in
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.3, context.currentTime + 2);
      
    } catch (error) {
      console.log("Audio context not available:", error);
    }
  };

  const stopAudio = () => {
    if (audioContextRef.current && gainNodeRef.current) {
      try {
        // Fade out before stopping
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 1);
        
        setTimeout(() => {
          // Stop all oscillators
          oscillatorsRef.current.forEach(osc => {
            try {
              osc.stop();
            } catch (e) {
              console.log("Error stopping oscillator:", e);
            }
          });
          
          // Stop noise source if it exists
          if (noiseNodeRef.current) {
            try {
              noiseNodeRef.current.stop();
              noiseNodeRef.current = null;
            } catch (e) {
              console.log("Error stopping noise:", e);
            }
          }
          
          oscillatorsRef.current = [];
          
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
