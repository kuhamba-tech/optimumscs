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
export const SearchIcon = () => (
  <svg viewBox="0 0 64 64" className="icon-stroke approach-neon-icon" aria-hidden="true">
    <defs><linearGradient id="diagnose-icon" x1="12" y1="10" x2="52" y2="54"><stop offset="0%" stopColor="#58e5ff"/><stop offset="100%" stopColor="#51e0b4"/></linearGradient></defs>
    <circle cx="29" cy="29" r="18" stroke="url(#diagnose-icon)" strokeWidth="4"/>
    <path d="m43 43 11 11" stroke="url(#diagnose-icon)" strokeWidth="5"/>
    <path d="M18 30h7l4-9 6 18 4-9h7" stroke="#ffffff" strokeWidth="3"/>
  </svg>
)
export const AnalyzeIcon = () => (
  <svg viewBox="0 0 64 64" className="icon-stroke approach-neon-icon" aria-hidden="true">
    <defs><linearGradient id="analyze-icon" x1="10" y1="12" x2="54" y2="54"><stop offset="0%" stopColor="#58e5ff"/><stop offset="100%" stopColor="#1679ff"/></linearGradient></defs>
    <path d="M12 52h40" stroke="#ffffff" strokeWidth="3"/>
    <path d="M18 52V36M31 52V25M44 52V16" stroke="url(#analyze-icon)" strokeWidth="6"/>
    <path d="m18 34 13-11 13-8 8 6" stroke="#51e0b4" strokeWidth="4"/>
    <circle cx="18" cy="34" r="3" fill="#51e0b4"/><circle cx="31" cy="23" r="3" fill="#51e0b4"/><circle cx="44" cy="15" r="3" fill="#51e0b4"/>
  </svg>
)
export const DesignIcon = () => (
  <svg viewBox="0 0 64 64" className="icon-stroke approach-neon-icon" aria-hidden="true">
    <defs><linearGradient id="design-icon" x1="11" y1="10" x2="53" y2="54"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#58e5ff"/></linearGradient></defs>
    <rect x="15" y="16" width="34" height="34" rx="5" stroke="url(#design-icon)" strokeWidth="4"/>
    <path d="M24 25h16M24 34h25M24 43h11" stroke="#ffffff" strokeWidth="3"/>
    <path d="M45 14 52 7l5 5-7 7-7 2Z" fill="none" stroke="#51e0b4" strokeWidth="4"/>
  </svg>
)
export const ImplementIcon = () => (
  <svg viewBox="0 0 64 64" className="icon-stroke approach-neon-icon" aria-hidden="true">
    <defs><linearGradient id="implement-icon" x1="10" y1="10" x2="54" y2="54"><stop offset="0%" stopColor="#58e5ff"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient></defs>
    <path d="M35 9h-6l-3 8-8 3v6l8 3 3 8h6l3-8 8-3v-6l-8-3Z" stroke="url(#implement-icon)" strokeWidth="4"/>
    <circle cx="32" cy="23" r="7" stroke="#ffffff" strokeWidth="3"/>
    <path d="M17 47h30M24 38v9M40 38v9M47 47l7 7" stroke="#51e0b4" strokeWidth="4"/>
  </svg>
)
export const OptimizeIcon = () => (
  <svg viewBox="0 0 64 64" className="icon-stroke approach-neon-icon" aria-hidden="true">
    <defs><linearGradient id="optimize-icon" x1="10" y1="12" x2="54" y2="54"><stop offset="0%" stopColor="#51e0b4"/><stop offset="100%" stopColor="#1679ff"/></linearGradient></defs>
    <path d="M12 52h40" stroke="#ffffff" strokeWidth="3"/>
    <path d="M18 47V36M30 47V28M42 47V18" stroke="url(#optimize-icon)" strokeWidth="6"/>
    <path d="m16 35 13-11 10 5 14-17" stroke="#51e0b4" strokeWidth="4"/>
    <path d="M48 12h5v5" stroke="#51e0b4" strokeWidth="4"/>
  </svg>
)

