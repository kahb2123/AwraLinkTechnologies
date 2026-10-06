import { useId } from 'react';

const RACK_UNITS = [104, 158, 212, 266];

export default function AboutVisual({ className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const bgId = `av-bg-${uid}`;
  const dotsId = `av-dots-${uid}`;
  const glowId = `av-glow-${uid}`;

  return (
    <svg viewBox="0 0 600 480" className={className} role="img" aria-label="Illustration of a data center rack connected to security, network, and power systems">
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="100%" stopColor="#143A6E" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1769FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1769FF" stopOpacity="0" />
        </radialGradient>
        <pattern id={dotsId} width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.09" />
        </pattern>
      </defs>

      <rect x="8" y="8" width="584" height="464" rx="34" fill={`url(#${bgId})`} />
      <rect x="8" y="8" width="584" height="464" rx="34" fill={`url(#${dotsId})`} />
      <circle cx="180" cy="240" r="190" fill={`url(#${glowId})`} />

      <line x1="60" y1="420" x2="540" y2="420" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="6 8" />

      <path d="M278 190 C 340 190, 330 110, 396 110" fill="none" stroke="#19C6D9" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M278 240 C 350 240, 340 240, 400 240" fill="none" stroke="#19C6D9" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M278 290 C 340 290, 330 380, 396 380" fill="none" stroke="#19C6D9" strokeOpacity="0.45" strokeWidth="2" />

      <rect x="88" y="80" width="190" height="330" rx="18" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      <rect x="104" y="92" width="60" height="6" rx="3" fill="#FFFFFF" opacity="0.18" />
      {RACK_UNITS.map((y, index) => (
        <g key={y}>
          <rect x="104" y={y} width="158" height="46" rx="8" fill="#0B1F3A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="120" y1={y + 10} x2="120" y2={y + 36} stroke="#2A4A7F" strokeWidth="2" strokeLinecap="round" />
          <line x1="129" y1={y + 10} x2="129" y2={y + 36} stroke="#2A4A7F" strokeWidth="2" strokeLinecap="round" />
          <line x1="138" y1={y + 10} x2="138" y2={y + 36} stroke="#2A4A7F" strokeWidth="2" strokeLinecap="round" />
          <rect x="150" y={y + 12} width="62" height="5" rx="2.5" fill="#19C6D9" opacity={index === 1 ? 0.5 : 0.25} />
          <rect x="150" y={y + 22} width="44" height="5" rx="2.5" fill="#1769FF" opacity={index === 2 ? 0.5 : 0.25} />
          <circle cx="238" cy={y + 14} r="3" fill="#19C6D9" />
          <circle cx="250" cy={y + 14} r="3" fill="#1769FF" />
          <circle cx="262" cy={y + 14} r="3" fill="#FFFFFF" opacity="0.5" />
        </g>
      ))}

      <g>
        <rect x="404" y="68" width="84" height="84" rx="18" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        <path d="M446 86 L462 93 V105 C462 118 456 126 446 131 C436 126 430 118 430 105 V93 Z" fill="none" stroke="#7FB3FF" strokeWidth="2" strokeLinejoin="round" />
        <path d="M438 106 L443 111 L455 99" stroke="#19C6D9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g>
        <rect x="410" y="198" width="84" height="84" rx="18" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        <rect x="420" y="220" width="64" height="48" rx="8" fill="none" stroke="#7FB3FF" strokeWidth="2" />
        {[0, 1].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect key={`${row}-${col}`} x={426 + col * 13} y={228 + row * 15} width="7" height="7" rx="1.5" fill="none" stroke="#19C6D9" strokeWidth="1.4" />
          ))
        )}
        <circle cx="477" cy="228" r="2.6" fill="#19C6D9" />
        <circle cx="477" cy="236" r="2.6" fill="#1769FF" />
      </g>

      <g>
        <rect x="404" y="338" width="84" height="84" rx="18" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        <path d="M452 354 L432 386 H444 L440 410 L464 378 H452 Z" fill="none" stroke="#19C6D9" strokeWidth="2" strokeLinejoin="round" />
      </g>

      <g className="svg-float">
        <rect x="428" y="36" width="128" height="46" rx="12" fill="#FFFFFF" opacity="0.96" />
        <circle cx="448" cy="59" r="9" fill="#1769FF" />
        <rect x="464" y="50" width="74" height="7" rx="3.5" fill="#182230" opacity="0.75" />
        <rect x="464" y="63" width="50" height="6" rx="3" fill="#667085" opacity="0.55" />
      </g>
      <g className="svg-float svg-float--delay">
        <rect x="48" y="366" width="140" height="46" rx="12" fill="#FFFFFF" opacity="0.96" />
        <circle cx="68" cy="389" r="9" fill="#19C6D9" />
        <rect x="84" y="380" width="84" height="7" rx="3.5" fill="#182230" opacity="0.75" />
        <rect x="84" y="393" width="58" height="6" rx="3" fill="#667085" opacity="0.55" />
      </g>
    </svg>
  );
}
