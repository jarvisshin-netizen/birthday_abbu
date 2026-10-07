import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer({ audioSrc, autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const base = import.meta.env.BASE_URL || '/';
  const finalAudioSrc = audioSrc || `${base}assets/background-music.mp3`;

  useEffect(() => {
    const audio = new Audio(finalAudioSrc);
    audio.loop = true;
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.pause();
      audio.src = '';
    };
  }, [finalAudioSrc]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.warn("Autoplay blocked:", e);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio playback error:", e);
      });
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border-2 border-amber-300 rounded-full px-4 py-2.5 shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:border-amber-400 transition-all">
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 text-white flex items-center justify-center transition-transform active:scale-90 shadow-md cursor-pointer ${
            isPlaying ? 'animate-bounce' : ''
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <span className="text-sm font-bold">{isPlaying ? '⏸' : '▶'}</span>
        </button>

        {/* Song Info */}
        <div className="flex flex-col text-left cursor-pointer" onClick={togglePlay}>
          <span className="text-xs font-bold text-gray-800 tracking-wide truncate max-w-[140px] sm:max-w-[180px]">
            🎵 Yeh Zindagi Hai Ek Juaa
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {isPlaying ? 'Playing Soundtrack' : 'Tap to Play Music'} • {formatTime(currentTime)}
          </span>
        </div>

        {/* Animated Sound Wave */}
        <div className="flex items-end gap-[3px] h-4 cursor-pointer" onClick={togglePlay}>
          {[40, 90, 60, 100, 70].map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full bg-rose-500 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
              }`}
              style={{
                height: isPlaying ? `${h}%` : '4px',
                animationDelay: `${i * 150}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