export const MoneyIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="url(#g1)" opacity=".95"/><path d="M25 25c0-4 3-7 8-7s8 2 8 6c0 8-16 4-16 12 0 4 4 6 8 6s8-2 8-7M32 14v36" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/><defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0%" stopColor="#8dd364"/><stop offset="100%" stopColor="#3f8b4b"/></linearGradient></defs></svg>
export const TransportIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g2" x1="0" x2="1"><stop offset="0%" stopColor="#2f7bdb"/><stop offset="100%" stopColor="#7acbff"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g2)" opacity=".96"/><path d="M17 37h30M21 24h17l9 9v11H21zM26 46a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm20 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const ChartIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g3" x1="0" x2="1"><stop offset="0%" stopColor="#2266d1"/><stop offset="100%" stopColor="#7ec9ff"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g3)" opacity=".96"/><path d="M18 43h28M22 39V27M31 39V21M40 39V31M20 17l9 8 8-8 7 5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const CogIcon = () => <svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g4" x1="0" x2="1"><stop offset="0%" stopColor="#8dd364"/><stop offset="100%" stopColor="#3f8b4b"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g4)" opacity=".96"/><path d="M31 18h2l2 5 5 2v2l-5 2-2 5h-2l-2-5-5-2v-2l5-2 2-5Zm1 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm12 11 2 2-3 5-3-1-4 2-1 3h-6l-1-3-4-2-3 1-3-5 2-2v-4l-2-2 3-5 3 1 4-2 1-3h6l1 3 4 2 3-1 3 5-2 2Z" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>

const ServiceIconShell = ({ children, gradientId, glowColor = '#1aa8ff', accentColor = '#50e3b7' }) => (
  <svg viewBox="0 0 120 120" className="service-neon-icon" aria-hidden="true">
    <defs>
      <radialGradient id={`${gradientId}-field`} cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor={glowColor} stopOpacity=".24" />
        <stop offset="68%" stopColor="#071d3a" stopOpacity=".26" />
        <stop offset="100%" stopColor="#03112a" stopOpacity=".08" />
      </radialGradient>
      <linearGradient id={`${gradientId}-stroke`} x1="18" y1="16" x2="98" y2="98">
        <stop offset="0%" stopColor="#58e5ff" />
        <stop offset="58%" stopColor="#1679ff" />
        <stop offset="100%" stopColor={accentColor} />
      </linearGradient>
      <linearGradient id={`${gradientId}-fill`} x1="22" y1="18" x2="88" y2="92">
        <stop offset="0%" stopColor={accentColor} />
        <stop offset="100%" stopColor="#1679ff" />
      </linearGradient>
      <filter id={`${gradientId}-soft-glow`} x="-35%" y="-35%" width="170%" height="170%">
        <feGaussianBlur stdDeviation="2.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="60" cy="60" r="51" fill={`url(#${gradientId}-field)`} />
    <circle cx="60" cy="60" r="50" fill="none" stroke={`url(#${gradientId}-stroke)`} strokeWidth="2.6" opacity=".92" />
    <circle cx="60" cy="60" r="42" fill="none" stroke="#2aa8ff" strokeWidth="1.4" opacity=".36" />
    <circle cx="90" cy="22" r="3.4" fill={accentColor} filter={`url(#${gradientId}-soft-glow)`} />
    <g filter={`url(#${gradientId}-soft-glow)`}>{children}</g>
  </svg>
)

