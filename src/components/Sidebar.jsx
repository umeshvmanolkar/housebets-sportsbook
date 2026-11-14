import React from 'react';
import { 
  Trophy, 
  Tv, 
  Calendar, 
  Gamepad2, 
  Dices, 
  Volume2, 
  Star, 
  Flame,
  ChevronRight
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Sidebar = () => {
  const { 
    isSidebarOpen, 
    currentPage, 
    setCurrentPage, 
    playClick 
  } = useSportsbook();

  if (!isSidebarOpen) return null;

  const topNavItems = [
    { id: 'casino', label: 'Casino', icon: '🎴' },
    { id: 'sports', label: 'Sports', icon: '🏀', active: true },
    { id: 'streams', label: 'Live Stream', icon: '📹' },
    { id: 'calendar', label: 'Schedule', icon: '📅' },
    { id: 'originals', label: 'Originals', icon: '🎲' },
  ];

  const sportsItems = [
    { id: 'soccer', name: 'Soccer', icon: '⚽', page: 'football' },
    { id: 'tennis', name: 'Tennis', icon: '🎾', page: 'home' },
    { id: 'basketball', name: 'Basketball', icon: '🏀', page: 'home' },
    { id: 'baseball', name: 'Baseball', icon: '⚾', page: 'home' },
    { id: 'football', name: 'American Football', icon: '🏈', page: 'home' },
    { id: 'esports', name: 'Esports', icon: '🎮', page: 'home' },
  ];

  return (
    <aside className="w-16 flex-shrink-0 bg-[#071017] border-r border-white/[0.08] flex flex-col items-center py-3 justify-between select-none hidden md:flex z-30">
      {/* Top Group */}
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        {topNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { playClick(); setCurrentPage('home'); }}
            title={item.label}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg transition-all relative ${
              item.active
                ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#00A3FF] rounded-r-full" />
            )}
            <span>{item.icon}</span>
          </button>
        ))}

        <div className="w-8 h-px bg-white/10 my-2" />

        {/* Sports icons */}
        {sportsItems.map((sport) => (
          <button
            key={sport.id}
            onClick={() => { playClick(); setCurrentPage(sport.page); }}
            title={sport.name}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-colors ${
              (sport.page === 'football' && currentPage === 'football')
                ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{sport.icon}</span>
          </button>
        ))}
      </div>

      {/* Bottom Group */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={playClick}
          className="w-9 h-9 rounded-xl text-gray-500 hover:text-gray-300 flex items-center justify-center transition-colors"
          title="Audio Settings"
        >
          <Volume2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => { playClick(); setCurrentPage('bets'); }}
          className="w-9 h-9 rounded-xl text-gray-500 hover:text-amber-400 flex items-center justify-center transition-colors"
          title="Favourites & Starred"
        >
          <Star className="w-4 h-4" />
        </button>

        {/* Mascot Avatar from Screenshot */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 shadow-md cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-[#071017] flex items-center justify-center text-lg">
            🏝️
          </div>
        </div>
      </div>
    </aside>
  );
};
