import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Star, 
  Lock, 
  ChevronRight, 
  Clock, 
  Check 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MATCHES_DATA } from '../data/mockData';
import { TeamCrest } from '../components/Logos';

export const LivePage = () => {
  const {
    setCurrentPage,
    setSelectedMatchId,
    singlesInSlip,
    toggleSelection,
    favourites,
    toggleFollow,
    playClick,
    isMobile
  } = useSportsbook();

  const [activeSportFilter, setActiveSportFilter] = useState('all');

  const SPORT_FILTERS = [
    { id: 'all', label: 'All', count: 13, icon: '📺' },
    { id: 'soccer', label: 'Soccer', count: 6, icon: '⚽' },
    { id: 'tennis', label: 'Tennis', count: 3, icon: '🎾' },
    { id: 'basketball', label: 'Basketball', count: 1, icon: '🏀' },
    { id: 'baseball', label: 'Baseball', count: 1, icon: '⚾' },
    { id: 'american-football', label: 'American Football', count: 1, icon: '🏈' },
    { id: 'esports', label: 'Esports', count: 1, icon: '🎮' }
  ];

  const liveMatches = MATCHES_DATA.filter((m) => m.isLive);
  const startingSoonMatches = MATCHES_DATA.filter((m) => !m.isLive);

  // Group live matches by league
  const leagues = [
    { name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: liveMatches.filter((m) => m.league === 'Premier League') },
    { name: 'LaLiga', flag: '🇪🇸', matches: liveMatches.filter((m) => m.league === 'LaLiga') },
    { name: 'Serie A', flag: '🇮🇹', matches: liveMatches.filter((m) => m.league === 'Serie A') },
    { name: 'Bundesliga', flag: '🇩🇪', matches: liveMatches.filter((m) => m.league === 'Bundesliga') }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6">
      {/* Back Button Pill matching screenshot: `< Live now` */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1a2c38] hover:bg-[#213743] border border-[#213743] text-xs font-bold text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span>Live now</span>
        </button>

        <span className="text-xs font-mono text-[#00A3FF] font-bold">
          13 matches in-play
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#557086] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search teams, players or leagues"
          className="w-full bg-[#1a2c38] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#213743] focus:border-[#1475e1] focus:outline-none placeholder:text-[#557086] transition-colors"
        />
      </div>

      {/* Filter by sport pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {SPORT_FILTERS.map((s) => {
          const isActive = activeSportFilter === s.id;
          return (
            <button
              key={s.id}
              onClick={() => { playClick(); setActiveSportFilter(s.id); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1475e1] text-white font-bold shadow-sm'
                  : 'bg-[#1a2c38] text-[#b1bad3] hover:text-white border border-[#213743]'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-black/20 text-white font-bold' : 'text-gray-400'}`}>
                {s.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* League Accordions & Match Rows (Box Effect matching media_1794672727230_cbd9a64a.jpg) */}
      <div className="space-y-4">
        {leagues.map((lg) => {
          if (lg.matches.length === 0) return null;
          const isLgFollowed = favourites.some((f) => f.name === lg.name);

          return (
            <div
              key={lg.name}
              className="rounded-2xl bg-[#1a2c38] border border-[#213743] shadow-card-elevated overflow-hidden"
            >
              {/* Box Header: League Info & Controls */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-[#213743]/80 bg-[#1a2c38]">
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lg.flag}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-white">{lg.name}</span>
                  <span className="text-[11px] text-[#557086] font-mono font-medium">
                    {lg.matches.length} {lg.matches.length === 1 ? 'match' : 'matches'}
                  </span>
                  <button
                    onClick={() => toggleFollow({ name: lg.name, type: 'competition', icon: lg.flag })}
                    className="p-1 text-[#557086] hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-3.5 h-3.5 ${isLgFollowed ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#8a9ca8] font-medium hidden sm:inline mr-2">Match result</span>
                  <button
                    onClick={() => { playClick(); setCurrentPage('football'); }}
                    className="text-[#8a9ca8] hover:text-white transition-colors flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold"
                  >
                    <span>View all</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#557086]" />
                  </button>
                </div>
              </div>

              {/* Match Rows inside the League Box with subtle dividers */}
              <div className="divide-y divide-[#213743]/70">
                {lg.matches.map((m) => {
                  return isMobile ? (
                    /* Mobile Stacked Match Row inside the League Box */
                    <div
                      key={m.id}
                      className="p-3 sm:p-3.5 space-y-2.5 hover:bg-[#213743]/30 transition-colors"
                    >
                      {/* Top: Clock, Live Badge, and More Markets count */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px] uppercase tracking-wider">
                            LIVE
                          </span>
                          <span className="text-[10px] text-[#b1bad3] font-mono font-medium">{m.minute}</span>
                        </div>

                        <button
                          onClick={() => {
                            playClick();
                            setSelectedMatchId(m.id);
                            setCurrentPage('match');
                          }}
                          className="text-[10px] font-mono text-[#557086] hover:text-white"
                        >
                          +{m.moreMarketsCount} &gt;
                        </button>
                      </div>

                      {/* Teams & Scores */}
                      <div
                        onClick={() => {
                          playClick();
                          setSelectedMatchId(m.id);
                          setCurrentPage('match');
                        }}
                        className="space-y-1.5 cursor-pointer py-1"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{m.homeTeam.name}</span>
                          <span className="font-mono text-sm font-black text-white ml-1.5 flex-shrink-0">{m.homeTeam.score}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{m.awayTeam.name}</span>
                          <span className="font-mono text-sm font-black text-white ml-1.5 flex-shrink-0">{m.awayTeam.score}</span>
                        </div>
                      </div>

                      {/* Bottom: 3 Full-Width Odds Buttons or Suspended State */}
                      {m.isSuspended ? (
                        <div className="w-full py-2.5 rounded-lg bg-[#0f212e] text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center justify-center gap-2">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Suspended</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          {[
                            { key: 'home', label: m.homeTeam.shortName || m.homeTeam.name.split(' ')[0], opt: m.matchResult.home },
                            { key: 'draw', label: 'Draw', opt: m.matchResult.draw },
                            { key: 'away', label: m.awayTeam.shortName || m.awayTeam.name.split(' ')[0], opt: m.matchResult.away }
                          ].map(({ key, label, opt }) => {
                            const isSelected = singlesInSlip.some((s) => s.id === opt.id);
                            return (
                              <button
                                key={key}
                                onClick={() =>
                                  toggleSelection({
                                    id: opt.id,
                                    matchId: m.id,
                                    matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                                    scoreMinute: `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}`,
                                    marketName: 'Match result',
                                    selectionName: opt.label,
                                    odd: opt.odd,
                                    isSuspended: m.isSuspended
                                  })
                                }
                                className={`py-1.5 px-1 rounded-lg text-center flex flex-col items-center justify-center min-h-[44px] transition-all border ${
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
                      )}
                    </div>
                  ) : (
                    /* Desktop Row Layout inside the League Box */
                    <div
                      key={m.id}
                      className="p-3.5 sm:p-4 hover:bg-[#213743]/40 transition-colors flex items-center justify-between gap-4"
                    >
                      {/* Left: Clock, Teams, Score */}
                      <div
                        onClick={() => {
                          playClick();
                          setSelectedMatchId(m.id);
                          setCurrentPage('match');
                        }}
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                      >
                        {/* Score Clock */}
                        <div className="w-16 flex-shrink-0 text-left">
                          <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px] uppercase tracking-wider">
                            LIVE
                          </span>
                          <div className="text-[11px] text-[#b1bad3] font-mono font-medium mt-0.5">{m.minute}</div>
                        </div>

                        {/* Teams & Scores */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                              <span className="hover:text-[#00A3FF] transition-colors truncate">{m.homeTeam.name}</span>
                            </div>
                            <span className="font-mono text-sm font-black pr-4">{m.homeTeam.score}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                              <span className="hover:text-[#00A3FF] transition-colors truncate">{m.awayTeam.name}</span>
                            </div>
                            <span className="font-mono text-sm font-black pr-4">{m.awayTeam.score}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Odds Buttons or Suspended State */}
                      <div className="flex items-center gap-2">
                        {m.isSuspended ? (
                          <div className="px-6 py-2.5 rounded-lg bg-[#0f212e] text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-2 w-[320px] justify-center">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Suspended</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2 w-[320px]">
                            {[
                              { key: 'home', label: m.homeTeam.shortName || m.homeTeam.name.split(' ')[0], opt: m.matchResult.home },
                              { key: 'draw', label: 'Draw', opt: m.matchResult.draw },
                              { key: 'away', label: m.awayTeam.shortName || m.awayTeam.name.split(' ')[0], opt: m.matchResult.away }
                            ].map(({ key, label, opt }) => {
                              const isSelected = singlesInSlip.some((s) => s.id === opt.id);
                              return (
                                <button
                                  key={key}
                                  onClick={() =>
                                    toggleSelection({
                                      id: opt.id,
                                      matchId: m.id,
                                      matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                                      scoreMinute: `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}`,
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
                        )}

                        <button
                          onClick={() => {
                            playClick();
                            setSelectedMatchId(m.id);
                            setCurrentPage('match');
                          }}
                          className="px-2 py-2 text-[11px] font-mono text-[#557086] hover:text-white"
                        >
                          +{m.moreMarketsCount} &gt;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Starting Soon Section (Contest Requirement: "Nothing live: show Starting soon") */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 px-1">
          <Clock className="w-4 h-4 text-[#00A3FF]" />
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Starting soon</h3>
        </div>

        <div className="rounded-2xl bg-[#1a2c38] border border-[#213743] shadow-card-elevated overflow-hidden divide-y divide-[#213743]/70">
          {startingSoonMatches.slice(0, 2).map((m) => (
            <div
              key={m.id}
              onClick={() => {
                playClick();
                setSelectedMatchId(m.id);
                setCurrentPage('match');
              }}
              className="p-3.5 sm:p-4 hover:bg-[#213743]/40 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#557086]">{m.date}</span>
                <span className="text-xs sm:text-sm font-bold text-white hover:text-[#00A3FF] transition-colors">
                  {m.homeTeam.name} vs {m.awayTeam.name}
                </span>
              </div>
              <span className="text-xs font-mono text-[#00A3FF] font-medium">+{m.moreMarketsCount} markets</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
