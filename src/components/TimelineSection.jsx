import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineSection({ phase, onSelectPhoto }) {
  // Slight playful rotation for polaroids
  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-0', 'rotate-2', '-rotate-2'];

  return (
    <div id={phase.id} className="relative py-16 sm:py-24 px-4 sm:px-6">
      {/* Decorative Phase Card Background */}
      <div className={`max-w-6xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br ${phase.themeColor} border border-white/60 shadow-[0_15px_35px_rgba(0,0,0,0.04)] relative overflow-hidden`}>
        
        {/* Phase Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-gray-800 font-bold text-xs uppercase tracking-wider shadow-sm mb-3">
            {phase.badge} • {phase.era}
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-gray-900 tracking-tight">
            {phase.title}
          </h2>

          <p className="mt-3 text-lg sm:text-2xl font-handwriting font-bold text-rose-600 max-w-2xl mx-auto">
            {phase.subtitle}
          </p>

          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {phase.description}
          </p>

          {/* Special Quote Badge */}
          <div className="mt-4 inline-block bg-white/80 px-6 py-2 rounded-2xl border border-dashed border-amber-300 shadow-sm">
            <span className="text-sm sm:text-base font-handwriting font-bold text-gray-800">
              {phase.quote}
            </span>
          </div>
        </motion.div>

        {/* Polaroid Scrapbook Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {phase.photos.map((photo, index) => {
            const rotClass = rotations[index % rotations.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
                onClick={() => onSelectPhoto({ ...photo, phaseTitle: phase.title, index })}
                className={`polaroid p-2.5 sm:p-3.5 rounded-xl cursor-pointer transform ${rotClass} border border-gray-100 flex flex-col justify-between`}
              >
                {/* Cute Washi Tape effect at top */}
                <div className="w-12 h-3.5 bg-amber-200/70 mx-auto -mt-4 mb-2 rounded-sm shadow-sm transform -rotate-2" />

                {/* Photo Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="pt-3 pb-1 px-1 text-center">
                  <p className="text-sm sm:text-base font-handwriting font-bold text-gray-800 leading-tight">
                    {photo.caption}
                  </p>
                  <span className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider block mt-1">
                    🔍 Tap to zoom
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
