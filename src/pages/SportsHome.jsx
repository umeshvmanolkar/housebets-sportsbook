import React from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  X, 
  Check 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { SPORTS_NAV, MATCHES_DATA } from '../data/mockData';

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

  const liveMatches = MATCHES_DATA.filter((m) => m.isLive);
  const upcomingMatches = MATCHES_DATA.filter((m) => !m.isLive);
  const yourMatches = MATCHES_DATA.slice(0, 3);
  const featuredMatches = [MATCHES_DATA[0], MATCHES_DATA[5], MATCHES_DATA[7], MATCHES_DATA[9]];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6">
      {/* 1. Search Bar (Contest Requirement: "Search: teams, players, competitions, markets") */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search teams, players or leagues"
          className="w-full bg-[#0e1c28] text-xs text-gray-200 pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] focus:border-[#00A3FF] focus:outline-none placeholder:text-gray-500 transition-colors"
        />
      </div>

      {/* 2. Sports Nav Pills (Contest Requirement: "Sports nav") */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {SPORTS_NAV.map((sport) => {
          const isActive = sport.id === 'home';
          return (
            <button
              key={sport.id}
              onClick={() => {
                playClick();
                if (sport.id === 'live') setCurrentPage('live');
                else if (sport.id === 'soccer') setCurrentPage('football');
                else setCurrentPage('home');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0e2738] text-[#00A3FF] border border-[#00A3FF]/40 font-bold'
                  : 'bg-[#0e1c28] text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              <span>{sport.icon}</span>
              <span>{sport.name}</span>
              {sport.count && (
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  sport.hasLiveDot ? 'bg-red-500/20 text-red-400 font-bold' : 'text-gray-500'
                }`}>
                  {sport.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Favourites Chips from Screenshot */}
      {favourites.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-gray-400 block px-0.5">Favourites</span>
          <div className="flex flex-wrap items-center gap-2">
            {favourites.map((fav) => (
              <div
                key={fav.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1c28] border border-white/10 text-xs font-semibold text-gray-200"
              >
                <span>{fav.icon}</span>
                <span>{fav.name}</span>
                <button
                  onClick={() => toggleFollow(fav)}
                  className="text-gray-500 hover:text-white p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Your Matches (Contest Requirement: "Match result odds on each row") */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-gray-300">Your matches</h2>
            <span className="text-[10px] text-gray-500 font-mono">3 matches</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">Match result</span>
        </div>

        <div className="space-y-2">
          {yourMatches.map((m) => {
            const isMatchSelected = singlesInSlip.some((s) => s.matchId === m.id);

            return (
              <div
                key={m.id}
                className="p-3 sm:p-4 rounded-2xl bg-[#0e1c28] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Match meta + teams */}
                <div 
                  onClick={() => {
                    playClick();
                    setSelectedMatchId(m.id);
                    setCurrentPage('match');
                  }}
                  className="flex items-center gap-3 sm:gap-4 flex-1 cursor-pointer"
                >
                  {/* Status / Date */}
                  <div className="min-w-16 text-center">
                    {m.isLive ? (
                      <div className="space-y-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-red-500 text-white font-mono font-bold text-[9px] uppercase tracking-wider block">
                          LIVE
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{m.minute}</span>
                      </div>
                    ) : (
                      <div className="text-[10px] text-gray-400 font-mono leading-tight">
                        {m.date.split('·')[1]?.trim() || m.date}
                      </div>
                    )}
                  </div>

                  {/* Teams and Score */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{m.homeTeam.logo}</span>
                        <span>{m.homeTeam.name}</span>
                      </div>
                      {m.isLive && <span className="font-mono text-sm">{m.homeTeam.score}</span>}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{m.awayTeam.logo}</span>
                        <span>{m.awayTeam.name}</span>
                      </div>
                      {m.isLive && <span className="font-mono text-sm">{m.awayTeam.score}</span>}
                    </div>
                  </div>
                </div>

                {/* 3 Match Result Odds Buttons: Home | Draw | Away */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[
                    { key: 'home', opt: m.matchResult.home },
                    { key: 'draw', opt: m.matchResult.draw },
                    { key: 'away', opt: m.matchResult.away }
                  ].map(({ key, opt }) => {
                    const isSelected = singlesInSlip.some((s) => s.id === opt.id);

                    return (
                      <button
                        key={key}
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
                        className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-3 min-w-[95px] sm:min-w-[110px] transition-all font-medium ${
                          isSelected
                            ? 'bg-[#00A3FF] text-white font-black shadow-md'
                            : 'bg-[#132230] hover:bg-[#182c3f] text-gray-300 border border-white/5'
                        }`}
                      >
                        <span className="truncate text-[11px]">{opt.label}</span>
                        <div className="flex items-center gap-1 font-mono font-bold">
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span className={isSelected ? 'text-white' : 'text-[#00A3FF]'}>
                            {opt.odd.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* +Markets count link */}
                  <button
                    onClick={() => {
                      playClick();
                      setSelectedMatchId(m.id);
                      setCurrentPage('match');
                    }}
                    className="px-2 py-2 rounded-xl bg-transparent hover:bg-white/5 text-[11px] font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    +{m.moreMarketsCount} &gt;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Featured Matches Carousel (Contest Requirement: "Top competitions") */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold text-gray-300">Featured matches</h2>
          <div className="flex items-center gap-1 text-gray-500">
            <button className="p-1 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuredMatches.map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-2xl bg-[#0e1c28] border border-white/[0.08] hover:border-white/15 transition-all space-y-2.5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>{m.league}</span>
                {m.isLive ? (
                  <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-mono font-bold text-[9px]">
                    LIVE {m.minute}
                  </span>
                ) : (
                  <span className="font-mono text-[10px]">{m.date}</span>
                )}
              </div>

              {/* Match Teams */}
              <div 
                onClick={() => {
                  playClick();
                  setSelectedMatchId(m.id);
                  setCurrentPage('match');
                }}
                className="space-y-1.5 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span>{m.homeTeam.logo}</span>
                    <span className="truncate">{m.homeTeam.name}</span>
                  </div>
                  {m.isLive && <span className="font-mono">{m.homeTeam.score}</span>}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span>{m.awayTeam.logo}</span>
                    <span className="truncate">{m.awayTeam.name}</span>
                  </div>
                  {m.isLive && <span className="font-mono">{m.awayTeam.score}</span>}
                </div>
              </div>

              {/* 3 Odds chips */}
              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
                {[
                  { label: m.homeTeam.shortName || '1', opt: m.matchResult.home },
                  { label: 'Draw', opt: m.matchResult.draw },
                  { label: m.awayTeam.shortName || '2', opt: m.matchResult.away }
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
                      className={`p-1.5 rounded-xl text-center text-xs transition-all ${
                        isSelected
                          ? 'bg-[#00A3FF] text-white font-black'
                          : 'bg-[#132230] text-gray-200 border border-white/5 hover:bg-[#182c3f]'
                      }`}
                    >
                      <span className="text-[9px] text-gray-400 block truncate">{label}</span>
                      <strong className={`font-mono text-xs ${isSelected ? 'text-white' : 'text-[#00A3FF]'}`}>
                        {opt.odd.toFixed(2)}
                      </strong>
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
