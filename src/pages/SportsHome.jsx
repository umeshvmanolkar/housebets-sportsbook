import React, { useEffect } from 'react';
import { 
  Search, 
  Home, 
  Video, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  X, 
  Check,
  BarChart2,
  Layers,
  Users,
  Settings
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MATCHES_DATA, PROMO_CARDS } from '../data/mockData';
import { TeamCrest } from '../components/Logos';

export const SportsHome = () => {
  const {
    setCurrentPage,
    setSelectedMatchId,
    searchQuery,
    setSearchQuery,
    favourites,
    toggleFollow,
    singlesInSlip,
    toggleSelection,
    myBets,
    playClick,
    isMobile
  } = useSportsbook();

  // Keyboard shortcut for Ctrl + K search focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.getElementById('main-sports-search');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Your matches (Row view on Desktop, Inset Carousel on Mobile matching screenshot)
  const yourMatches = [
    MATCHES_DATA[0], // Arsenal vs Brighton (Live 52', 1-0)
    MATCHES_DATA[4], // Liverpool vs Manchester United (Sun, Oct 18 16:30)
    MATCHES_DATA[6], // Manchester City vs Tottenham Hotspur (Sun, Oct 18 14:00)
  ];

  // Top Matches strictly matching the Stake screenshot (media_1794666460701_d33e22ab.png)
  const stakeTopMatches = [
    MATCHES_DATA[1], // Norway vs Wales (2h · 31,022 · 🔥🔥 97% on Norway · 1.27 / 6.20 / 8.40)
    MATCHES_DATA[2], // Portugal vs Denmark (5h · 28,094 · 🔥🔥 97% on Portugal · 1.57 / 4.30 / 4.90)
    MATCHES_DATA[3], // Sweden vs Bosnia and Herzegovina (5h · 24,152 · 🔥🔥 95% on Sweden · 1.39 / 4.50 / 6.80)
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto px-0.5 sm:px-1">
      {/* 1. Promo Cards at Top (Strictly matching media_1794670919998_c8594c85.png) */}
      <div className={
        isMobile
          ? "flex gap-2.5 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory"
          : "grid grid-cols-1 md:grid-cols-3 gap-3.5"
      }>
        {PROMO_CARDS.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => {
                playClick();
                if (card.type === 'soccer') {
                  setCurrentPage('football');
                } else if (card.type === 'basketball') {
                  setSearchQuery('NBA');
                } else if (card.type === 'cricket') {
                  setSearchQuery('Cricket');
                }
              }}
              className={`${
                isMobile ? "w-[275px] flex-shrink-0 snap-start" : "w-auto"
              } p-3 rounded-2xl bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] shadow-card-elevated flex items-center gap-3.5 cursor-pointer transition-all group overflow-hidden relative`}
            >
              {/* Left Graphic Illustration Box */}
              {card.type === 'soccer' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1d68ed] via-[#1241a8] to-[#0d2259] rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-inner border border-blue-400/20 group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="relative flex flex-col items-center justify-center">
                    <span className="text-3xl filter drop-shadow">⚽</span>
                    <span className="text-[9px] font-black text-amber-300 tracking-wider uppercase font-mono mt-0.5">2-UP</span>
                  </div>
                </div>
              )}

              {card.type === 'basketball' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#2458e6] via-[#1a3d9e] to-[#12245c] rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-inner border border-blue-400/20 group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="relative flex flex-col items-center justify-center">
                    <span className="text-3xl filter drop-shadow">🏀</span>
                    <span className="text-[9px] font-black text-orange-300 tracking-wider uppercase font-mono mt-0.5">16+ PTS</span>
                  </div>
                </div>
              )}

              {card.type === 'cricket' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1d62e6] via-[#1340a6] to-[#0f2868] rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-inner border border-blue-400/20 group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="relative flex flex-col items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-200 via-white to-amber-400 p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#0d2a63] flex items-center justify-center text-amber-400 font-black text-sm">
                        ⮝
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-amber-300 font-mono tracking-widest mt-0.5">RO-KO</span>
                  </div>
                </div>
              )}

              {/* Text Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <span className="inline-block px-1.5 py-0.5 rounded bg-white text-gray-900 font-bold text-[9px] uppercase tracking-wider shadow-sm">
                  {card.badge}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-[#00A3FF] transition-colors leading-snug truncate">
                  {card.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#8a9ca8] leading-tight truncate">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Search Bar directly below promo cards (with Ctrl + K shortcut badge) */}
      <div className="relative">
        <div className="flex items-center justify-between gap-3 bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] rounded-xl px-4 py-3 shadow-inner transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#557086] flex-shrink-0" />
            <input
              id="main-sports-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Housebets.com"
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-[#557086] focus:outline-none"
            />
          </div>
          {!isMobile && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#213743] text-[10px] text-[#8a9ca8] font-mono border border-white/5 flex-shrink-0 select-none">
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Sports Navigation Pill Bar (Matching Desktop & Mobile References) */}
      <div className="bg-[#1a2c38] border border-[#213743] rounded-xl p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {/* Home (Active Cyan Pill) */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="px-3.5 py-1.5 rounded-lg bg-[#0f212e] border border-[#00A3FF]/30 text-[#00A3FF] font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {/* Live 13 */}
        <button
          onClick={() => { playClick(); setCurrentPage('live'); }}
          className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <Video className="w-3.5 h-3.5 text-[#ff3366]" />
          <span>Live</span>
          <span className="text-[#ff3366] font-bold font-mono">13</span>
        </button>

        {/* Soccer */}
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>⚽</span>
          <span>Soccer</span>
        </button>

        {/* Tennis */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🎾</span>
          <span>Tennis</span>
        </button>

        {/* Basketball */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🏀</span>
          <span>Basketball</span>
        </button>

        {/* My Bets */}
        <button
          onClick={() => { playClick(); setCurrentPage('bets'); }}
          className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>📑</span>
          <span>My Bets</span>
          <span className="text-[#00A3FF] font-bold font-mono text-[11px]">({myBets.open.length})</span>
        </button>

        {!isMobile && (
          <>
            {/* Baseball */}
            <button
              onClick={playClick}
              className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <span>⚾</span>
              <span>Baseball</span>
            </button>

            {/* American Football */}
            <button
              onClick={playClick}
              className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <span>🏈</span>
              <span>American Football</span>
            </button>

            {/* Esports */}
            <button
              onClick={playClick}
              className="px-3.5 py-1.5 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#0f212e] font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <span>🎮</span>
              <span>Esports</span>
            </button>
          </>
        )}
      </div>

      {/* 3. Favourites Section */}
      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-bold text-[#b1bad3] block px-0.5">Favourites</span>
        <div className="flex flex-wrap items-center gap-2">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1a2c38] border border-[#213743] text-xs font-semibold text-white shadow-sm"
            >
              <span className="text-amber-400">★</span>
              {fav.name.toLowerCase().includes('arsenal') ? (
                <TeamCrest teamName="Arsenal" className="w-3.5 h-3.5 inline-block" />
              ) : null}
              <span>{fav.name}</span>
              <button
                onClick={() => toggleFollow(fav)}
                className="text-[#557086] hover:text-white p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Your Matches Section */}
      <div className="space-y-2 pt-1">
        {isMobile ? (
          /* Mobile View: Horizontal Card Carousel (1:1 matching media_1794667758383_304c73af.png) */
          <div className="bg-[#1a2c38] border border-[#213743] rounded-2xl p-3 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-white">Your matches</h2>
                <span className="text-[10px] text-[#557086] font-mono">3 matches</span>
              </div>
              <span className="text-[10px] text-[#557086]">Swipe &gt;</span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
              {yourMatches.map((m) => (
                <div
                  key={m.id}
                  className="w-[265px] flex-shrink-0 snap-start bg-[#0f212e] border border-[#213743] rounded-xl p-3 space-y-2.5 shadow-sm"
                >
                  {/* Meta Row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {m.isLive ? (
                        <>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px]">
                            LIVE
                          </span>
                          <span className="text-[10px] text-[#b1bad3] font-mono font-medium">{m.minute}</span>
                          <span className="text-[10px] text-[#557086] truncate max-w-[80px]">· {m.league}</span>
                        </>
                      ) : (
                        <span className="text-[10px] text-[#b1bad3] font-mono">
                          {m.date}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toggleFollow(m.homeTeam)} className="text-[#557086] hover:text-amber-400 p-0.5">
                        <Star className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { playClick(); setSelectedMatchId(m.id); setCurrentPage('match'); }}
                        className="text-[10px] font-mono text-[#557086] hover:text-white"
                      >
                        +{m.moreMarketsCount} &gt;
                      </button>
                    </div>
                  </div>

                  {/* Teams & Scores */}
                  <div
                    onClick={() => { playClick(); setSelectedMatchId(m.id); setCurrentPage('match'); }}
                    className="space-y-1.5 cursor-pointer py-0.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <div className="flex items-center gap-2">
                        <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{m.homeTeam.name}</span>
                      </div>
                      {m.isLive && <span className="font-mono text-sm font-black">{m.homeTeam.score}</span>}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <div className="flex items-center gap-2">
                        <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{m.awayTeam.name}</span>
                      </div>
                      {m.isLive && <span className="font-mono text-sm font-black">{m.awayTeam.score}</span>}
                    </div>
                  </div>

                  {/* 3 Odds Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {[
                      { label: m.homeTeam.shortName || m.homeTeam.name.split(' ')[0], opt: m.matchResult.home },
                      { label: 'Draw', opt: m.matchResult.draw },
                      { label: m.awayTeam.shortName || m.awayTeam.name.split(' ')[0], opt: m.matchResult.away }
                    ].map(({ label, opt }) => {
                      const isSelected = singlesInSlip.some(s => s.id === opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleSelection({
                            id: opt.id,
                            matchId: m.id,
                            matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                            scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                            marketName: 'Match result',
                            selectionName: opt.label,
                            odd: opt.odd,
                            isSuspended: m.isSuspended
                          })}
                          className={`py-1.5 px-1 rounded-lg text-center flex flex-col items-center justify-center min-h-[44px] transition-all border ${
                            isSelected
                              ? 'bg-[#1475e1] border-[#1475e1] text-white font-extrabold shadow-glow-blue'
                              : 'bg-[#1a2c38] hover:bg-[#213743] text-white border-white/[0.04]'
                          }`}
                        >
                          <span className="text-[10px] text-[#b1bad3] truncate max-w-full font-medium">
                            {label}
                          </span>
                          <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-[#00A3FF]'}`}>
                            {opt.odd.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Row View (Matching Desktop Reference) */
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-white">Your matches</h2>
                <span className="text-[10px] text-[#557086] font-mono">3 matches</span>
              </div>
              <span className="text-[11px] text-[#b1bad3] font-medium">Match result</span>
            </div>

            <div className="space-y-2">
              {yourMatches.map((m) => {
                return (
                  <div
                    key={m.id}
                    className="p-3 sm:p-4 rounded-xl bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] transition-all flex items-center justify-between gap-3 shadow-sm"
                  >
                    {/* Match meta + teams */}
                    <div 
                      onClick={() => {
                        playClick();
                        setSelectedMatchId(m.id);
                        setCurrentPage('match');
                      }}
                      className="flex-1 cursor-pointer flex items-center gap-4"
                    >
                      <div className="w-20 flex-shrink-0">
                        {m.isLive ? (
                          <div className="space-y-0.5">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[10px]">
                              LIVE
                            </span>
                            <div className="text-[11px] text-[#b1bad3] font-mono font-medium">{m.minute}</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-xs font-mono font-bold text-white">{m.date.split('|')[0] || m.date.split(' ')[0]}</div>
                            <div className="text-[10px] text-[#b1bad3]">{m.date.split('|')[1] || m.date.split(' ').slice(1).join(' ')}</div>
                          </div>
                        )}
                      </div>

                      {/* Teams and Crests */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2.5">
                          <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-bold text-white hover:text-[#00A3FF] transition-colors truncate">
                            {m.homeTeam.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-bold text-white hover:text-[#00A3FF] transition-colors truncate">
                            {m.awayTeam.name}
                          </span>
                        </div>
                      </div>

                      {/* Live Scores */}
                      {m.isLive && (
                        <div className="flex flex-col items-end justify-center gap-2 pr-3 font-mono text-sm font-black text-white">
                          <span>{m.homeTeam.score}</span>
                          <span>{m.awayTeam.score}</span>
                        </div>
                      )}
                    </div>

                    {/* Match Result Odds Chips */}
                    <div className="flex items-center gap-2">
                      <div className="grid grid-cols-3 gap-2 w-[320px]">
                        {[
                          { label: m.homeTeam.shortName || m.homeTeam.name.split(' ')[0], opt: m.matchResult.home },
                          { label: 'Draw', opt: m.matchResult.draw },
                          { label: m.awayTeam.shortName || m.awayTeam.name.split(' ')[0], opt: m.matchResult.away }
                        ].map(({ label, opt }) => {
                          const isSelected = singlesInSlip.some((s) => s.id === opt.id);

                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                toggleSelection({
                                  id: opt.id,
                                  matchId: m.id,
                                  matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                                  scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                                  marketName: 'Match result',
                                  selectionName: opt.label,
                                  odd: opt.odd,
                                  isSuspended: m.isSuspended
                                })
                              }
                              className={`px-3 py-2 rounded-lg text-center transition-all flex flex-col items-center justify-center min-h-[46px] border ${
                                isSelected
                                  ? 'bg-[#1475e1] border-[#1475e1] text-white font-extrabold shadow-glow-blue'
                                  : 'bg-[#0f212e] hover:bg-[#213743] text-white border-white/[0.04]'
                              }`}
                            >
                              <span className="text-[10px] text-[#b1bad3] truncate max-w-full font-medium">
                                {label}
                              </span>
                              <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-[#00A3FF]'}`}>
                                {opt.odd.toFixed(2)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => {
                          playClick();
                          setSelectedMatchId(m.id);
                          setCurrentPage('match');
                        }}
                        className="px-2 py-2 rounded-xl bg-transparent hover:bg-white/5 text-[11px] font-mono text-[#b1bad3] hover:text-white transition-colors"
                      >
                        +{m.moreMarketsCount} &gt;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. Top Matches (Stake-Style Reference Cards: Swipe on Mobile, 3-Column on Desktop) */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="text-base">⚽</span>
            <h2 className="text-sm font-extrabold text-white tracking-wide">Top Matches</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[#557086]">
            <button className="p-1.5 rounded-lg bg-[#1a2c38] hover:text-white transition-colors border border-white/5">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg bg-[#1a2c38] hover:text-white transition-colors border border-white/5">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards Grid: Mobile swipe snap-x + Desktop 3-column grid */}
        <div className={
          isMobile
            ? "flex overflow-x-auto gap-2.5 pb-2 scrollbar-none snap-x snap-mandatory"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
        }>
          {stakeTopMatches.map((m) => (
            <div
              key={m.id}
              className={`${
                isMobile ? "w-[265px] flex-shrink-0 snap-start" : "w-auto"
              } bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] rounded-xl p-3.5 space-y-3 transition-all flex flex-col justify-between shadow-card-elevated group`}
            >
              {/* Top Meta Row (Time badge, stats, layers, volume, pin/settings) */}
              <div className="flex items-center justify-between text-xs text-[#557086]">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#0f212e] text-[#b1bad3] font-bold text-[11px] font-mono border border-white/5">
                    {m.kickoffBadge || (m.isLive ? `LIVE ${m.minute}` : '2h')}
                  </span>
                  <BarChart2 className="w-3.5 h-3.5 text-[#557086] hover:text-[#b1bad3] cursor-pointer" />
                  <Layers className="w-3.5 h-3.5 text-[#557086] hover:text-[#b1bad3] cursor-pointer" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[#b1bad3] font-semibold">
                    <Users className="w-3.5 h-3.5 text-[#557086]" />
                    <span>{m.bettorVolume}</span>
                  </span>
                  <button
                    onClick={playClick}
                    className="text-[#557086] hover:text-[#b1bad3] p-0.5 transition-colors"
                    title="Match Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Team Showcase (Symmetric Left Flag, Centered Team Names, Right Flag) */}
              <div
                onClick={() => {
                  playClick();
                  setSelectedMatchId(m.id);
                  setCurrentPage('match');
                }}
                className="flex items-center justify-between py-1 cursor-pointer"
              >
                {/* Left Flag / Crest */}
                <div className="w-9 flex items-center justify-start flex-shrink-0">
                  <TeamCrest teamName={m.homeTeam.name} className="w-7 h-5 rounded object-cover shadow-sm" />
                </div>

                {/* Center Stacked Team Names */}
                <div className="flex flex-col items-center justify-center text-center flex-1 px-2">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00A3FF] transition-colors truncate max-w-[150px]">
                    {m.homeTeam.name}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00A3FF] transition-colors truncate max-w-[150px]">
                    {m.awayTeam.name}
                  </span>
                </div>

                {/* Right Flag / Crest */}
                <div className="w-9 flex items-center justify-end flex-shrink-0">
                  <TeamCrest teamName={m.awayTeam.name} className="w-7 h-5 rounded object-cover shadow-sm" />
                </div>
              </div>

              {/* Thin Divider Line */}
              <div className="border-t border-[#213743]" />

              {/* Sentiment Row: 🔥🔥 97% of 1x2 bets on Norway */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8a9ca8]">
                <span className="text-amber-500">🔥🔥</span>
                <span className="truncate">{m.bettorSentiment}</span>
              </div>

              {/* 3 Odds Buttons in a Row (Inset #0f212e, bold white team name, electric blue odd) */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: m.homeTeam.name, opt: m.matchResult.home },
                  { label: 'Draw', opt: m.matchResult.draw },
                  { label: m.awayTeam.name, opt: m.matchResult.away }
                ].map(({ label, opt }) => {
                  const isSelected = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSelection({
                          id: opt.id,
                          matchId: m.id,
                          matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                          scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                          marketName: '1x2',
                          selectionName: opt.label,
                          odd: opt.odd,
                          isSuspended: m.isSuspended
                        })
                      }
                      className={`py-2 px-1.5 rounded-lg text-center flex flex-col items-center justify-between min-h-[48px] transition-all border ${
                        isSelected
                          ? 'bg-[#1475e1] border-[#1475e1] text-white font-extrabold shadow-glow-blue'
                          : 'bg-[#0f212e] hover:bg-[#213743] text-white border-white/[0.04]'
                      }`}
                    >
                      <span className="text-[11px] font-bold truncate max-w-full leading-tight text-white">
                        {label}
                      </span>
                      <span className={`font-mono text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#00A3FF]'}`}>
                        {opt.odd.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
