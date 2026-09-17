import React from 'react';

export default function OyeLogo({ isMobile = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', userSelect: 'none', flexShrink: 0 }}>
      {/* Luxury Architectural Geometric Emblem */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(11, 28, 61, 0.18))' }}
      >
        <defs>
          <linearGradient id="oyeNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b1c3d" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="oyeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="oyeCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>

        {/* Outer Rounded Shield Frame */}
        <rect x="2" y="2" width="96" height="96" rx="24" fill="url(#oyeNavyGrad)" />

        {/* Luxury Architectural Tower Pinnacles */}
        <path
          d="M26 72V42L42 26V72H26Z"
          fill="url(#oyeCyanGrad)"
          opacity="0.95"
        />
        <path
          d="M46 72V18L68 36V72H46Z"
          fill="#ffffff"
        />
        <path
          d="M72 72V46L82 54V72H72Z"
          fill="url(#oyeGoldGrad)"
        />
        <circle cx="68" cy="24" r="7" fill="url(#oyeGoldGrad)" />
        <rect x="22" y="75" width="56" height="4" rx="2" fill="url(#oyeGoldGrad)" />
      </svg>

      {/* Typography: Oye Properties */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '3px',
          lineHeight: 1
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 900,
            color: 'var(--accent-primary)',
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap'
          }}>
            Oye
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 700,
            color: '#2563eb',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}>
            Properties
          </span>
        </div>
        <div 
          className="hidden-mobile"
          style={{
            fontSize: '8px',
            fontWeight: 800,
            color: 'var(--text-muted)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: '2px',
            whiteSpace: 'nowrap'
          }}
        >
          Real Estate Portal
        </div>
      </div>
    </div>
  );
}
