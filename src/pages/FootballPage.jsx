import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  Star, 
  Check, 
  Lock,
  Users
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MATCHES_DATA, FOOTBALL_LEAGUES } from '../data/mockData';
import { TeamCrest } from '../components/Logos';

export const FootballPage = () => {
  const {
    setCurrentPage,
    setSelectedMatchId,
    singlesInSlip,
    toggleSelection,
    favourites,
    toggleFollow,
    isFollowed,
    playClick,
    isMobile
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState('live-upcoming');

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto">
      {/* Top Bar: `< Soccer ⌵  5 competitions · 6 live` */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:bg-[#213743] text-xs font-bold text-white transition-colors border border-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Soccer</span>
            <ChevronDown className="w-3 h-3 text-[#557086]" />
          </button>
          <span className="text-xs text-[#b1bad3] font-medium">5 competitions · 6 live</span>
        </div>

        {/* Market Filter */}
        <div className="flex items-center gap-1.5 bg-[#1a2c38] px-3 py-1.5 rounded-xl border border-white/5 text-xs text-[#b1bad3]">
          <span className="text-[#557086] text-[11px]">Market</span>
          <span className="font-semibold text-white">1x2 (Full Time)</span>
          <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#557086] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search teams, players or leagues"
          className="w-full bg-[#1a2c38] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/5 focus:border-[#1475e1] focus:outline-none placeholder:text-[#557086]"
        />
      </div>

      {/* Tabs: Live & Upcoming | All Soccer */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-1.5 bg-[#1a2c38] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => { playClick(); setActiveTab('live-upcoming'); }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'live-upcoming'
                ? 'bg-[#1475e1] text-white shadow-sm'
                : 'text-[#b1bad3] hover:text-white'
            }`}
          >
            <span>Live & Upcoming</span>
            <span className="text-[10px] font-mono bg-black/20 px-1 rounded">6</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('all-soccer'); }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all-soccer'
                ? 'bg-[#1475e1] text-white shadow-sm'
                : 'text-[#b1bad3] hover:text-white'
            }`}
          >
            All Soccer
          </button>
        </div>

        <button className="hidden sm:flex items-center gap-1 text-xs text-[#b1bad3] hover:text-white bg-[#1a2c38] px-3 py-1 rounded-lg border border-white/5">
          <span>All competitions</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Leagues List */}
      <div className="space-y-4">
        {FOOTBALL_LEAGUES.map((league) => {
          const leagueMatches = MATCHES_DATA.filter((m) => m.league === league.name);
          const isLgStarred = isFollowed(league.name);

          return (
            <div key={league.id} className="space-y-2">
              {/* League Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{league.flag}</span>
                  <span className="text-xs font-extrabold text-white">{league.name}</span>
                  <span className="text-[10px] text-[#557086] font-mono">{leagueMatches.length} matches</span>
                  
                  <button
                    onClick={() => toggleFollow({ name: league.name, type: 'competition', icon: league.flag })}
                    className="p-1 text-[#557086] hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-3.5 h-3.5 ${isLgStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <button className="text-xs text-[#b1bad3] hover:text-white transition-colors">
                  View all &gt;
                </button>
              </div>

              {/* Match Rows */}
              <div className="space-y-2">
                {leagueMatches.map((m) => {
                  return isMobile ? (
                    /* Mobile Stacked Card (Fits 100% inside 390px without overflow) */
                    <div
                      key={m.id}
                      className="p-3 rounded-xl bg-[#1a2c38] border border-[#213743] shadow-sm space-y-2.5"
                    >
                      {/* Top: Status/Clock & More Markets */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          {m.isLive ? (
                            <>
                              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px] uppercase tracking-wider">
                                LIVE
                              </span>
                              <span className="text-[10px] text-[#b1bad3] font-mono font-medium">{m.minute}</span>
                            </>
                          ) : (
                            <span className="text-[10px] text-[#b1bad3] font-mono">
                              {m.date}
                            </span>
                          )}
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
                        className="space-y-1.5 cursor-pointer py-0.5"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{m.homeTeam.name}</span>
                          </div>
                          {m.isLive && <span className="font-mono text-sm font-black flex-shrink-0">{m.homeTeam.score}</span>}
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{m.awayTeam.name}</span>
                          </div>
                          {m.isLive && <span className="font-mono text-sm font-black flex-shrink-0">{m.awayTeam.score}</span>}
                        </div>
                      </div>

                      {/* Odds Buttons */}
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
                                    scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                                    marketName: '1x2',
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
                    /* Desktop Row Layout */
                    <div
                      key={m.id}
                      className="p-3 sm:p-4 rounded-xl bg-[#1a2c38] border border-[#213743] hover:border-[#2f4553] transition-all flex items-center justify-between gap-4 shadow-sm"
                    >
                      {/* Left: Clock, Teams, Logos */}
                      <div
                        onClick={() => {
                          playClick();
                          setSelectedMatchId(m.id);
                          setCurrentPage('match');
                        }}
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                      >
                        <div className="w-16 flex-shrink-0 text-left">
                          {m.isLive ? (
                            <div>
                              <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px] uppercase tracking-wider">
                                LIVE
                              </span>
                              <div className="text-[11px] text-[#b1bad3] font-mono font-medium mt-0.5">{m.minute}</div>
                            </div>
                          ) : (
                            <div className="text-[11px] text-[#b1bad3] font-mono leading-tight">
                              {m.date.split('|')[1]?.trim() || m.date}
                            </div>
                          )}
                        </div>

                        {/* Teams & Real SVG Crests */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                              <span className="hover:text-[#00A3FF] transition-colors truncate">{m.homeTeam.name}</span>
                            </div>
                            {m.isLive && <span className="font-mono text-sm font-black pr-4">{m.homeTeam.score}</span>}
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                              <span className="hover:text-[#00A3FF] transition-colors truncate">{m.awayTeam.name}</span>
                            </div>
                            {m.isLive && <span className="font-mono text-sm font-black pr-4">{m.awayTeam.score}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right: Odds Buttons */}
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
                                      scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                                      marketName: '1x2',
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
    </div>
  );
};
