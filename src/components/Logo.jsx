import { useId } from 'react';

export default function Logo({ variant = 'dark' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `logo-gradient-${uid}`;

  return (
    <span className={`logo logo--${variant}`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="40" height="40" focusable="false">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1769FF" />
              <stop offset="100%" stopColor="#19C6D9" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
          <path d="M12 26 L20 14 L28 26" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.92" />
          <circle cx="12" cy="26" r="3.2" fill="#FFFFFF" />
          <circle cx="20" cy="14" r="3.2" fill="#FFFFFF" />
          <circle cx="28" cy="26" r="3.2" fill="#FFFFFF" />
        </svg>
      </span>
      <span className="logo__text">
        <span className="logo__name">
          Awera<strong>Link</strong>
        </span>
        <span className="logo__sub">TECHNOLOGIES PLC</span>
      </span>
    </span>
  );
}
