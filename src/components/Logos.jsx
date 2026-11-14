import React from 'react';

// Housebets Official Logo with 3D Wave
export const HousebetsLogo = ({ className = "h-8" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <span className="text-xl sm:text-2xl font-black tracking-tight font-sans flex items-center">
      <span className="text-[#00F5D4]">House</span>
      <span className="text-white">bets</span>
    </span>
    {/* Stylized Cyan Wave */}
    <div className="relative w-8 h-8 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]" fill="none">
        <defs>
          <linearGradient id="wavePrimary" x1="10%" y1="20%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#48CAE4" />
            <stop offset="50%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0077B6" />
          </linearGradient>
          <linearGradient id="foamWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CAF0F8" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Main curling wave body */}
        <path
          d="M15,75 C25,75 35,68 45,55 C55,42 68,22 82,25 C92,27 96,38 90,48 C85,56 72,62 62,58 C52,54 48,44 54,38 C58,34 65,36 66,41 C67,45 62,48 59,46"
          stroke="url(#wavePrimary)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Wave white foam crest */}
        <path
          d="M20,80 C32,80 40,72 50,60 C60,48 72,32 84,33 C88,34 90,39 88,43 C85,47 78,50 72,48"
          stroke="url(#foamWhite)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Spray droplets */}
        <circle cx="88" cy="22" r="3" fill="#CAF0F8" />
        <circle cx="95" cy="30" r="2" fill="#00A3FF" />
        <circle cx="78" cy="18" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  </div>
);

