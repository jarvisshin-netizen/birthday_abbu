import React from 'react';

export default function Balloons() {
  const balloonList = [
    { color: '#ff6b6b', left: '5%', size: '55px', delay: '0s', dur: '14s' },
    { color: '#f59e0b', left: '15%', size: '65px', delay: '4s', dur: '18s' },
    { color: '#ec4899', left: '28%', size: '50px', delay: '1s', dur: '15s' },
    { color: '#3b82f6', left: '42%', size: '70px', delay: '6s', dur: '17s' },
    { color: '#10b981', left: '58%', size: '58px', delay: '2s', dur: '16s' },
    { color: '#8b5cf6', left: '72%', size: '62px', delay: '5s', dur: '19s' },
    { color: '#f43f5e', left: '85%', size: '52px', delay: '3s', dur: '14s' },
    { color: '#fbbf24', left: '93%', size: '60px', delay: '7s', dur: '16s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloonList.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            backgroundColor: b.color,
            color: b.color,
            left: b.left,
            width: b.size,
            height: `calc(${b.size} * 1.25)`,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  );
}
