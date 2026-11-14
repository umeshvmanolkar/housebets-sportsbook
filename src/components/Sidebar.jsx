import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Star, 
  ChevronRight, 
  Tv, 
  Calendar, 
  Gamepad2, 
  Dices,
  Flame,
  Radio
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Sidebar = () => {
  const { 
    isSidebarOpen, 
    currentPage, 
    setCurrentPage, 
    favourites,
    playClick,
    soundEnabled,
    setSoundEnabled
  } = useSportsbook();

  // Content is STRICTLY and ONLY the items from the official Housebets starter screenshot
  const primaryNav = [
    { id: 'casino', label: 'Casino', icon: '🎴', page: 'home', isSports: false },
    { id: 'sports', label: 'Sports', icon: '🏀', page: 'home', isSports: true, active: true },
    { id: 'streams', label: 'Live Streams', icon: '📹', page: 'live', isSports: false },
    { id: 'schedule', label: 'Schedule', icon: '📅', page: 'home', isSports: false },
    { id: 'originals', label: 'Originals', icon: '🎲', page: 'home', isSports: false },
  ];

  const sportsList = [
    { id: 'soccer', name: 'Soccer', icon: '⚽', page: 'football', liveCount: 6 },
    { id: 'tennis', name: 'Tennis', icon: '🎾', page: 'home', liveCount: 3 },
    { id: 'basketball', name: 'Basketball', icon: '🏀', page: 'home', liveCount: 1 },
    { id: 'baseball', name: 'Baseball', icon: '⚾', page: 'home', liveCount: 1 },
    { id: 'football', name: 'American Football', icon: '🏈', page: 'home', liveCount: 1 },
    { id: 'hockey', name: 'Ice Hockey', icon: '🏒', page: 'home', liveCount: 0 },
    { id: 'mma', name: 'MMA', icon: '🥊', page: 'home', liveCount: 0 },
    { id: 'esports', name: 'Esports', icon: '🎮', page: 'home', liveCount: 1 }
  ];

  // If isSidebarOpen is true: Expanded mode (220px)
  // If isSidebarOpen is false: Collapsed mode (62px icon rail)
  const isExpanded = isSidebarOpen;

  return (
    <aside 
      className={`${
        isExpanded ? 'w-56' : 'w-[62px]'
      } flex-shrink-0 bg-[#0f212e] border-r border-white/[0.08] flex flex-col justify-between py-3 select-none hidden md:flex z-30 transition-all duration-200 overflow-y-auto overflow-x-hidden`}
    >
      {/* Top Group: Casino, Sports, Streams, Calendar, Originals */}
      <div className="space-y-1 w-full px-2">
        {primaryNav.map((item) => {
          const isItemActive = (item.isSports && (currentPage === 'home' || currentPage === 'live' || currentPage === 'football' || currentPage === 'match'));

          return (
            <div key={item.id} className="relative group w-full">
              <button
                onClick={() => { playClick(); setCurrentPage(item.page); }}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  isItemActive
                    ? 'bg-[#1a2c38] text-white shadow-sm border border-white/5'
                    : 'text-[#b1bad3] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {/* Active Cyan Left Bar Indicator from Housebets reference */}
                {isItemActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#00A3FF] rounded-r-full shadow-glow-cyan" />
                )}

                <span className="text-lg w-7 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </span>

                {isExpanded && (
                  <span className="truncate tracking-wide">{item.label}</span>
                )}
              </button>

              {/* Tooltip in collapsed mode */}
              {!isExpanded && (
                <div className="absolute left-[54px] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1a2c38] text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        <div className="w-full px-2 py-1">
          <div className="h-px bg-white/[0.06] w-full" />
        </div>

        {/* Middle Group: Sports list strictly from screenshot */}
        <div className="space-y-0.5">
          {sportsList.map((sport) => {
            const isCurrent = (sport.page === 'football' && currentPage === 'football');

            return (
              <div key={sport.id} className="relative group w-full">
                <button
                  onClick={() => { playClick(); setCurrentPage(sport.page); }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-[#1a2c38] text-white font-bold shadow-sm border border-white/5'
                      : 'text-[#b1bad3] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-base w-7 flex items-center justify-center flex-shrink-0">
                      {sport.icon}
                    </span>
                    {isExpanded && (
                      <span className="truncate">{sport.name}</span>
                    )}
                  </div>

                  {isExpanded && sport.liveCount > 0 && (
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded font-mono font-bold">
                      {sport.liveCount}
                    </span>
                  )}
                </button>

                {/* Tooltip in collapsed mode */}
                {!isExpanded && (
                  <div className="absolute left-[54px] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1a2c38] text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center gap-1.5">
                    <span>{sport.name}</span>
                    {sport.liveCount > 0 && (
                      <span className="text-[10px] bg-red-500/20 text-red-400 px-1 rounded font-mono font-bold">
                        {sport.liveCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Group: Sound Toggle, Favourites Star, Palm Tree Island Avatar */}
      <div className="w-full px-2 pt-2 border-t border-white/[0.06] space-y-1">
        {/* Audio Setting */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playClick();
          }}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs text-[#b1bad3] hover:text-white hover:bg-white/[0.04] transition-colors"
          title={soundEnabled ? 'Mute Sounds' : 'Enable Audio'}
        >
          <span className="w-7 flex items-center justify-center flex-shrink-0">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00A3FF]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </span>
          {isExpanded && <span>Sound {soundEnabled ? 'On' : 'Off'}</span>}
        </button>

        {/* Favourites */}
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-[#b1bad3] hover:text-amber-400 hover:bg-white/[0.04] transition-colors"
          title="Favourites"
        >
          <div className="flex items-center gap-3 truncate">
            <span className="w-7 flex items-center justify-center flex-shrink-0">
              <Star className={`w-4 h-4 ${favourites.length > 0 ? 'text-amber-400' : 'text-[#b1bad3]'}`} />
            </span>
            {isExpanded && <span>Favourites</span>}
          </div>
          {isExpanded && favourites.length > 0 && (
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-mono font-bold">
              {favourites.length}
            </span>
          )}
        </button>

        {/* Island Avatar from Screenshot */}
        <div
          onClick={() => { playClick(); setCurrentPage('bets'); }}
          className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}
          title="My Profile & Vault"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 p-0.5 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[#071017] flex items-center justify-center text-sm">
              🏝️
            </div>
          </div>
          {isExpanded && (
            <div className="truncate text-left leading-tight">
              <div className="text-xs font-bold text-white truncate">Player Vault</div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold">$1,450.00 ₮</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
