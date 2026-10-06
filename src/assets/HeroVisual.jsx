import { useId } from 'react';

const GLYPHS = {
  server: (
    <>
      <rect x="16" y="18" width="36" height="12" rx="3" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <rect x="16" y="38" width="36" height="12" rx="3" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <circle cx="22" cy="24" r="1.8" fill="#19C6D9" />
      <circle cx="22" cy="44" r="1.8" fill="#19C6D9" />
      <line x1="28" y1="24" x2="46" y2="24" stroke="#7FB3FF" strokeWidth="1.6" opacity="0.6" />
      <line x1="28" y1="44" x2="46" y2="44" stroke="#7FB3FF" strokeWidth="1.6" opacity="0.6" />
    </>
  ),
  monitor: (
    <>
      <rect x="14" y="18" width="40" height="26" rx="4" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <path d="M20 36 L28 28 L34 33 L42 24 L48 29" stroke="#19C6D9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="26" y1="44" x2="26" y2="50" stroke="#7FB3FF" strokeWidth="2" />
      <line x1="18" y1="52" x2="50" y2="52" stroke="#7FB3FF" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  shield: (
    <>
      <path d="M34 14 L48 20 V32 C48 43 42 50 34 54 C26 50 20 43 20 32 V20 Z" fill="none" stroke="#7FB3FF" strokeWidth="2" strokeLinejoin="round" />
      <path d="M27 34 L32 39 L42 28" stroke="#19C6D9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cloud: (
    <>
      <circle cx="28" cy="36" r="9" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <circle cx="40" cy="32" r="7" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <line x1="20" y1="44" x2="48" y2="44" stroke="#7FB3FF" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  zap: (
    <path d="M37 14 L22 36 H31 L29 54 L46 30 H36 Z" fill="none" stroke="#19C6D9" strokeWidth="2" strokeLinejoin="round" />
  ),
  globe: (
    <>
      <circle cx="34" cy="34" r="16" fill="none" stroke="#7FB3FF" strokeWidth="2" />
      <ellipse cx="34" cy="34" rx="7" ry="16" fill="none" stroke="#7FB3FF" strokeWidth="1.6" />
      <line x1="18" y1="34" x2="50" y2="34" stroke="#7FB3FF" strokeWidth="1.6" />
      <line x1="22" y1="26" x2="46" y2="26" stroke="#7FB3FF" strokeWidth="1.4" opacity="0.7" />
      <line x1="22" y1="42" x2="46" y2="42" stroke="#7FB3FF" strokeWidth="1.4" opacity="0.7" />
    </>
  ),
};

const SATELLITES = [
  { x: 300, y: 104, glyph: 'server' },
  { x: 452, y: 186, glyph: 'monitor' },
  { x: 452, y: 348, glyph: 'shield' },
  { x: 300, y: 424, glyph: 'cloud' },
  { x: 148, y: 348, glyph: 'zap' },
  { x: 148, y: 186, glyph: 'globe' },
];

export default function HeroVisual({ className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const bgId = `hv-bg-${uid}`;
  const chipId = `hv-chip-${uid}`;
  const glowId = `hv-glow-${uid}`;
  const dotsId = `hv-dots-${uid}`;

  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="Illustration of connected enterprise technology infrastructure">
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="100%" stopColor="#143A6E" />
        </linearGradient>
        <linearGradient id={chipId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1769FF" />
          <stop offset="100%" stopColor="#19C6D9" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#19C6D9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#19C6D9" stopOpacity="0" />
        </radialGradient>
        <pattern id={dotsId} width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.09" />
        </pattern>
      </defs>

      <rect x="8" y="8" width="584" height="504" rx="34" fill={`url(#${bgId})`} />
      <rect x="8" y="8" width="584" height="504" rx="34" fill={`url(#${dotsId})`} />
      <circle cx="300" cy="264" r="215" fill={`url(#${glowId})`} />

      {SATELLITES.map((satellite) => (
        <line key={`line-${satellite.glyph}`} x1="300" y1="264" x2={satellite.x} y2={satellite.y} stroke="#19C6D9" strokeOpacity="0.4" strokeWidth="2" />
      ))}
      {SATELLITES.map((satellite) => (
        <circle key={`node-${satellite.glyph}`} cx={satellite.x} cy={satellite.y} r="4" fill="#19C6D9" />
      ))}

      <circle className="svg-pulse" cx="300" cy="264" r="52" fill="none" stroke={`url(#${chipId})`} strokeWidth="2" opacity="0.65" />
      <circle cx="300" cy="264" r="40" fill="#0F2E5C" stroke="#1769FF" strokeWidth="2.5" />
      <path d="M285 274 L300 252 L315 274" stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="285" cy="274" r="4.5" fill="#FFFFFF" />
      <circle cx="300" cy="252" r="4.5" fill="#FFFFFF" />
      <circle cx="315" cy="274" r="4.5" fill="#FFFFFF" />

      {SATELLITES.map((satellite) => (
        <g key={`box-${satellite.glyph}`} transform={`translate(${satellite.x - 34} ${satellite.y - 34})`}>
          <rect width="68" height="68" rx="16" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
          {GLYPHS[satellite.glyph]}
        </g>
      ))}

      <g className="svg-float">
        <rect x="418" y="42" width="132" height="46" rx="12" fill="#FFFFFF" opacity="0.96" />
        <circle cx="438" cy="65" r="9" fill="#1769FF" />
        <rect x="454" y="56" width="76" height="7" rx="3.5" fill="#182230" opacity="0.75" />
        <rect x="454" y="69" width="52" height="6" rx="3" fill="#667085" opacity="0.55" />
      </g>
      <g className="svg-float svg-float--delay">
        <rect x="52" y="398" width="140" height="46" rx="12" fill="#FFFFFF" opacity="0.96" />
        <circle cx="72" cy="421" r="9" fill="#19C6D9" />
        <rect x="88" y="412" width="84" height="7" rx="3.5" fill="#182230" opacity="0.75" />
        <rect x="88" y="425" width="58" height="6" rx="3" fill="#667085" opacity="0.55" />
      </g>
    </svg>
  );
}
