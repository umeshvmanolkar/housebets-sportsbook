import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  Star, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Tv, 
  Gamepad2, 
  Trophy,
  Dices
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Sidebar = () => {
  const { 
    isSidebarOpen, 
    currentPage, 
    setCurrentPage, 
    favourites,
    playClick 
  } = useSportsbook();

  const [expandedSport, setExpandedSport] = useState('soccer');

  if (!isSidebarOpen) return null;

  const quickLinks = [
    { id: 'live', label: 'Live Events', count: 77, icon: Flame, page: 'live', badgeClass: 'bg-[#1475e1] text-white' },
    { id: 'starting', label: 'Starting Soon', count: 42, icon: Clock, page: 'home', badgeClass: 'bg-white/10 text-gray-300' },
    { id: 'favourites', label: 'Favourites', count: favourites.length, icon: Star, page: 'football', badgeClass: 'bg-amber-500/20 text-amber-400' },
    { id: 'mybets', label: 'My Bets', count: null, icon: FileText, page: 'bets' }
  ];

  const topSports = [
    { id: 'soccer', name: 'Soccer', icon: '⚽', page: 'football', count: 184, subLeagues: ['Premier League', 'Champions League', 'UEFA Nations League', 'LaLiga', 'Serie A'] },
    { id: 'gtavi', name: 'GTA VI', icon: '🌴', page: 'home', count: 12 },
    { id: 'mma', name: 'MMA', icon: '🥊', page: 'home', count: 28 },
    { id: 'tennis', name: 'Tennis', icon: '🎾', page: 'home', count: 45 },
    { id: 'cricket', name: 'Cricket', icon: '🏏', page: 'home', count: 19 },
    { id: 'basketball', name: 'Basketball', icon: '🏀', page: 'home', count: 64 },
    { id: 'football', name: 'American Football', icon: '🏈', page: 'home', count: 32 },
    { id: 'hockey', name: 'Ice Hockey', icon: '🏒', page: 'home', count: 26 },
    { id: 'cs2', name: 'CS2', icon: '🎮', page: 'home', count: 18 }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0f212e] border-r border-white/[0.08] p-3 space-y-4 hidden md:block select-none overflow-y-auto">
      {/* Quick Navigation Items */}
      <div className="space-y-1">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;

          return (
            <button
              key={item.id}
              onClick={() => { playClick(); setCurrentPage(item.page); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1a2c38] text-white shadow-sm border border-white/5'
                  : 'text-[#b1bad3] hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${item.id === 'live' ? 'text-red-400 animate-pulse' : item.id === 'favourites' ? 'text-amber-400' : 'text-[#00A3FF]'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== null && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${item.badgeClass}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Top Sports Section matching Stake reference */}
      <div className="space-y-1">
        <div className="px-3 text-[11px] font-bold text-[#557086] uppercase tracking-wider">
          Top Sports
        </div>

        {topSports.map((sport) => {
          const isExpanded = expandedSport === sport.id;
          const isCurrent = currentPage === sport.page && sport.id === 'soccer';

          return (
            <div key={sport.id} className="space-y-1">
              <button
                onClick={() => {
                  playClick();
                  if (sport.subLeagues) {
                    setExpandedSport(isExpanded ? null : sport.id);
                  }
                  if (sport.page) setCurrentPage(sport.page);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#1a2c38] text-white shadow-sm'
                    : 'text-[#b1bad3] hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{sport.icon}</span>
                  <span>{sport.name}</span>
                </div>
                {sport.subLeagues && (
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Sub-leagues dropdown */}
              {sport.subLeagues && isExpanded && (
                <div className="pl-8 pr-2 py-1 space-y-1 border-l-2 border-[#1475e1]/40 ml-4">
                  {sport.subLeagues.map((lg) => (
                    <button
                      key={lg}
                      onClick={() => { playClick(); setCurrentPage('football'); }}
                      className="w-full text-left py-1 text-[11px] text-[#b1bad3] hover:text-white transition-colors truncate block"
                    >
                      {lg}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Stake-style bottom categories */}
      <div className="space-y-1 text-xs text-[#b1bad3]">
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.04] hover:text-white transition-colors"
        >
          <span>All Sports</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
        </button>

        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.04] hover:text-white transition-colors"
        >
          <span>All Esports</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
    </aside>
  );
};
