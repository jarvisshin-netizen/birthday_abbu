import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onStartExperience, onOpenVR }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Warm celebratory background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(254,240,138,0.45)_0%,rgba(254,205,211,0.3)_40%,transparent_75%)] pointer-events-none" />

      {/* Birthday Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mb-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border-2 border-amber-300 shadow-[0_8px_20px_rgba(245,158,11,0.15)] backdrop-blur-sm"
      >
        <span className="text-xl">🎂</span>
        <span className="text-xs sm:text-sm font-bold text-amber-900 tracking-wider uppercase">
          October 7, 1975 ➔ October 7, 2026 • 51 Epic Years!
        </span>
        <span className="text-xl">🎈</span>
      </motion.div>

      {/* Main Cheerful Birthday Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-gray-900 tracking-tight leading-tight max-w-5xl"
      >
        Happy 51st Birthday, <br />
        <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500 bg-clip-text text-transparent italic font-handwriting text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          Dearest Abbu!
        </span>
      </motion.h1>

      {/* Heartfelt & Fun Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 mt-6 text-lg sm:text-2xl text-gray-700 font-handwriting font-bold max-w-3xl leading-relaxed"
      >
        "From the boy who bunked classes and lived life without regrets, to the superhero dad who gave his two daughters the entire world of happiness! ❤️"
      </motion.p>

      {/* Quick Life Stats Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 mt-8 max-w-lg w-full"
      >
        <div className="bg-white/90 p-4 rounded-2xl border-2 border-amber-200 shadow-md transform -rotate-1 hover:rotate-0 transition">
          <div className="text-2xl sm:text-3xl font-black text-amber-600">51</div>
          <div className="text-[11px] sm:text-xs font-bold text-gray-600 uppercase mt-0.5">Years of Fun 🎉</div>
        </div>
        <div className="bg-white/90 p-4 rounded-2xl border-2 border-rose-200 shadow-md transform rotate-2 hover:rotate-0 transition">
          <div className="text-2xl sm:text-3xl font-black text-rose-600">2</div>
          <div className="text-[11px] sm:text-xs font-bold text-gray-600 uppercase mt-0.5">Lucky Daughters 👨‍👧‍👧</div>
        </div>
        <div className="bg-white/90 p-4 rounded-2xl border-2 border-teal-200 shadow-md transform -rotate-2 hover:rotate-0 transition">
          <div className="text-2xl sm:text-3xl font-black text-teal-600">100%</div>
          <div className="text-[11px] sm:text-xs font-bold text-gray-600 uppercase mt-0.5">Life to Fullest 🚀</div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={onStartExperience}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500 text-white font-bold text-base shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>📸</span> Explore Abbu's Life Album <span>↓</span>
        </button>

        <button
          onClick={onOpenVR}
          className="px-7 py-4 rounded-full bg-white border-2 border-purple-400 text-purple-700 font-bold text-base shadow-md hover:bg-purple-50 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>🌌</span> 360° Birthday VR Room
        </button>
      </motion.div>
    </section>
  );
}