export const TmsOptimizationIcon = () => (
  <ServiceIconShell gradientId="tms-service-icon" accentColor="#51e0b4" glowColor="#0abf9f">
    {/* GPS pin – tip at y=78, clear of map card below */}
    <path d="M60 12 C80 12 90 26 90 44 C90 62 60 78 60 78 C60 78 30 62 30 44 C30 26 40 12 60 12 Z"
      fill="url(#tms-service-icon-fill)" />
    <circle cx="60" cy="42" r="14" fill="#071b36" opacity=".86" />
    <circle cx="60" cy="42" r="6" fill="url(#tms-service-icon-fill)" opacity=".92" />
    {/* Map card – starts at y=82, well below pin tip */}
    <rect x="20" y="82" width="80" height="26" rx="5"
      fill="none" stroke="url(#tms-service-icon-stroke)" strokeWidth="4" />
    {/* Dashed road lines inside card */}
    <path d="M30 91 h28 M62 91 h24"
      stroke="#1aa8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" opacity=".55" />
    {/* Route path */}
    <path d="M28 97 C42 90 56 94 70 90 C80 87 88 91 100 88"
      fill="none" stroke="url(#tms-service-icon-stroke)" strokeWidth="3" strokeLinecap="round" />
    {/* Route nodes – clearly inside map card */}
    <circle cx="50" cy="92" r="4.5" fill="#51e0b4" />
    <circle cx="78" cy="89" r="4.5" fill="#51e0b4" />
  </ServiceIconShell>
)

export const AnalyticsServiceIcon = () => (
  <ServiceIconShell gradientId="analytics-service-icon" accentColor="#42d9ff" glowColor="#1679ff">
    {/* Three bars – increasing height left to right */}
    <rect x="20" y="68" width="14" height="20" rx="3" fill="url(#analytics-service-icon-fill)" opacity=".85" />
    <rect x="38" y="52" width="14" height="36" rx="3" fill="url(#analytics-service-icon-fill)" />
    <rect x="56" y="40" width="14" height="48" rx="3" fill="url(#analytics-service-icon-fill)" opacity=".78" />
    {/* Trend line through bar tops */}
    <path d="M27 66 L45 50 L63 38" fill="none" stroke="#58e5ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Trend nodes */}
    <circle cx="27" cy="66" r="5.5" fill="#42d9ff" />
    <circle cx="45" cy="50" r="5.5" fill="#42d9ff" />
    <circle cx="63" cy="38" r="5.5" fill="#42d9ff" />
    {/* Magnifier – stroke only so bars remain visible */}
    <circle cx="78" cy="56" r="21" fill="none" stroke="url(#analytics-service-icon-stroke)" strokeWidth="5.5" />
    {/* Handle */}
    <line x1="93" y1="71" x2="105" y2="83" stroke="#42d9ff" strokeWidth="6.5" strokeLinecap="round" />
  </ServiceIconShell>
)

export const ProcurementServiceIcon = () => (
  <ServiceIconShell gradientId="procurement-service-icon" accentColor="#4fe3c0" glowColor="#168dff">
    {/* Cart handle arm */}
    <path d="M18 30 L34 30 L48 72 L88 72"
      fill="none" stroke="url(#procurement-service-icon-stroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Cart basket */}
    <path d="M40 46 L90 46 L84 70 L46 70 Z"
      fill="none" stroke="url(#procurement-service-icon-stroke)" strokeWidth="4" strokeLinejoin="round" />
    {/* Wheels */}
    <circle cx="54" cy="84" r="8" fill="none" stroke="url(#procurement-service-icon-stroke)" strokeWidth="4.5" />
    <circle cx="78" cy="84" r="8" fill="none" stroke="url(#procurement-service-icon-stroke)" strokeWidth="4.5" />
    {/* 3D box – isometric hexagon, fits inside basket (basket bottom y=70) */}
    <path d="M65 48 L79 56 L79 67 L65 68 L51 67 L51 56 Z"
      fill="url(#procurement-service-icon-fill)" opacity=".25"
      stroke="url(#procurement-service-icon-stroke)" strokeWidth="3" strokeLinejoin="round" />
    {/* Box interior edges for 3D effect */}
    <path d="M51 56 L65 62 L79 56 M65 62 L65 68"
      fill="none" stroke="url(#procurement-service-icon-stroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </ServiceIconShell>
)

