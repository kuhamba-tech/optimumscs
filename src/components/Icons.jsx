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

export const MailMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>
export const PhoneMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M6 4h4l2 5-2 2a14 14 0 0 0 3 3l2-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 4 6c0-1 1-2 2-2Z"/></svg>
export const LinkedinMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M7 9v8M7 6.5v.01M12 17V9h4a3 3 0 0 1 3 3v5M12 12a3 3 0 0 1 3-3"/></svg>
export const XMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M4 4l16 16M20 4 4 20"/></svg>
export const FacebookMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M13 20v-7h3l1-3h-4V8.5c0-.93.4-1.5 1.5-1.5H17V4h-2.5C11.8 4 10 5.6 10 8.5V10H7v3h3v7"/></svg>
export const LocationMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
export const ClockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>
export const PlaneMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M21 3 3 10l7 2 2 7 9-16ZM10 12l11-9"/></svg>
export const LockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
export const ChevronDownMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
export const SunMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
