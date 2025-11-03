import React from 'react';

export const RectangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
);

export const OctagonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    </svg>
);

export const HexagonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
);


// New Detailed Deck Images for Hover Effect

export const RectangleDeckImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="woodGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <g filter="url(#shadow)">
      <rect x="5" y="5" width="90" height="60" rx="5" fill="url(#woodGradient)" stroke="#654321" strokeWidth="1"/>
      {[...Array(9)].map((_, i) => (
        <line key={i} x1={15 + i * 8} y1="5" x2={15 + i * 8} y2="65" stroke="#654321" strokeWidth="0.5" />
      ))}
    </g>
  </svg>
);

export const HexagonDeckImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
     <defs>
      <linearGradient id="woodGradientHex" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
       <filter id="shadowHex" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <g transform="translate(50 50) scale(0.9)" filter="url(#shadowHex)">
      <polygon 
        points="50,0 25,43.3 -25,43.3 -50,0 -25,-43.3 25,-43.3" 
        fill="url(#woodGradientHex)"
        stroke="#654321" strokeWidth="1"
      />
      <path d="M-50 0 L 50 0 M-37.5 21.65 L 37.5 21.65 M-25 43.3 L 25 43.3 M-37.5 -21.65 L 37.5 -21.65 M-25 -43.3 L 25 -43.3" stroke="#654321" strokeWidth="0.5" />
    </g>
  </svg>
);

export const OctagonDeckImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="woodGradientOct" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
      <filter id="shadowOct" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
      </filter>
      <clipPath id="octagonClipPath">
          <polygon points="50,5 81.8,18.2 95,50 81.8,81.8 50,95 18.2,81.8 5,50 18.2,18.2" />
      </clipPath>
    </defs>
    <g filter="url(#shadowOct)">
      {/* Deck Base */}
      <polygon 
        points="50,5 81.8,18.2 95,50 81.8,81.8 50,95 18.2,81.8 5,50 18.2,18.2"
        fill="url(#woodGradientOct)"
        stroke="#654321"
        strokeWidth="1"
      />
      {/* Deck Boards */}
      <g clipPath="url(#octagonClipPath)">
        {[...Array(11)].map((_, i) => (
          <line key={i} x1="5" y1={10 + i * 8} x2="95" y2={10 + i * 8} stroke="#654321" strokeWidth="0.75" />
        ))}
      </g>
       {/* Railing */}
       <polygon 
        points="50,5 81.8,18.2 95,50 81.8,81.8 50,95 18.2,81.8 5,50 18.2,18.2"
        fill="none"
        stroke="#4a2c13"
        strokeWidth="2"
      />
    </g>
  </svg>
);
