import { useState, useCallback } from "react";

const BUBBLES = [
  { id: 1, x: 30, delay: 0, size: 8 },
  { id: 2, x: 50, delay: 0.3, size: 6 },
  { id: 3, x: 40, delay: 0.6, size: 10 },
  { id: 4, x: 60, delay: 0.9, size: 7 },
  { id: 5, x: 35, delay: 1.2, size: 9 },
  { id: 6, x: 55, delay: 1.5, size: 5 },
  { id: 7, x: 45, delay: 0.2, size: 8 },
  { id: 8, x: 65, delay: 0.8, size: 6 },
];

export default function BeerMug({ onPour }) {
  const [isPouring, setIsPouring] = useState(false);
  const [foamLevel, setFoamLevel] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);

  const handleClick = useCallback(() => {
    if (isPouring) return;

    setIsPouring(true);
    setShowBubbles(true);

    // Pour animation sequence
    let level = 0;
    const pourInterval = setInterval(() => {
      level += 2;
      setFoamLevel(level);

      if (level >= 100) {
        clearInterval(pourInterval);
        setTimeout(() => {
          setIsPouring(false);
          if (onPour) onPour();
        }, 300);
      }
    }, 30);
  }, [isPouring, onPour]);

  return (
    <div className='relative inline-block'>
      <button
        onClick={handleClick}
        disabled={isPouring}
        style={{ background: 'transparent !important' }}
        className={`
          beer-button relative w-48 h-64 cursor-pointer transition-transform duration-300
          ${isPouring ? "scale-110" : "hover:scale-105 active:scale-95"}
          focus:outline-none focus:ring-4 focus:ring-beer-amber-400/50 rounded-xl
        `}
        aria-label='Kliknij, aby nalać piwo'>
        {/* Beer Glass */}
        <svg viewBox='0 0 200 280' className='w-full h-full'>
          {/* Glass body */}
          <defs>
            <linearGradient
              id='glassGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'>
              <stop offset='0%' stopColor='rgba(255,255,255,0.3)' />
              <stop offset='50%' stopColor='rgba(255,255,255,0.1)' />
              <stop offset='100%' stopColor='rgba(255,255,255,0.2)' />
            </linearGradient>
            <linearGradient id='beerGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#f59e0b' />
              <stop offset='100%' stopColor='#b45309' />
            </linearGradient>
            <clipPath id='glassClip'>
              <path d='M30 80 L30 220 Q30 250 60 250 L140 250 Q170 250 170 220 L170 80 Q170 60 140 50 L60 50 Q30 60 30 80 Z' />
            </clipPath>
          </defs>

          {/* Glass outline */}
          <path
            d='M30 80 L30 220 Q30 250 60 250 L140 250 Q170 250 170 220 L170 80 Q170 60 140 50 L60 50 Q30 60 30 80 Z'
            fill='url(#glassGradient)'
            stroke='rgba(255,255,255,0.4)'
            strokeWidth='3'
          />

          {/* Beer liquid with pour animation */}
          <g clipPath='url(#glassClip)'>
            {/* Empty glass */}
            <rect x='30' y='50' width='140' height='200' fill='transparent' />

            {/* Beer level */}
            <rect
              x='30'
              y={250 - foamLevel * 1.8}
              width='140'
              height={foamLevel * 1.8}
              fill='url(#beerGradient)'
              className='transition-all duration-75'
            />

            {/* Foam top */}
            {foamLevel > 0 && (
              <ellipse
                cx='100'
                cy={250 - foamLevel * 1.8 + 5}
                rx='65'
                ry='15'
                fill='#fff5d6'
                className='animate-pulse'
              />
            )}
          </g>

          {/* Glass shine */}
          <path
            d='M45 90 L45 200'
            stroke='rgba(255,255,255,0.4)'
            strokeWidth='8'
            strokeLinecap='round'
            opacity='0.5'
          />

          {/* Handle */}
          <path
            d='M170 100 Q200 100 200 140 Q200 180 170 180'
            fill='none'
            stroke='rgba(255,255,255,0.4)'
            strokeWidth='8'
          />
          <path
            d='M170 110 Q195 110 195 140 Q195 170 170 170'
            fill='rgba(0,0,0,0.1)'
          />
        </svg>

        {/* Bubbles */}
        {showBubbles && foamLevel > 0 && (
          <div className='absolute inset-0 overflow-hidden rounded-xl'>
            {BUBBLES.map((bubble) => (
              <div
                key={bubble.id}
                className='absolute rounded-full bg-white/60 animate-bubble-rise'
                style={{
                  left: `${bubble.x}%`,
                  bottom: "30%",
                  width: bubble.size,
                  height: bubble.size,
                  animationDelay: `${bubble.delay}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        )}

        {/* Pour stream */}
        {isPouring && (
          <div className='absolute -top-12 left-1/2 -translate-x-1/2'>
            <svg width='20' height='50' className='animate-pour'>
              <rect x='5' y='0' width='10' height='50' rx='5' fill='#f59e0b' />
            </svg>
          </div>
        )}
      </button>

      {/* Click hint */}
      <p className='text-white/50 text-sm mt-2 text-center'>
        {isPouring ? "🍺 Leję... 🍺" : "👆 Kliknij, aby nalać!"}
      </p>
    </div>
  );
}
