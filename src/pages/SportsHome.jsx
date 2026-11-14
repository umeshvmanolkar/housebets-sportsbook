import React from 'react';
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
  Pin
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MATCHES_DATA } from '../data/mockData';
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
    playClick
  } = useSportsbook();

  // Your matches (Row view matching Housebets reference and user screenshot)
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
    MATCHES_DATA[0], // Arsenal vs Brighton (LIVE 52' · 29,555 · 🔥🔥 97% on Arsenal · 1.30 / 4.60 / 11.00)
    MATCHES_DATA[4], // Liverpool vs Manchester United (Sun 16:30 · 41,200 · 🔥🔥 88% on Liverpool · 1.65 / 4.00 / 4.33)
    MATCHES_DATA[5], // Real Madrid vs Bayern Munich (Tue 20:00 · 38,900 · 🔥🔥 74% on Real Madrid · 2.20 / 3.70 / 2.90)
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto">
      {/* 1. Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-3 bg-[#1a2c38] border border-[#213743] rounded-xl px-4 py-3 shadow-inner">
          <Search className="w-4 h-4 text-[#557086] flex-shrink-0" />
          <input
            id="main-sports-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, players or leagues"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-[#557086] focus:outline-none"
          />
        </div>
      </div>

      {/* 2. Sports Navigation Pill Bar */}
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

      {/* 4. Your Matches Section (Directly below Favourites, matching screenshot) */}
      <div className="space-y-2 pt-1">
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
                className="p-3 sm:p-4 rounded-xl bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm"
              >
                {/* Match meta + teams */}
                <div 
                  onClick={() => {
                    playClick();
                    setSelectedMatchId(m.id);
                    setCurrentPage('match');
                  }}
                  className="flex-1 cursor-pointer flex items-center justify-between md:justify-start gap-4"
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

                {/* Match Result Odds Chips (Single Betting) */}
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-1 md:w-[320px]">
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

                  {/* More Markets Link */}
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

      {/* 5. Top Matches (The Stake-Style Reference Cards Carousel) */}
      <div className="space-y-2.5 pt-2">
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

        {/* Cards Grid: Matching media_1794666460701_d33e22ab.png 1:1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {stakeTopMatches.map((m) => (
            <div
              key={m.id}
              className="bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] rounded-xl p-3.5 space-y-3 transition-all flex flex-col justify-between shadow-card-elevated group"
            >
              {/* Top Meta Row (Time badge, stats, layers, volume, pin) */}
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
                    onClick={() => toggleFollow(m.homeTeam)}
                    className="text-[#557086] hover:text-amber-400 p-0.5 transition-colors"
                  >
                    <Pin className="w-3.5 h-3.5" />
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
