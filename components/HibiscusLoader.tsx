
import React from 'react';

const HibiscusLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#FDF2F2] flex flex-col items-center justify-center z-[100]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Animated Hibiscus Flower via SVG & CSS */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#F472B6] animate-bloom">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
            </filter>
          </defs>
          <g filter="url(#shadow)">
            {/* Petals */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path
                key={i}
                d="M50 50 Q70 10 90 50 T50 90"
                fill="currentColor"
                transform={`rotate(${angle} 50 50)`}
                className={`opacity-80 petal-${i}`}
              />
            ))}
            {/* Center */}
            <circle cx="50" cy="50" r="10" fill="#FDE68A" />
            <path d="M50 50 L50 30" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      <h1 className="playfair text-3xl text-[#F472B6] mt-8 animate-pulse tracking-wide">She Goes</h1>
      <p className="text-[#F472B6]/60 text-sm mt-2 tracking-[0.2em] uppercase">Dreaming to Doing</p>

      <style>{`
        @keyframes bloom {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1); rotate(0deg); opacity: 1; }
        }
        .animate-bloom {
          animation: bloom 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        ${[0, 1, 2, 3, 4].map(i => `
          .petal-${i} {
            animation: petal-sway ${2 + i * 0.2}s ease-in-out infinite alternate;
          }
        `).join('')}
        @keyframes petal-sway {
          from { transform: rotate(var(--angle)) scale(1); }
          to { transform: rotate(var(--angle)) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default HibiscusLoader;
