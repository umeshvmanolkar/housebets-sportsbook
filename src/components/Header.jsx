import React from 'react';
import { 
  Menu, 
  Search, 
  SlidersHorizontal, 
  Smartphone, 
  Monitor, 
  Maximize2,
  Trophy,
  Crown
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { HousebetsLogo } from './Logos';

export const Header = ({ onOpenContestModal }) => {
  const {
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    isSidebarOpen,
    setIsSidebarOpen,
    isBetslipPanelOpen,
    setIsBetslipPanelOpen,
    singlesInSlip,
    playClick
  } = useSportsbook();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1a2c38] border-b border-white/[0.08] px-3 sm:px-5 py-2.5 shadow-md">
      <div className="max-w-[1780px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle + Casino/Sports Pill + Official Housebets Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => { playClick(); setIsSidebarOpen(!isSidebarOpen); }}
            className="w-9 h-9 rounded-xl bg-[#0f212e] hover:bg-[#213743] text-gray-300 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Stake-style Casino / Sports toggle */}
          <div className="hidden sm:flex items-center bg-[#0f212e] p-1 rounded-xl border border-white/5 text-xs font-bold">
            <button
              onClick={playClick}
              className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              Casino
            </button>
            <button
              onClick={() => { playClick(); setCurrentPage('home'); }}
              className="px-4 py-1.5 rounded-lg bg-[#1475e1] text-white shadow-sm flex items-center gap-1.5"
            >
              <span>Sports</span>
            </button>
          </div>

          {/* Official Housebets Logo */}
          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="flex items-center hover:opacity-90 transition-opacity ml-1"
          >
            <HousebetsLogo />
          </button>
        </div>

        {/* Center: Device Switcher (Desktop 1440px vs 390px Phone Shell) */}
        <div className="flex items-center bg-[#0f212e] p-1 rounded-xl border border-white/5 text-xs font-semibold">
          <button
            onClick={() => { playClick(); setViewMode('desktop'); }}
            title="Desktop 1440px Mode"
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'desktop' ? 'bg-[#213743] text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span className="hidden md:inline">1440px Desktop</span>
          </button>

          <button
            onClick={() => { playClick(); setViewMode('mobile'); }}
            title="Mobile 390px Phone Shell Mode"
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile' ? 'bg-[#1475e1] text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">390px Phone</span>
          </button>

          <button
            onClick={() => { playClick(); setViewMode('responsive'); }}
            title="Responsive Mode"
            className={`px-2 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              viewMode === 'responsive' ? 'bg-[#213743] text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Search, Betslip Toggle, Login & Register buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contest specs pill */}
          <button
            onClick={() => { playClick(); onOpenContestModal(); }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-xs font-bold hover:bg-[#00A3FF]/20 transition-all"
          >
            <span>Contest Brief</span>
          </button>

          {/* Betslip Side Rail Toggle */}
          <button
            onClick={() => { playClick(); setIsBetslipPanelOpen(!isBetslipPanelOpen); }}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 border transition-all text-xs font-bold ${
              isBetslipPanelOpen
                ? 'bg-[#1475e1] text-white border-[#1475e1]'
                : 'bg-[#0f212e] hover:bg-[#213743] text-gray-200 border-white/5'
            }`}
            title="Toggle Betslip"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden xl:inline">Betslip</span>
            {singlesInSlip.length > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                isBetslipPanelOpen ? 'bg-white text-[#1475e1]' : 'bg-[#1475e1] text-white'
              }`}>
                {singlesInSlip.length}
              </span>
            )}
          </button>

          {/* Sign In Button (Stake style) */}
          <button
            onClick={playClick}
            className="px-4 py-2 rounded-xl text-gray-200 hover:text-white font-bold text-xs hover:bg-white/5 transition-colors"
          >
            Sign In
          </button>

          {/* Register Button (Stake-style vibrant blue button) */}
          <button
            onClick={playClick}
            className="px-5 py-2 rounded-xl bg-[#1475e1] hover:bg-[#005cd6] text-white font-extrabold text-xs shadow-glow-blue transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