export const ErpTransformationIcon = () => (
  <ServiceIconShell gradientId="erp-service-icon" accentColor="#51e0b4" glowColor="#1679ff">
    {/* Monitor frame */}
    <rect x="12" y="18" width="72" height="52" rx="5"
      fill="#050e1f" opacity=".9" stroke="url(#erp-service-icon-stroke)" strokeWidth="4.5" />
    {/* Stand neck + base */}
    <path d="M48 70 v12" stroke="#1679ff" strokeWidth="4" strokeLinecap="round" />
    <path d="M28 82 h44" stroke="#1679ff" strokeWidth="4.5" strokeLinecap="round" />
    {/* Pie – 3 clear segments at center (36,44) r=16 */}
    <path d="M36 44 L36 28 A16 16 0 0 1 52 44 Z" fill="url(#erp-service-icon-fill)" opacity=".96" />
    <path d="M36 44 L52 44 A16 16 0 0 1 36 60 Z" fill="#1679ff" opacity=".72" />
    <path d="M36 44 L36 60 A16 16 0 0 1 20 44 Z" fill="#0c2a5e" stroke="#49d9ff" strokeWidth="1.5" />
    <circle cx="36" cy="44" r="4" fill="#49d9ff" />
    {/* Data lines – right of pie */}
    <path d="M62 26 h16 M62 35 h12 M62 44 h18 M62 53 h9"
      stroke="#49d9ff" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
    {/* Gear – precise 8-tooth polygon, center (83,71) */}
    <path d="M100 71 L92.7 67 L95 59 L87 61.3 L83 54 L79 61.3 L71 59 L73.3 67 L66 71 L73.3 75 L71 83 L79 80.7 L83 88 L87 80.7 L95 83 L92.7 75 Z"
      fill="#071b36" stroke="#51e0b4" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="83" cy="71" r="7" fill="none" stroke="#51e0b4" strokeWidth="3.5" />
    <circle cx="83" cy="71" r="3.5" fill="#51e0b4" />
  </ServiceIconShell>
)

export const FmcgBeverageIcon = () => (
  <svg viewBox="0 0 64 64" className="industry-symbol" aria-hidden="true">
    <rect x="16" y="10" width="32" height="44" rx="5" fill="none" stroke="currentColor" strokeWidth="5" />
    <path d="M24 20h16M24 30h16M24 40h12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M39 43a10 10 0 1 0 14-9v9Z" fill="currentColor" opacity=".95" />
    <path d="M53 34a10 10 0 0 0-10-1v10Z" fill="currentColor" opacity=".55" />
  </svg>
)

export const LogisticsTransportationIcon = () => (
  <svg viewBox="0 0 64 64" className="industry-symbol" aria-hidden="true">
    <path d="M10 34h29V20H20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M39 28h9l8 8v10H39Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
    <path d="M11 46h45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <circle cx="22" cy="48" r="5" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="46" cy="48" r="5" fill="none" stroke="currentColor" strokeWidth="5" />
  </svg>
)

export const SupplyChainTechnologyIcon = () => (
  <svg viewBox="0 0 64 64" className="industry-symbol" aria-hidden="true">
    <rect x="12" y="15" width="40" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
    <path d="M25 55h14M32 47v8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M31 24h4l2 5 5 2v4l-5 2-2 5h-4l-2-5-5-2v-4l5-2Z" fill="currentColor" />
    <circle cx="33" cy="33" r="4" fill="#1f215f" />
  </svg>
)

