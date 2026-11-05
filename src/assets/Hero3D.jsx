import { useEffect, useRef } from 'react';

export default function Hero3D({ className = '' }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--rx', `${-y * 6}deg`);
      el.style.setProperty('--ry', `${x * 8}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={`hero3d ${className}`} aria-hidden="true">
      <div className="hero3d__scene">
        <div className="hero3d__layer hero3d__layer--back">
          <svg viewBox="0 0 600 520" className="hero3d__svg" role="presentation">
            <defs>
              <linearGradient id="h3d-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B1F3A" />
                <stop offset="100%" stopColor="#143A6E" />
              </linearGradient>
              <radialGradient id="h3d-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#19C6D9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#19C6D9" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="8" y="8" width="584" height="504" rx="34" fill="url(#h3d-bg)" />
            <circle cx="300" cy="264" r="215" fill="url(#h3d-glow)" />
            <g className="hero3d__dots" fill="#FFFFFF" opacity="0.08">
              {Array.from({ length: 120 }).map((_, i) => {
                const x = (i * 37) % 584;
                const y = (i * 53) % 504;
                return <circle key={i} cx={x + 8} cy={y + 8} r="1.2" />;
              })}
            </g>
          </svg>
        </div>

        <div className="hero3d__layer hero3d__layer--mid">
          <svg viewBox="0 0 600 520" className="hero3d__svg" role="presentation">
            <g className="hero3d__links">
              <line x1="300" y1="264" x2="148" y2="186" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="300" y1="264" x2="452" y2="186" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="300" y1="264" x2="148" y2="348" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="300" y1="264" x2="452" y2="348" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="300" y1="264" x2="300" y2="104" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="300" y1="264" x2="300" y2="424" stroke="#19C6D9" strokeWidth="1.5" strokeOpacity="0.5" />
            </g>
            <g className="hero3d__trail hero3d__trail--1">
              <circle cx="0" cy="0" r="3" fill="#19C6D9" />
            </g>
            <g className="hero3d__trail hero3d__trail--2">
              <circle cx="0" cy="0" r="3" fill="#1769FF" />
            </g>
            <g className="hero3d__trail hero3d__trail--3">
              <circle cx="0" cy="0" r="3" fill="#19C6D9" />
            </g>
          </svg>
        </div>

        <div className="hero3d__layer hero3d__layer--front">
          <svg viewBox="0 0 600 520" className="hero3d__svg" role="presentation">
            <g className="hero3d__core">
              <circle className="hero3d__pulse" cx="300" cy="264" r="52" fill="none" stroke="url(#h3d-chip)" strokeWidth="2" opacity="0.65" />
              <circle cx="300" cy="264" r="40" fill="#0F2E5C" stroke="#1769FF" strokeWidth="2.5" />
              <path d="M285 274 L300 252 L315 274" stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="285" cy="274" r="4.5" fill="#FFFFFF" />
              <circle cx="300" cy="252" r="4.5" fill="#FFFFFF" />
              <circle cx="315" cy="274" r="4.5" fill="#FFFFFF" />
            </g>
            <defs>
              <linearGradient id="h3d-chip" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1769FF" />
                <stop offset="100%" stopColor="#19C6D9" />
              </linearGradient>
            </defs>

            {[
              { x: 300, y: 104, color: '#1769FF' },
              { x: 452, y: 186, color: '#19C6D9' },
              { x: 452, y: 348, color: '#1769FF' },
              { x: 300, y: 424, color: '#19C6D9' },
              { x: 148, y: 348, color: '#1769FF' },
              { x: 148, y: 186, color: '#19C6D9' },
            ].map((n, i) => (
              <g key={i} transform={`translate(${n.x - 34} ${n.y - 34})`}>
                <rect width="68" height="68" rx="16" fill="#0E2A52" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                <circle cx="34" cy="34" r="8" fill={n.color} opacity="0.9" />
                <rect x="14" y="22" width="40" height="3" rx="1.5" fill="#7FB3FF" opacity="0.6" />
                <rect x="14" y="30" width="28" height="3" rx="1.5" fill="#7FB3FF" opacity="0.4" />
                <rect x="14" y="44" width="40" height="3" rx="1.5" fill="#7FB3FF" opacity="0.6" />
              </g>
            ))}
          </svg>
        </div>

        <div className="hero3d__floats">
          <div className="hero3d__float hero3d__float--one">
            <span className="hero3d__dot hero3d__dot--blue" />
            <span className="hero3d__float-text">
              Network Security
              <small>Firewall &amp; perimeter protection</small>
            </span>
          </div>
          <div className="hero3d__float hero3d__float--two">
            <span className="hero3d__dot hero3d__dot--cyan" />
            <span className="hero3d__float-text">
              Power Continuity
              <small>UPS &amp; backup power systems</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}