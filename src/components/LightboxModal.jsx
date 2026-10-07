import React, { useEffect } from 'react';

export default function LightboxModal({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white text-gray-900 font-bold hover:bg-rose-500 hover:text-white flex items-center justify-center transition shadow-lg cursor-pointer text-lg"
      >
        ✕
      </button>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/90 text-gray-900 font-bold hover:bg-white flex items-center justify-center transition shadow-lg cursor-pointer text-xl"
        >
          ←
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/90 text-gray-900 font-bold hover:bg-white flex items-center justify-center transition shadow-lg cursor-pointer text-xl"
        >
          →
        </button>
      )}

      {/* Polaroid Modal Card */}
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center border-4 border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 max-h-[70vh] flex items-center justify-center w-full shadow-inner">
          <img
            src={photo.src}
            alt={photo.caption}
            className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain"
          />
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-500">
            {photo.phaseTitle || "Abbu's Special Memory"}
          </span>
          <p className="text-xl sm:text-2xl font-handwriting font-bold text-gray-900 mt-1">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
