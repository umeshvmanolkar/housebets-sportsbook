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
    playClick
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

      {/* League Accordions & Match Rows */}
      <div className="space-y-4">
        {leagues.map((lg) => {
          if (lg.matches.length === 0) return null;
          const isLgFollowed = favourites.some((f) => f.name === lg.name);

          return (
            <div key={lg.name} className="space-y-2">
              {/* League Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lg.flag}</span>
                  <span className="text-xs font-extrabold text-white">{lg.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{lg.matches.length} matches</span>
                  <button
                    onClick={() => toggleFollow({ name: lg.name, type: 'competition', icon: lg.flag })}
                    className="p-1 text-gray-500 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-3.5 h-3.5 ${isLgFollowed ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-400 font-medium hidden sm:inline">Match result</span>
                  <button
                    onClick={() => { playClick(); setCurrentPage('football'); }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-0.5 text-[11px]"
                  >
                    <span>View all</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Match Rows */}
              <div className="space-y-2">
                {lg.matches.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 sm:p-4 rounded-xl bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm"
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
                      <div className="min-w-14 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px] uppercase tracking-wider block">
                          LIVE
                        </span>
                        <span className="text-[10px] text-[#b1bad3] font-mono mt-0.5 block">{m.minute}</span>
                      </div>

                      {/* Teams & Scores */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <div className="flex items-center gap-2">
                            <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                            <span className="hover:text-[#00A3FF] transition-colors">{m.homeTeam.name}</span>
                          </div>
                          <span className="font-mono text-sm font-black">{m.homeTeam.score}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <div className="flex items-center gap-2">
                            <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                            <span className="hover:text-[#00A3FF] transition-colors">{m.awayTeam.name}</span>
                          </div>
                          <span className="font-mono text-sm font-black">{m.awayTeam.score}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Odds Buttons or Suspended State */}
                    <div className="flex items-center gap-2">
                      {m.isSuspended ? (
                        /* Suspended state */
                        <div className="px-6 py-2.5 rounded-lg bg-[#0f212e] text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-2 min-w-[260px] justify-center">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Suspended</span>
                        </div>
                      ) : (
                        [
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
                                  scoreMinute: `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}`,
                                  marketName: 'Match result',
                                  selectionName: opt.label,
                                  odd: opt.odd,
                                  isSuspended: m.isSuspended
                                })
                              }
                              className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between gap-3 min-w-[95px] sm:min-w-[110px] transition-all font-medium border ${
                                isSelected
                                  ? 'bg-[#1475e1] border-[#1475e1] text-white font-black shadow-glow-blue'
                                  : 'bg-[#0f212e] hover:bg-[#213743] text-[#b1bad3] hover:text-white border-white/[0.04]'
                              }`}
                            >
                              <span className="truncate text-[11px] font-bold">{opt.label}</span>
                              <div className="flex items-center gap-1 font-mono font-bold">
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                <span className={isSelected ? 'text-white' : 'text-[#00A3FF]'}>
                                  {opt.odd.toFixed(2)}
                                </span>
                              </div>
                            </button>
                          );
                        })
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
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Starting Soon Section (Contest Requirement: "Nothing live: show Starting soon") */}
      <div className="space-y-2 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 px-1">
          <Clock className="w-4 h-4 text-[#00A3FF]" />
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Starting soon</h3>
        </div>

        <div className="space-y-2">
          {startingSoonMatches.slice(0, 2).map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-2xl bg-[#0e1c28] border border-white/[0.08] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400">{m.date}</span>
                <span className="text-xs font-bold text-white">{m.homeTeam.name} vs {m.awayTeam.name}</span>
              </div>
              <span className="text-xs font-mono text-[#00A3FF]">+{m.moreMarketsCount} markets</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
