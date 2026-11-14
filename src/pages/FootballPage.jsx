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
    playClick
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
                  return (
                    <div
                      key={m.id}
                      className="p-3 sm:p-4 rounded-2xl bg-[#1a2c38] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-card-elevated group"
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
                              {m.date.split('|')[1]?.trim() || m.date}
                            </div>
                          )}
                        </div>

                        {/* Teams & Real SVG Crests */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.homeTeam.name} className="w-5 h-5 flex-shrink-0" />
                              <span className="group-hover:text-[#00A3FF] transition-colors">{m.homeTeam.name}</span>
                            </div>
                            {m.isLive && <span className="font-mono text-sm">{m.homeTeam.score}</span>}
                          </div>

                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <TeamCrest teamName={m.awayTeam.name} className="w-5 h-5 flex-shrink-0" />
                              <span className="group-hover:text-[#00A3FF] transition-colors">{m.awayTeam.name}</span>
                            </div>
                            {m.isLive && <span className="font-mono text-sm">{m.awayTeam.score}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right: Odds Buttons */}
                      <div className="flex items-center gap-2">
                        {m.isSuspended ? (
                          <div className="px-6 py-2.5 rounded-xl bg-[#213743] text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-2 min-w-[260px] justify-center">
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
                                    scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                                    marketName: '1x2',
                                    selectionName: opt.label,
                                    odd: opt.odd,
                                    isSuspended: m.isSuspended
                                  })
                                }
                                className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-3 min-w-[95px] sm:min-w-[110px] transition-all font-medium ${
                                  isSelected
                                    ? 'bg-[#1475e1] text-white font-black shadow-glow-blue'
                                    : 'bg-[#213743] hover:bg-[#2a4454] text-white border border-white/5'
                                }`}
                              >
                                <span className="truncate text-[11px] text-[#b1bad3]">{opt.label}</span>
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
