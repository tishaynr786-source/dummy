import React from 'react';

interface B3LogoProps {
  color?: 'gold' | 'silver' | 'both';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function B3Logo({ color = 'gold', className = '', size = 'md' }: B3LogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-xs', stroke: '1.5' },
    md: { box: 'w-11 h-11', text: 'text-lg', stroke: '2' },
    lg: { box: 'w-16 h-16', text: 'text-2xl', stroke: '2.5' },
    xl: { box: 'w-24 h-24', text: 'text-4xl', stroke: '3' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Render SVG with gold or silver gradient
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${currentSize.box} ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Gradient Definitions */}
          <linearGradient id="b3GoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#E5C158" />
          </linearGradient>

          <linearGradient id="b3GoldBorder" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="100%" stopColor="#553C00" />
          </linearGradient>

          {/* Silver Gradient Definitions */}
          <linearGradient id="b3SilverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E1E4E6" />
            <stop offset="55%" stopColor="#A2A8AD" />
            <stop offset="85%" stopColor="#CFD4D8" />
            <stop offset="100%" stopColor="#7F858A" />
          </linearGradient>

          <linearGradient id="b3SilverBorder" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7F858A" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#3A3D40" />
          </linearGradient>

          {/* Deep Luxurious Backing Gradient */}
          <linearGradient id="b3Backing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A0B12" />
            <stop offset="50%" stopColor="#1E050A" />
            <stop offset="100%" stopColor="#0B0103" />
          </linearGradient>

          {/* Metallic Inner Reflection Filter */}
          <filter id="metallicBevel" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting in="blur" specularExponent="25" specularConstant="1.2" surfaceScale="2" lightingColor="#ffffff" result="spec">
              <fePointLight x="-50" y="-50" z="80" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        {/* Outer Hexagon/Crest with luxurious metallic border */}
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          fill="url(#b3Backing)"
          stroke={color === 'gold' ? 'url(#b3GoldBorder)' : 'url(#b3SilverBorder)'}
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Inner concentric ring */}
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke={color === 'gold' ? 'url(#b3GoldBorder)' : 'url(#b3SilverBorder)'}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.8"
        />

        {/* Small decorative crown/fleur-de-lis on top */}
        <g transform="translate(42, 14) scale(0.16)" fill={color === 'gold' ? 'url(#b3GoldGradient)' : 'url(#b3SilverGradient)'}>
          <path d="M50,0 L65,25 L100,10 L80,55 L20,55 L0,10 L35,25 Z" />
          <circle cx="50" cy="-5" r="5" />
          <circle cx="0" cy="5" r="4" />
          <circle cx="100" cy="5" r="4" />
        </g>

        {/* Brand Text B3 with custom premium heavy typography spacing */}
        <g filter="url(#metallicBevel)">
          <text
            x="48"
            y="64"
            fill={color === 'gold' ? 'url(#b3GoldGradient)' : 'url(#b3SilverGradient)'}
            fontFamily="Georgia, serif"
            fontWeight="900"
            fontSize="41"
            letterSpacing="-3"
            textAnchor="middle"
          >
            B3
          </text>
        </g>

        {/* Bottom star emblem */}
        <polygon
          points="50,75 53,81 60,81 55,85 57,91 50,87 43,91 45,85 40,81 47,81"
          fill={color === 'gold' ? 'url(#b3GoldGradient)' : 'url(#b3SilverGradient)'}
        />
      </svg>
    </div>
  );
}
