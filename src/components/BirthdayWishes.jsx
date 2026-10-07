import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Bright multi-color birthday confetti generator
function launchBirthdayConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ff6b6b', '#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#fbbf24', '#f43f5e'];
  const particles = [];
  const particleCount = 200;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.75,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 26,
      vy: -(Math.random() * 20 + 14),
      gravity: 0.38,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      opacity: 1,
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    let activeParticles = 0;
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      if (elapsed > 1800) {
        p.opacity -= 0.015;
      }

      if (p.opacity > 0 && p.y < canvas.height + 50) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    if (activeParticles > 0 && elapsed < 4500) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }

  animate();
}

export default function BirthdayWishes({ onOpenVR }) {
  const [wished, setWished] = useState(false);

  const triggerCelebration = () => {
    setWished(true);
    launchBirthdayConfetti();
    setTimeout(launchBirthdayConfetti, 400);
    setTimeout(launchBirthdayConfetti, 900);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Birthday Cake Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-4"
        >
          <span className="text-5xl sm:text-6xl animate-bounce inline-block">🎂</span>
        </motion.div>

        {/* Grand Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-serif font-black text-gray-900"
        >
          A Birthday Message <br />
          <span className="font-handwriting text-5xl sm:text-7xl text-rose-500 font-bold">
            From Your 2 Daughters ❤️
          </span>
        </motion.h2>

        {/* Heartfelt Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 p-6 sm:p-10 rounded-3xl bg-white border-2 border-rose-200 shadow-[0_15px_35px_rgba(244,63,94,0.12)] text-left relative"
        >
          <div className="text-3xl font-handwriting text-rose-400 absolute top-4 left-6">❝</div>

          <p className="text-base sm:text-xl text-gray-800 font-serif leading-relaxed italic pt-4">
            Dearest Abbu,
            <br /><br />
            You have always lived your life to the absolute fullest—from your mischievous, carefree college days to being the greatest superhero dad in existence.
            <br /><br />
            As your two daughters, we are endlessly blessed to have you as our father. You never made us feel any lesser, you always stood by us like an unbreakable pillar, and you gave us all the happiness in the world.
            <br /><br />
            Thank you for every laugh, every lesson, and every sacrifice. On your 51st birthday, we wish you a lifetime filled with pure joy, boundless health, peace, and endless fun!
          </p>

          <div className="mt-8 text-right border-t border-rose-100 pt-4">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold block">
              Forever Your Biggest Fans,
            </span>
            <span className="text-2xl font-handwriting font-bold text-gray-900 mt-1 block">
              Your 2 Daughters 💕
            </span>
          </div>
        </motion.div>

        {/* Celebratory Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={triggerCelebration}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500 text-white font-bold text-base shadow-[0_10px_25px_rgba(244,63,94,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🎉</span> {wished ? 'Shower Confetti Again!' : 'Shower Birthday Confetti!'}
          </button>

          <button
            onClick={onOpenVR}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 text-white font-bold text-base shadow-[0_10px_25px_rgba(147,51,234,0.3)] hover:bg-purple-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🌌</span> Open 360° Memory VR Room
          </button>
        </motion.div>
      </div>
    </section>
  );
}
