import React, { useRef, useEffect, useState } from "react";

interface VoiceLevelProps {
  volume?: number; // Make volume optional since we'll also use internal volume
}

const VoiceLevel: React.FC<VoiceLevelProps> = ({ volume: externalVolume }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [internalVolume, setInternalVolume] = useState(0);
  const animationFrameRef = useRef<number>();

  // Initialize audio context and analyzer
  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create audio context
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();

      // Connect stream to analyzer
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      // Configure analyzer
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Start analyzing
      analyzeAudio();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Analyze audio and update volume
  const analyzeAudio = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    // Get frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    // Calculate average volume
    const average =
      dataArrayRef.current.reduce((acc, val) => acc + val, 0) /
      dataArrayRef.current.length;

    // Normalize to 0-1 range
    const normalizedVolume = average / 255;
    setInternalVolume(normalizedVolume);

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  // Initialize audio handling
  useEffect(() => {
    initializeAudio();

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle circle scaling based on volume
  useEffect(() => {
    if (circleRef.current) {
      // Use external volume if provided, otherwise use internal volume
      const currentVolume = externalVolume ?? internalVolume;

      // Base scale is 1, add volume influence for growth
      const scale = 1 + currentVolume * 0.2;

      // Apply transform with smooth transition
      circleRef.current.style.transform = `scale(${scale})`;
    }
  }, [externalVolume, internalVolume]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Visualization container */}
      <div className="relative">
        {/* Background circle with gradient */}
        <div
          ref={circleRef}
          className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-12 rounded-full transition-all duration-150 ease-out"
          style={{
            backgroundImage: `url("/assets/ai-vid.gif")`,
            backgroundSize: "cover",
            willChange: "transform",
            borderRadius: 9999999999999,
          }}
        />

        {/* Optional: Debug volume level */}
        {/* <div className="absolute bottom-0 left-0 right-0 text-white text-center">
          Volume: {(internalVolume * 100).toFixed(0)}%
        </div> */}
      </div>
    </div>
  );
};

export default VoiceLevel;
