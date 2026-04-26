import React from 'react'

export const LogoMark = () => (
  <svg viewBox="0 0 120 56" className="logo-mark" aria-hidden="true">
    <defs>
      <linearGradient id="leaf" x1="0" x2="1">
        <stop offset="0%" stopColor="#2ad084" />
        <stop offset="100%" stopColor="#6ea56f" />
      </linearGradient>
      <linearGradient id="orbit" x1="0" x2="1">
        <stop offset="0%" stopColor="#1aa8ff" />
        <stop offset="100%" stopColor="#4b75b8" />
      </linearGradient>
    </defs>
    <path d="M55 10c14 0 30 8 36 19-15 3-35 0-49-7C29 17 22 11 19 7c10 2 23 3 36 3Z" fill="url(#leaf)"/>
    <ellipse cx="34" cy="21" rx="23" ry="13" transform="rotate(-24 34 21)" fill="none" stroke="url(#orbit)" strokeWidth="4"/>
    <ellipse cx="38" cy="24" rx="29" ry="16" transform="rotate(20 38 24)" fill="none" stroke="#84d4ff" strokeWidth="3" opacity=".7"/>
    <circle cx="16" cy="18" r="4" fill="#37d89c"/>
  </svg>
)

export const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8a7 7 0 0 0-14 0"/></svg>
)
export const ArrowRight = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
export const SearchIcon = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.35-4.35"/></svg>
export const AnalyzeIcon = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 19h16M7 16V9M12 16V5M17 16v-4"/></svg>
export const DesignIcon = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="m4 15 7-7 9 9M14 8l2-2a2 2 0 1 1 3 3l-2 2"/></svg>
export const ImplementIcon = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 6V3M12 21v-3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M3 12h3M18 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/><circle cx="12" cy="12" r="4"/></svg>
export const OptimizeIcon = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 18V8M10 18V5M16 18v-7M22 18v-4"/></svg>

export const MoneyIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="url(#g1)" opacity=".95"/><path d="M25 25c0-4 3-7 8-7s8 2 8 6c0 8-16 4-16 12 0 4 4 6 8 6s8-2 8-7M32 14v36" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/><defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0%" stopColor="#8dd364"/><stop offset="100%" stopColor="#3f8b4b"/></linearGradient></defs></svg>
export const TransportIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g2" x1="0" x2="1"><stop offset="0%" stopColor="#2f7bdb"/><stop offset="100%" stopColor="#7acbff"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g2)" opacity=".96"/><path d="M17 37h30M21 24h17l9 9v11H21zM26 46a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm20 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const ChartIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g3" x1="0" x2="1"><stop offset="0%" stopColor="#2266d1"/><stop offset="100%" stopColor="#7ec9ff"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g3)" opacity=".96"/><path d="M18 43h28M22 39V27M31 39V21M40 39V31M20 17l9 8 8-8 7 5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const CogIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g4" x1="0" x2="1"><stop offset="0%" stopColor="#8dd364"/><stop offset="100%" stopColor="#3f8b4b"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g4)" opacity=".96"/><path d="M31 18h2l2 5 5 2v2l-5 2-2 5h-2l-2-5-5-2v-2l5-2 2-5Zm1 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm12 11 2 2-3 5-3-1-4 2-1 3h-6l-1-3-4-2-3 1-3-5 2-2v-4l-2-2 3-5 3 1 4-2 1-3h6l1 3 4 2 3-1 3 5-2 2Z" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const TruckOutline = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g5" x1="0" x2="1"><stop offset="0%" stopColor="#1f68df"/><stop offset="100%" stopColor="#29b2ff"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="url(#g5)" opacity=".16" stroke="#29b2ff" strokeWidth="2"/><path d="M15 35h30V22H28M45 27h7l4 5v3h-11M24 41a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const ScreenIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g6" x1="0" x2="1"><stop offset="0%" stopColor="#f7931e"/><stop offset="100%" stopColor="#f04d16"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="url(#g6)" opacity=".16" stroke="#ff8b29" strokeWidth="2"/><path d="M18 19h28v20H18zM27 45h10M32 39v6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M35 25h4l1 3 2 1v4l-2 1-1 3h-4l-1-3-2-1v-4l2-1 1-3Zm2 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="#fff" opacity=".95"/></svg>
export const RouteIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g7" x1="0" x2="1"><stop offset="0%" stopColor="#2ad084"/><stop offset="100%" stopColor="#5ccf62"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="url(#g7)" opacity=".16" stroke="#5ad07a" strokeWidth="2"/><path d="M23 17a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm18 20a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm10-12a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="none" stroke="#fff" strokeWidth="3"/><path d="M27 22h10c4 0 7 3 7 7v3M37 42H24c-4 0-7-3-7-7v-5" fill="none" stroke="#ffc83d" strokeWidth="3" strokeDasharray="4 5" strokeLinecap="round"/></svg>
export const ClipboardIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g8" x1="0" x2="1"><stop offset="0%" stopColor="#8a2be2"/><stop offset="100%" stopColor="#dc4fff"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="url(#g8)" opacity=".16" stroke="#d046ff" strokeWidth="2"/><rect x="20" y="18" width="24" height="30" rx="4" fill="none" stroke="#fff" strokeWidth="3"/><path d="M27 18h10v6H27zM25 31h14M25 37h14M25 43h10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>

