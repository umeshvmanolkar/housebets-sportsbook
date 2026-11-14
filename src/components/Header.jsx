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
    playClick,
    isMobile
  } = useSportsbook();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1a2c38] border-b border-[#213743] px-3.5 sm:px-4 py-2 select-none shadow-md">
      <div className="max-w-[1780px] mx-auto flex items-center justify-between gap-2">
        {/* Left: Sidebar Toggle (Desktop only) + Official Housebets Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isMobile && (
            <button
              onClick={() => { playClick(); setIsSidebarOpen(!isSidebarOpen); }}
              className="w-9 h-9 rounded-xl bg-[#0f212e] hover:bg-[#213743] text-[#b1bad3] hover:text-white flex items-center justify-center border border-[#213743] transition-colors"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <HousebetsLogo className={isMobile ? "h-6 sm:h-7" : "h-7 sm:h-8"} />
          </button>
        </div>

        {/* Center: Weekly Prize Badge + Crown Button (Desktop only) */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0f212e] border border-[#213743]">
              <span className="text-base leading-none">🏆</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#557086] font-semibold leading-tight">Weekly Prize</span>
                <span className="text-xs font-bold text-[#f5a623] font-mono leading-tight">$50,000.00</span>
              </div>
            </div>

            <button 
              onClick={playClick}
              className="w-9 h-9 rounded-xl bg-[#0f212e] hover:bg-[#213743] text-[#557086] hover:text-[#00A3FF] flex items-center justify-center border border-[#213743] transition-colors"
              title="VIP Club & Crown"
            >
              <Crown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right: Search, Betslip Toggle, Log In & Register buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isMobile && (
            <>
              {/* Search Icon Button */}
              <button
                onClick={() => {
                  playClick();
                  const searchInput = document.getElementById('main-sports-search');
                  if (searchInput) searchInput.focus();
                }}
                className="w-9 h-9 rounded-xl bg-[#0f212e] hover:bg-[#213743] text-[#b1bad3] hover:text-white flex items-center justify-center border border-[#213743] transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Betslip Side Rail Toggle */}
              <button
                onClick={() => { playClick(); setIsBetslipPanelOpen(!isBetslipPanelOpen); }}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                  isBetslipPanelOpen
                    ? 'bg-[#1475e1] text-white border-[#1475e1] shadow-glow-blue'
                    : 'bg-[#0f212e] hover:bg-[#213743] text-[#b1bad3] hover:text-white border-[#213743]'
                }`}
                title="Toggle Betslip"
              >
                <PanelRight className="w-4 h-4" />
                {singlesInSlip.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00A3FF] text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                    {singlesInSlip.length}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Log In Button */}
          <button
            onClick={playClick}
            className="px-3 py-1.5 rounded-xl bg-[#0f212e] hover:bg-[#213743] text-white font-bold text-xs border border-[#213743] transition-colors whitespace-nowrap"
          >
            Log In
          </button>

          {/* Register Button */}
          <button
            onClick={playClick}
            className="px-3.5 py-1.5 rounded-xl bg-[#98f5e1] hover:bg-[#80edd5] text-[#061822] font-black text-xs shadow-sm transition-all whitespace-nowrap"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
