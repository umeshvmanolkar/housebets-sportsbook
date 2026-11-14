import React from 'react';
import { 
  Flame, 
  Search, 
  Trophy, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { SPORTS_CATEGORIES } from '../data/mockData';

export const Sidebar = () => {
  const {
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    setCurrentPage,
    playSound
  } = useSportsbook();

  const TOP_LEAGUES = [
    { id: 'Premier League', name: 'Premier League', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', count: 18 },
    { id: 'UEFA Champions League', name: 'Champions League', country: '🇪🇺 Europe', count: 12 },
    { id: 'La Liga', name: 'La Liga', country: '🇪🇸 Spain', count: 10 },
    { id: 'NBA', name: 'NBA Basketball', country: '🇺🇸 USA', count: 14 },
    { id: 'Blast Premier CS2', name: 'Blast Premier CS2', country: '🎮 Global', count: 8 },
    { id: 'UFC 312', name: 'UFC 312', country: '🥊 World', count: 6 }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0a0d14] border-r border-white/[0.07] p-3 space-y-5 hidden md:block select-none overflow-y-auto">
      {/* Quick Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search matches, teams..."
          className="w-full bg-[#121722] text-xs text-gray-200 pl-9 pr-3 py-2 rounded-xl border border-white/[0.07] focus:outline-none focus:border-[#00E701] transition-colors placeholder:text-gray-500"
        />
      </div>

      {/* House Specials Promotion Badge */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0f1d13] to-[#0d161f] border border-[#00E701]/30 shadow-[0_0_15px_rgba(0,231,1,0.1)] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4 text-[#00E701] animate-bounce" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Zero-Margin Singles</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
          Highest odds on all Premier League & Champions League straight singles.
        </p>
        <div className="flex items-center justify-between text-[10px] text-[#00E701] font-semibold">
          <span className="bg-[#00E701]/10 px-2 py-0.5 rounded border border-[#00E701]/20">0% Commission</span>
          <span className="text-white/60">Solana Settlement</span>
        </div>
      </div>

      {/* Sports Categories */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">All Sports</span>
          <span className="text-[10px] font-semibold text-gray-500">Live Count</span>
        </div>

        <div className="space-y-0.5">
          {SPORTS_CATEGORIES.map((sport) => {
            const isSelected = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => {
                  playSound('click');
                  setSelectedSport(sport.id);
                  setCurrentPage('lobby');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#00E701]/15 text-[#00E701] font-semibold border border-[#00E701]/30'
                    : 'text-gray-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{sport.icon}</span>
                  <span>{sport.name}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-[#00E701] text-black font-bold' : 'bg-white/[0.06] text-gray-400'
                }`}>
                  {sport.activeCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Leagues */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Top Competitions</span>
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <div className="space-y-0.5">
          {TOP_LEAGUES.map((league) => {
            const isSelected = selectedLeague === league.id;
            return (
              <button
                key={league.id}
                onClick={() => {
                  playSound('click');
                  setSelectedLeague(league.id);
                  setCurrentPage('leagues');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-white/[0.08] text-white font-semibold border-l-2 border-[#00E701]'
                    : 'text-gray-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <div className="truncate">
                  <div className="truncate text-xs group-hover:text-white transition-colors">{league.name}</div>
                  <div className="text-[10px] text-gray-500">{league.country}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Web3 Trust Badges */}
      <div className="pt-2 border-t border-white/[0.07] px-2 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#00E701]" />
          <span>Provably Fair Sports Settlement</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Sub-Second On-Chain Cashouts</span>
        </div>
      </div>
    </aside>
  );
};
