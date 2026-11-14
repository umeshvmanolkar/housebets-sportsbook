import React from 'react';
import { 
  Menu, 
  Dices, 
  MessageSquare, 
  ChevronUp, 
  X,
  Sliders
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const MobileNavigation = () => {
  const {
    currentPage,
    setCurrentPage,
    singlesInSlip,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    setIsBetslipPanelOpen,
    playClick
  } = useSportsbook();

  const currentBet = singlesInSlip[0];

  return (
    <>
      {/* Floating Bottom Betslip Bar on Mobile (Exact Match to Screenshot 5) */}
      {currentBet && !isMobileDrawerOpen && (
        <div className="fixed bottom-[56px] left-0 right-0 z-40 px-3 pb-1 md:hidden">
          <button
            onClick={() => { playClick(); setIsMobileDrawerOpen(true); }}
            className="w-full bg-[#bbf2f6] hover:bg-[#a6ecf1] text-[#071017] px-3.5 py-2.5 rounded-2xl flex items-center justify-between shadow-2xl font-bold text-xs transition-all animate-bounce-subtle"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-black text-[#bbf2f6] text-[10px] font-black flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-black truncate">
                {currentBet.teamName} @ {currentBet.odd.toFixed(2)}
              </span>
            </div>

            <ChevronUp className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>
      )}

      {/* Main Bottom Nav Bar (Exact Match to Screenshot 1-6) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#071017] border-t border-white/[0.08] px-3 py-1 flex items-center justify-around md:hidden">
        {/* Menu */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-1">Menu</span>
        </button>

        {/* Sports (Active with cyan pill) */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 px-4 rounded-xl bg-[#0e2738] text-[#00A3FF]"
        >
          <span className="text-base">🏀</span>
          <span className="text-[10px] font-bold mt-0.5">Sports</span>
        </button>

        {/* Casino */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-white"
        >
          <span className="text-base">🎴</span>
          <span className="text-[10px] font-semibold mt-0.5">Casino</span>
        </button>

        {/* Chat */}
        <button
          onClick={() => {
            playClick();
            setIsBetslipPanelOpen(true);
            setCurrentPage('bets');
          }}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-white"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-1">Chat</span>
        </button>

        {/* User avatar circle */}
        <button
          onClick={() => { playClick(); setCurrentPage('bets'); }}
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5"
        >
          <div className="w-full h-full rounded-full bg-[#071017] flex items-center justify-center text-xs">
            🏝️
          </div>
        </button>
      </nav>
    </>
  );
};
