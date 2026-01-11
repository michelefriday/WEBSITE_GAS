import React from 'react';

// Using the custom font "Bourbon St Bold" as requested.
// Retaining the subtle SVG distortion for the "liquid/bubble" vibe unless requested otherwise.
export const Logo: React.FC = () => {
  return (
    <div className="select-none pointer-events-none">
      <svg viewBox="0 0 400 80" className="w-[200px] h-auto md:w-[300px]">
        <defs>
          <filter id="distort">
             <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="warp" />
             <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="2" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          className="fill-black text-6xl tracking-tight ff-garamond"
          style={{ 
            fontWeight: 'bold' 
          }}
        >
          friday
        </text>
      </svg>
    </div>
  );
};
