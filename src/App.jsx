import React, { useState } from 'react';
import Hero from './components/Hero';
import TimelineSection from './components/TimelineSection';
import VRMemoryRoom from './components/VRMemoryRoom';
import BirthdayWishes from './components/BirthdayWishes';
import AudioPlayer from './components/AudioPlayer';
import LightboxModal from './components/LightboxModal';
import Balloons from './components/Balloons';
import { phasesData } from './data/timelineData';

export default function App() {
  const [showVR, setShowVR] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Flatten all photos for lightbox navigation
  const allPhotos = phasesData.flatMap((phase) =>
    phase.photos.map((p) => ({
      ...p,
      phaseTitle: phase.title,
    }))
  );

  const currentPhotoIndex = selectedPhoto
    ? allPhotos.findIndex((p) => p.src === selectedPhoto.src)
    : -1;

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setSelectedPhoto(allPhotos[currentPhotoIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < allPhotos.length - 1) {
      setSelectedPhoto(allPhotos[currentPhotoIndex + 1]);
    }
  };

  const scrollToPhase = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartExperience = () => {
    setAutoPlayMusic(true);
    scrollToPhase('phase1');
  };

  return (
    <div className="bg-[#fffbf5] text-gray-900 min-h-screen relative font-sans selection:bg-rose-400 selection:text-white">
      
      {/* Animated Floating Balloons */}
      <Balloons />

      {/* Floating Audio Controller at Bottom Right */}
      <AudioPlayer audioSrc="/assets/background-music.mp3" autoPlayTrigger={autoPlayMusic} />

      {/* Clean & Festive Birthday Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-amber-200/60 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xl">🎂</span>
            <span className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
              Abbu's 51st Birthday
            </span>
            <span className="text-xs text-rose-500 font-bold hidden sm:inline-block">
              • October 7th, 2026
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
            <button
              onClick={() => scrollToPhase('phase1')}
              className="px-2.5 py-1 text-gray-700 hover:text-rose-500 transition cursor-pointer"
            >
              🎒 Mischief Era
            </button>
            <button
              onClick={() => scrollToPhase('phase2')}
              className="px-2.5 py-1 text-gray-700 hover:text-rose-500 transition cursor-pointer"
            >
              👨‍👧‍👧 Best Girl Dad
            </button>
            <button
              onClick={() => scrollToPhase('phase3')}
              className="px-2.5 py-1 text-gray-700 hover:text-rose-500 transition cursor-pointer"
            >
              🎉 51 & Fabulous
            </button>
            <button
              onClick={() => setShowVR(true)}
              className="px-3 py-1.5 rounded-full bg-purple-600 text-white hover:bg-purple-700 font-bold transition shadow-sm cursor-pointer flex items-center gap-1"
            >
              <span>🌌</span> VR Room
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* 1. Cheerful Birthday Hero */}
        <Hero
          onStartExperience={handleStartExperience}
          onOpenVR={() => setShowVR(true)}
        />

        {/* 2. Scrapbook Timeline Phases */}
        <div className="space-y-6 sm:space-y-12">
          {phasesData.map((phase) => (
            <TimelineSection
              key={phase.id}
              phase={phase}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {/* 3. Birthday Message from 2 Daughters + Confetti */}
        <BirthdayWishes onOpenVR={() => setShowVR(true)} />
      </main>

      {/* Warm Footer */}
      <footer className="relative z-10 border-t border-amber-200/60 bg-white py-8 text-center px-4">
        <p className="font-handwriting text-xl text-rose-600 font-bold">
          Made with infinite love by your 2 daughters for the world's greatest Abbu ❤️
        </p>
        <p className="text-xs text-gray-500 mt-1">
          October 7, 1975 — October 7, 2026 • 51 Glorious Years
        </p>
      </footer>

      {/* 4. Lightbox Modal for Photos */}
      {selectedPhoto && (
        <LightboxModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
          hasPrev={currentPhotoIndex > 0}
          hasNext={currentPhotoIndex < allPhotos.length - 1}
        />
      )}

      {/* 5. 360° VR Birthday Room */}
      {showVR && (
        <VRMemoryRoom
          phases={phasesData}
          onClose={() => setShowVR(false)}
        />
      )}
    </div>
  );
}
