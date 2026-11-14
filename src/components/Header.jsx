import React from 'react';
import { 
  PanelLeft, 
  PanelRight, 
  Search, 
  Crown 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { HousebetsLogo } from './Logos';

export const Header = () => {
  const {
    setCurrentPage,
    isSidebarOpen,
    setIsSidebarOpen,
    isBetslipPanelOpen,
    setIsBetslipPanelOpen,
    singlesInSlip,
    playClick
  } = useSportsbook();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b1a24] border-b border-[#132a37] px-4 py-2.5 select-none shadow-sm">
      <div className="max-w-[1780px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle + Official Housebets Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); setIsSidebarOpen(!isSidebarOpen); }}
            className="w-9 h-9 rounded-xl bg-[#102a38] hover:bg-[#163547] text-[#8aa6b5] hover:text-white flex items-center justify-center border border-[#1b3d4f] transition-colors"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <HousebetsLogo />
          </button>
        </div>

        {/* Center: Weekly Prize Badge + Crown Button */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#102a38] border border-[#1b3d4f]">
            <span className="text-base leading-none">🏆</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#7392a3] font-semibold leading-tight">Weekly Prize</span>
              <span className="text-xs font-black text-[#f5a623] font-mono leading-tight">$50,000.00</span>
            </div>
          </div>

          <button 
            onClick={playClick}
            className="w-9 h-9 rounded-xl bg-[#102a38] hover:bg-[#163547] text-[#7392a3] hover:text-[#00F5D4] flex items-center justify-center border border-[#1b3d4f] transition-colors"
            title="VIP Club & Crown"
          >
            <Crown className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Search, Betslip Toggle, Log In & Register buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Icon Button */}
          <button
            onClick={() => {
              playClick();
              const searchInput = document.getElementById('main-sports-search');
              if (searchInput) searchInput.focus();
            }}
            className="w-9 h-9 rounded-xl bg-[#102a38] hover:bg-[#163547] text-[#8aa6b5] hover:text-white flex items-center justify-center border border-[#1b3d4f] transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Betslip Side Rail Toggle (PanelRight) */}
          <button
            onClick={() => { playClick(); setIsBetslipPanelOpen(!isBetslipPanelOpen); }}
            className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
              isBetslipPanelOpen
                ? 'bg-[#1475e1] text-white border-[#1475e1]'
                : 'bg-[#102a38] hover:bg-[#163547] text-[#8aa6b5] hover:text-white border-[#1b3d4f]'
            }`}
            title="Toggle Betslip"
          >
            <PanelRight className="w-4 h-4" />
            {singlesInSlip.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00F5D4] text-[#061822] text-[10px] font-black flex items-center justify-center shadow-sm">
                {singlesInSlip.length}
              </span>
            )}
          </button>

          {/* Log In Button */}
          <button
            onClick={playClick}
            className="px-4 py-2 rounded-xl bg-[#102a38] hover:bg-[#163547] text-white font-bold text-xs sm:text-sm border border-[#1b3d4f] transition-colors"
          >
            Log In
          </button>

          {/* Register Button */}
          <button
            onClick={playClick}
            className="px-4 py-2 rounded-xl bg-[#98f5e1] hover:bg-[#82ecd7] text-[#061822] font-black text-xs sm:text-sm shadow-sm transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