// High-fidelity SVG Crests for Football Clubs and Nations
export const TeamCrest = ({ teamName, className = "w-6 h-6" }) => {
  const name = (teamName || '').toLowerCase();

  // 1. Arsenal
  if (name.includes('arsenal')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        {/* Red Shield */}
        <path d="M50,5 L88,15 L82,68 C80,82 50,95 50,95 C50,95 20,82 18,68 L12,15 Z" fill="#DB0007" stroke="#9C824A" strokeWidth="3" />
        {/* Blue Side Borders */}
        <path d="M50,12 L82,20 L76,64 C74,74 50,86 50,86 Z" fill="#023474" opacity="0.3" />
        {/* Golden Cannon */}
        <rect x="28" y="44" width="44" height="12" rx="3" fill="#9C824A" />
        <circle cx="68" cy="50" r="8" fill="#FDB913" stroke="#9C824A" strokeWidth="2" />
        <rect x="25" y="42" width="10" height="16" rx="2" fill="#FDB913" />
        <circle cx="48" cy="50" r="4" fill="#9C824A" />
      </svg>
    );
  }

  // 2. Brighton & Hove Albion
  if (name.includes('brighton')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        {/* Blue Circle */}
        <circle cx="50" cy="50" r="45" fill="#0057B8" stroke="#ffffff" strokeWidth="4" />
        <circle cx="50" cy="50" r="38" fill="#ffffff" />
        <circle cx="50" cy="50" r="32" fill="#0057B8" />
        {/* White Seagull silhouette */}
        <path d="M30,52 Q45,35 55,48 Q68,40 78,45 Q64,56 52,52 Q40,62 30,52 Z" fill="#ffffff" />
        <circle cx="72" cy="44" r="1.5" fill="#FFCD00" />
      </svg>
    );
  }

  // 3. Manchester City
  if (name.includes('manchester city') || name.includes('man city')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <circle cx="50" cy="50" r="46" fill="#6CABDD" stroke="#1C2C5B" strokeWidth="4" />
        <circle cx="50" cy="50" r="36" fill="#ffffff" stroke="#1C2C5B" strokeWidth="2" />
        {/* Ship */}
        <path d="M34,42 L66,42 L60,54 L40,54 Z" fill="#F1A035" />
        <path d="M42,32 L58,32 L50,40 Z" fill="#F1A035" />
        {/* Red Rose */}
        <circle cx="50" cy="64" r="6" fill="#DA291C" />
      </svg>
    );
  }

  // 4. Liverpool
  if (name.includes('liverpool')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L85,18 L80,72 C78,85 50,94 50,94 C50,94 22,85 20,72 L15,18 Z" fill="#C8102E" stroke="#00B2A9" strokeWidth="3" />
        {/* Golden Liver Bird */}
        <path d="M48,32 Q58,26 56,38 Q65,36 62,48 Q55,54 52,65 L46,65 Q45,55 42,48 Q36,44 44,38 Z" fill="#F6EB61" />
        <circle cx="52" cy="30" r="3" fill="#F6EB61" />
      </svg>
    );
  }

  // 5. Manchester United
  if (name.includes('manchester united') || name.includes('man utd')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L88,18 L82,72 C80,85 50,94 50,94 C50,94 18,85 18,72 L12,18 Z" fill="#DA291C" stroke="#FFE500" strokeWidth="3" />
        <rect x="22" y="32" width="56" height="26" fill="#FFE500" rx="3" />
        {/* Red Devil */}
        <path d="M44,40 Q50,34 56,40 L54,54 L46,54 Z" fill="#DA291C" />
        <circle cx="50" cy="38" r="4" fill="#DA291C" />
      </svg>
    );
  }

  // 6. Real Madrid
  if (name.includes('real madrid')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <circle cx="50" cy="54" r="38" fill="#ffffff" stroke="#FEBE10" strokeWidth="4" />
        {/* Crown */}
        <path d="M26,24 L34,36 L50,22 L66,36 L74,24 L70,38 L30,38 Z" fill="#FEBE10" />
        <circle cx="50" cy="19" r="4" fill="#FEBE10" />
        {/* Purple diagonal sash */}
        <path d="M22,66 L66,22 L76,32 L32,76 Z" fill="#5D2A84" />
        <circle cx="50" cy="54" r="30" fill="none" stroke="#FEBE10" strokeWidth="2" />
      </svg>
    );
  }

  // 7. Bayern Munich
  if (name.includes('bayern')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <circle cx="50" cy="50" r="46" fill="#DC052D" stroke="#0066B2" strokeWidth="5" />
        <circle cx="50" cy="50" r="36" fill="#ffffff" />
        {/* Bavarian blue diamonds pattern */}
        <g transform="translate(24, 24) scale(0.52)">
          <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="#0066B2" />
          <path d="M75,0 L100,25 L75,50 L50,25 Z" fill="#0066B2" />
          <path d="M50,50 L75,75 L50,100 L25,75 Z" fill="#0066B2" />
        </g>
      </svg>
    );
  }

  // 8. Aston Villa
  if (name.includes('aston villa')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L85,18 L80,72 C78,85 50,94 50,94 C50,94 20,85 20,72 L15,18 Z" fill="#670E36" stroke="#95BFE5" strokeWidth="4" />
        {/* Yellow Lion */}
        <path d="M42,34 Q56,30 54,45 Q64,42 60,56 Q52,65 44,65 L40,52 Z" fill="#FEE12B" />
        <circle cx="50" cy="32" r="3" fill="#FEE12B" />
      </svg>
    );
  }

  // 9. Newcastle United
  if (name.includes('newcastle')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,10 L84,20 L80,70 C78,82 50,92 50,92 C50,92 20,82 20,70 L16,20 Z" fill="#241F20" stroke="#41B6E6" strokeWidth="3" />
        {/* Black and white stripes */}
        <rect x="30" y="24" width="8" height="50" fill="#ffffff" />
        <rect x="46" y="24" width="8" height="50" fill="#ffffff" />
        <rect x="62" y="24" width="8" height="50" fill="#ffffff" />
      </svg>
    );
  }

  // 10. Fulham
  if (name.includes('fulham')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,10 L85,20 L80,70 C78,82 50,92 50,92 C50,92 20,82 20,70 L15,20 Z" fill="#ffffff" stroke="#CC0000" strokeWidth="4" />
        <text x="50" y="60" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="28">FFC</text>
      </svg>
    );
  }

  // 11. Everton
  if (name.includes('everton')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,10 L85,20 L80,70 C78,82 50,92 50,92 C50,92 20,82 20,70 L15,20 Z" fill="#003399" stroke="#ffffff" strokeWidth="3" />
        {/* Tower */}
        <rect x="42" y="38" width="16" height="24" fill="#ffffff" />
        <polygon points="50,26 40,38 60,38" fill="#ffffff" />
      </svg>
    );
  }

  // 12. Norway Flag
  if (name.includes('norway')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="100" height="75" fill="#BA0C2F" />
        <rect x="25" y="0" width="18" height="75" fill="#ffffff" />
        <rect x="0" y="28" width="100" height="18" fill="#ffffff" />
        <rect x="29" y="0" width="10" height="75" fill="#00205B" />
        <rect x="0" y="32" width="100" height="10" fill="#00205B" />
      </svg>
    );
  }

  // 13. Wales Flag
  if (name.includes('wales')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="100" height="37.5" fill="#ffffff" />
        <rect y="37.5" width="100" height="37.5" fill="#00AB39" />
        {/* Red Dragon Silhouette */}
        <path d="M30,45 Q42,28 55,42 Q70,30 68,52 Q58,62 44,58 Z" fill="#D30731" />
      </svg>
    );
  }

  // 14. Portugal Flag
  if (name.includes('portugal')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="40" height="75" fill="#046A38" />
        <rect x="40" width="60" height="75" fill="#DA291C" />
        <circle cx="40" cy="37.5" r="14" fill="#FED100" />
      </svg>
    );
  }

  // 15. Denmark Flag
  if (name.includes('denmark')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="100" height="75" fill="#C60C30" />
        <rect x="30" width="12" height="75" fill="#ffffff" />
        <rect y="31" width="100" height="12" fill="#ffffff" />
      </svg>
    );
  }

  // 16. Sweden Flag
  if (name.includes('sweden')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="100" height="75" fill="#006AA7" />
        <rect x="30" width="14" height="75" fill="#FECC00" />
        <rect y="30" width="100" height="14" fill="#FECC00" />
      </svg>
    );
  }

  // 17. Bosnia and Herzegovina Flag
  if (name.includes('bosnia')) {
    return (
      <svg viewBox="0 0 100 75" className={`${className} rounded-sm shadow-sm`} fill="none">
        <rect width="100" height="75" fill="#002395" />
        <polygon points="26,0 100,0 100,74" fill="#FECB00" />
        <circle cx="34" cy="12" r="3" fill="#ffffff" />
        <circle cx="43" cy="22" r="3" fill="#ffffff" />
        <circle cx="52" cy="32" r="3" fill="#ffffff" />
        <circle cx="61" cy="42" r="3" fill="#ffffff" />
        <circle cx="70" cy="52" r="3" fill="#ffffff" />
        <circle cx="79" cy="62" r="3" fill="#ffffff" />
      </svg>
    );
  }

  // 18. Atlético Madrid
  if (name.includes('atlético') || name.includes('atletico')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L85,18 L80,72 C78,85 50,94 50,94 C50,94 20,85 20,72 L15,18 Z" fill="#CB3524" stroke="#272E61" strokeWidth="3" />
        {/* White Stripes */}
        <rect x="33" y="36" width="9" height="42" fill="#ffffff" />
        <rect x="58" y="36" width="9" height="42" fill="#ffffff" />
        {/* Blue Top Section with Bear / Stars */}
        <path d="M17,19 L83,19 L80,36 L20,36 Z" fill="#272E61" />
        <circle cx="50" cy="27" r="3" fill="#ffffff" />
        <circle cx="36" cy="27" r="2.5" fill="#ffffff" />
        <circle cx="64" cy="27" r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  // 19. Sevilla
  if (name.includes('sevilla')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L85,18 L80,72 C78,85 50,94 50,94 C50,94 20,85 20,72 L15,18 Z" fill="#ffffff" stroke="#D4001F" strokeWidth="3" />
        {/* Red stripes on right */}
        <path d="M50,45 L80,45 L78,72 C76,80 50,90 50,90 Z" fill="#D4001F" opacity="0.85" />
        <rect x="58" y="45" width="8" height="35" fill="#ffffff" />
        {/* Golden ball */}
        <circle cx="50" cy="32" r="10" fill="#F1A035" />
      </svg>
    );
  }

  // 20. Juventus
  if (name.includes('juventus')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L84,18 L80,72 C78,85 50,94 50,94 C50,94 20,85 20,72 L16,18 Z" fill="#000000" stroke="#C49A45" strokeWidth="3" />
        {/* White iconic double J */}
        <path d="M38,28 L46,28 L46,62 C46,68 40,70 34,68 L34,60 C38,61 40,60 40,56 L40,28 Z" fill="#ffffff" />
        <path d="M54,28 L62,28 L62,56 C62,64 56,66 50,64 L50,56 C54,57 56,56 56,52 L56,28 Z" fill="#ffffff" />
      </svg>
    );
  }

  // 21. Roma
  if (name.includes('roma')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <path d="M50,8 L85,18 L80,72 C78,85 50,94 50,94 C50,94 20,85 20,72 L15,18 Z" fill="#8E1F2F" stroke="#F19C1D" strokeWidth="3" />
        <path d="M20,50 L80,50 L77,72 C75,82 50,92 50,92 C50,92 25,82 23,72 Z" fill="#F19C1D" />
        <text x="50" y="42" textAnchor="middle" fill="#F19C1D" fontWeight="900" fontSize="18" fontFamily="serif">ASR</text>
      </svg>
    );
  }

  // 22. Bayer Leverkusen
  if (name.includes('leverkusen')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <circle cx="50" cy="50" r="44" fill="#E32221" stroke="#000000" strokeWidth="4" />
        <circle cx="50" cy="50" r="34" fill="#000000" />
        <circle cx="50" cy="50" r="28" fill="#ffffff" />
        <text x="50" y="56" textAnchor="middle" fill="#E32221" fontWeight="900" fontSize="16">B04</text>
      </svg>
    );
  }

  // 23. Borussia Dortmund
  if (name.includes('dortmund')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <circle cx="50" cy="50" r="45" fill="#FDE100" stroke="#000000" strokeWidth="4" />
        <text x="50" y="46" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="16" fontFamily="sans-serif">BVB</text>
        <text x="50" y="66" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="16" fontFamily="sans-serif">09</text>
      </svg>
    );
  }

  // Fallback generic sport crest
  return (
    <div className={`${className} rounded-full bg-[#1a2c38] border border-white/10 flex items-center justify-center font-bold text-xs text-white`}>
      ⚽
    </div>
  );
};
