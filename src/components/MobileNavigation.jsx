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

export const MobileNavigation = ({ isInsideFrame = false }) => {
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

  const posContainer = isInsideFrame 
    ? 'absolute bottom-0 left-0 right-0 z-40' 
    : 'fixed bottom-0 left-0 right-0 z-40 md:hidden';

  const posFloatingBar = isInsideFrame 
    ? 'absolute bottom-[54px] left-0 right-0 z-40 px-3 pb-1' 
    : 'fixed bottom-[54px] left-0 right-0 z-40 px-3 pb-1 md:hidden';

  return (
    <>
      {/* Floating Bottom Betslip Bar on Mobile (Singles only: "[ 1 ] Arsenal @ 1.30 ^") */}
      {currentBet && !isMobileDrawerOpen && (
        <div className={posFloatingBar}>
          <button
            onClick={() => { playClick(); setIsMobileDrawerOpen(true); }}
            className="w-full bg-[#98f5e1] hover:bg-[#80edd5] text-[#071017] px-3.5 py-2.5 rounded-2xl flex items-center justify-between shadow-2xl font-bold text-xs transition-all animate-bounce-subtle"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-black text-[#98f5e1] text-[10px] font-black flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-black truncate">
                {currentBet.selectionName || currentBet.teamName} @ {currentBet.odd.toFixed(2)}
              </span>
            </div>

            <ChevronUp className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>
      )}

      {/* Main Bottom Nav Bar matching Housebets Mobile Reference */}
      <nav className={`${posContainer} bg-[#0b1a24] border-t border-[#183a4c] px-3 py-1.5 flex items-center justify-around shadow-2xl select-none`}>
        {/* Menu */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 text-[#8aa6b5] hover:text-white transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </button>

        {/* Sports (Active with teal/cyan pill) */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 px-4 rounded-xl bg-[#08333e] text-[#00F5D4] border border-[#00e5ff]/20 shadow-sm"
        >
          <span className="text-base leading-none">🏀</span>
          <span className="text-[10px] font-bold mt-0.5">Sports</span>
        </button>

        {/* Casino */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="flex flex-col items-center justify-center py-1 text-[#8aa6b5] hover:text-white transition-colors"
        >
          <span className="text-base leading-none">🎴</span>
          <span className="text-[10px] font-semibold mt-0.5">Casino</span>
        </button>

        {/* Chat */}
        <button
          onClick={() => {
            playClick();
            setIsBetslipPanelOpen(true);
            setCurrentPage('bets');
          }}
          className="flex flex-col items-center justify-center py-1 text-[#8aa6b5] hover:text-white transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Chat</span>
        </button>

        {/* User Avatar Circle */}
        <button
          onClick={() => { playClick(); setCurrentPage('bets'); }}
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 transition-transform hover:scale-105"
        >
          <div className="w-full h-full rounded-full bg-[#0b1a24] flex items-center justify-center text-xs">
            🏝️
          </div>
        </button>
      </nav>
    </>
  );
};