export const CalendarMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>
export const FilterMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 5h16M7 12h10M10 19h4"/></svg>
export const PinMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
export const BriefMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2ZM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 12h16"/></svg>

export const MailMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M4.75 6h14.5A1.75 1.75 0 0 1 21 7.75v8.5A1.75 1.75 0 0 1 19.25 18H4.75A1.75 1.75 0 0 1 3 16.25v-8.5A1.75 1.75 0 0 1 4.75 6Zm.6 2.1 6.22 4.66a.72.72 0 0 0 .86 0l6.22-4.66H5.35Zm13.9 1.7-5.62 4.2a2.72 2.72 0 0 1-3.26 0L4.75 9.8v6.45h14.5V9.8Z"/>
  </svg>
)
export const PhoneMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M6.34 4.25h3.14c.74 0 1.39.48 1.61 1.18l.82 2.6a1.7 1.7 0 0 1-.43 1.7l-1.33 1.33a10.8 10.8 0 0 0 4.79 4.79l1.33-1.33a1.7 1.7 0 0 1 1.7-.43l2.6.82c.7.22 1.18.87 1.18 1.61v3.14c0 .94-.76 1.7-1.7 1.7A17.4 17.4 0 0 1 2.95 6c0-.97.78-1.75 1.75-1.75h1.64Zm.2 2H4.98A15.4 15.4 0 0 0 19.75 19v-2.25l-2.13-.67-1.72 1.72a1 1 0 0 1-1.08.22A12.8 12.8 0 0 1 5.98 9.18a1 1 0 0 1 .22-1.08l1.72-1.72-.67-2.13h-.71Z"/>
  </svg>
)
export const LinkedinMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M5.2 8.9h3.05V19H5.2V8.9Zm1.53-4.9a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.1 8.9h2.93v1.38h.04c.41-.78 1.42-1.6 2.92-1.6 3.12 0 3.7 2.05 3.7 4.72V19h-3.05v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V19H10.1V8.9Z"/>
  </svg>
)
export const XMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M13.58 10.62 20.16 3h-2.06l-5.44 6.3L8.31 3H3l6.9 9.97L3 21h2.06l5.76-6.68L15.4 21h5.3l-7.12-10.38Zm-2.04 2.36-.67-.95-5.56-7.4h2.02l4.28 5.69.66.95 5.85 7.78h-2.02l-4.56-6.07Z"/>
  </svg>
)
export const FacebookMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M13.35 21v-7.65h2.57l.39-2.98h-2.96V8.47c0-.86.24-1.45 1.48-1.45h1.58V4.36A21.2 21.2 0 0 0 14.1 4c-2.29 0-3.86 1.4-3.86 3.96v2.41H7.65v2.98h2.59V21h3.11Z"/>
  </svg>
)
export const LocationMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M12 2.75A7.25 7.25 0 0 0 4.75 10c0 5.08 6.32 10.68 6.59 10.92a1 1 0 0 0 1.32 0c.27-.24 6.59-5.84 6.59-10.92A7.25 7.25 0 0 0 12 2.75Zm0 16.05C10.1 16.96 6.75 12.98 6.75 10a5.25 5.25 0 1 1 10.5 0c0 2.98-3.35 6.96-5.25 8.8ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 4.1a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"/>
  </svg>
)
export const ClockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>
export const PlaneMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M21 3 3 10l7 2 2 7 9-16ZM10 12l11-9"/></svg>
export const LockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
export const ChevronDownMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
export const SunMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