export const HealthcareDistributionIcon = () => (
  <svg viewBox="0 0 64 64" className="industry-symbol" aria-hidden="true">
    <circle cx="16" cy="22" r="7" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="48" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="34" cy="48" r="7" fill="none" stroke="currentColor" strokeWidth="5" />
    <path d="M23 24h10l8 3M44 35l-6 7M21 30l8 12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 44h10M18 39v10" stroke="#ffc43d" strokeWidth="4" strokeLinecap="round" />
  </svg>
)
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
    <path d="M4.75 6.25h14.5c.96 0 1.75.79 1.75 1.75v8c0 .96-.79 1.75-1.75 1.75H4.75C3.79 17.75 3 16.96 3 16V8c0-.96.79-1.75 1.75-1.75Zm.65 2 6.17 4.37c.26.18.6.18.86 0l6.17-4.37H5.4Zm13.6 1.85-5.42 3.84a2.75 2.75 0 0 1-3.16 0L5 10.1V15.75h14V10.1Z"/>
  </svg>
)
export const PhoneMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M6.28 4h2.85c.78 0 1.46.5 1.68 1.25l.7 2.34c.18.61.02 1.27-.43 1.72l-1.1 1.1a10.5 10.5 0 0 0 4.61 4.61l1.1-1.1c.45-.45 1.11-.61 1.72-.43l2.34.7c.75.22 1.25.9 1.25 1.68v2.85c0 .96-.78 1.74-1.74 1.74C10.54 20.46 3.54 13.46 3.54 4.74 3.54 3.78 4.32 3 5.28 3h1Zm.08 2H5.56C6.16 12.57 11.43 17.84 18 18.44v-2.31l-1.58-.47-1.48 1.48c-.3.3-.76.38-1.14.19A12.5 12.5 0 0 1 6.67 10.2c-.19-.38-.11-.84.19-1.14l1.48-1.48L7.87 6h-1.51Z"/>
  </svg>
)
export const LinkedinMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M5.2 8.9h3.05V19H5.2V8.9Zm1.53-4.9a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.1 8.9h2.93v1.38h.04c.41-.78 1.42-1.6 2.92-1.6 3.12 0 3.7 2.05 3.7 4.72V19h-3.05v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V19H10.1V8.9Z"/>
  </svg>
)
export const XMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M14.25 10.42 21 3h-2.44l-5.42 5.96L9.12 3H3l7 10.36L3.31 21h2.44l5.36-6.1 4.12 6.1H21l-6.75-10.58Zm-2.06 2.34-.75-1.1-4.1-6.05h1.45l3.52 5.21.75 1.1 4.39 6.48H16l-3.81-5.64Z"/>
  </svg>
)
export const FacebookMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M13.35 21v-7.65h2.57l.39-2.98h-2.96V8.47c0-.86.24-1.45 1.48-1.45h1.58V4.36A21.2 21.2 0 0 0 14.1 4c-2.29 0-3.86 1.4-3.86 3.96v2.41H7.65v2.98h2.59V21h3.11Z"/>
  </svg>
)
export const LocationMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M12 2.75A7.1 7.1 0 0 0 4.9 9.85c0 5.12 6.27 10.86 6.54 11.1.32.29.8.29 1.12 0 .27-.24 6.54-5.98 6.54-11.1A7.1 7.1 0 0 0 12 2.75Zm0 15.97c-1.85-1.83-5.1-5.83-5.1-8.87a5.1 5.1 0 0 1 10.2 0c0 3.04-3.25 7.04-5.1 8.87Zm0-11.43a2.72 2.72 0 1 0 0 5.44 2.72 2.72 0 0 0 0-5.44Zm0 3.74a1.02 1.02 0 1 1 0-2.04 1.02 1.02 0 0 1 0 2.04Z"/>
  </svg>
)
export const GitHubMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/>
  </svg>
)
export const VercelMini = () => (
  <svg viewBox="0 0 24 24" className="icon-modern" aria-hidden="true">
    <path d="M12 2L2 19.5h20L12 2Z"/>
  </svg>
)
export const ClockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>
export const PlaneMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="M21 3 3 10l7 2 2 7 9-16ZM10 12l11-9"/></svg>
export const LockMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
export const ChevronDownMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
export const SunMini = () => <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
