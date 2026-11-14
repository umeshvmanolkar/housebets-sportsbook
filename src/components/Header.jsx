import React from 'react';
import { 
  Menu, 
  Search, 
  Trophy, 
  Crown, 
  Smartphone, 
  Monitor, 
  Maximize2, 
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Sparkles
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

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
    <header className="sticky top-0 z-40 w-full bg-[#071017] border-b border-white/[0.08] px-3 sm:px-6 py-2.5">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Sidebar toggle + Housebets Wave Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => { playClick(); setIsSidebarOpen(!isSidebarOpen); }}
            className="w-9 h-9 rounded-xl bg-[#0e1c28] hover:bg-[#142636] text-gray-300 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
            title="Toggle Sidebar"
          >
            <div className="flex flex-col gap-1 items-center">
              <span className="w-4 h-0.5 bg-gray-300 rounded" />
              <span className="w-4 h-0.5 bg-gray-300 rounded" />
              <span className="w-4 h-0.5 bg-gray-300 rounded" />
            </div>
          </button>

          {/* Logo with Wave graphic */}
          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#00A3FF] hover:brightness-110 transition-all font-sans">
              Housebets
            </span>
            {/* SVG Wave matching screenshot */}
            <svg className="w-8 h-8 text-[#00A3FF]" viewBox="0 0 64 64" fill="none">
              <path
                d="M8 42C16 42 22 36 28 26C34 16 42 12 50 14C56 16 58 22 56 28C54 34 46 38 40 36C34 34 32 28 36 24C40 20 45 22 46 25C47 28 44 30 42 29"
                stroke="url(#waveGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M12 48C20 48 26 44 32 36C38 28 46 24 52 27"
                stroke="#00A3FF"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="waveGrad" x1="8" y1="14" x2="56" y2="42">
                  <stop offset="0%" stopColor="#00A3FF" />
                  <stop offset="50%" stopColor="#26d0ce" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>

        {/* Center: Weekly Prize + Viewport Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Weekly Prize Badge from Screenshot */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1c28] border border-white/5 text-xs">
            <span className="text-amber-400 text-sm">🏆</span>
            <div>
              <div className="text-[10px] text-gray-400 font-medium leading-none">Weekly Prize</div>
              <div className="text-xs font-bold text-amber-400 font-mono leading-tight">$50,000.00</div>
            </div>
          </div>

          <button
            onClick={playClick}
            className="hidden md:flex w-8 h-8 rounded-xl bg-[#0e1c28] hover:bg-[#142636] text-amber-400 items-center justify-center border border-white/5 transition-colors"
            title="VIP Rewards"
          >
            <Crown className="w-4 h-4" />
          </button>

          {/* Device Switcher (Desktop 1440px vs Phone 390px vs Responsive) */}
          <div className="flex items-center bg-[#0e1c28] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => { playClick(); setViewMode('desktop'); }}
              title="Desktop 1440px Mode"
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                viewMode === 'desktop' ? 'bg-[#1a2d3e] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span className="hidden lg:inline">Desktop</span>
            </button>

            <button
              onClick={() => { playClick(); setViewMode('mobile'); }}
              title="Mobile 390px Phone Shell Mode"
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                viewMode === 'mobile' ? 'bg-[#00A3FF] text-black font-extrabold shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">390px Phone</span>
            </button>

            <button
              onClick={() => { playClick(); setViewMode('responsive'); }}
              title="Responsive Mode"
              className={`px-2 py-1 rounded-lg flex items-center gap-1 font-medium transition-all ${
                viewMode === 'responsive' ? 'bg-[#1a2d3e] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Search, Betslip Toggle, Login & Register buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Contest Specs button */}
          <button
            onClick={() => { playClick(); onOpenContestModal(); }}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-xs font-bold hover:bg-[#00A3FF]/20 transition-all"
          >
            <span>Contest Rules</span>
          </button>

          {/* Search Icon */}
          <button
            onClick={playClick}
            className="w-9 h-9 rounded-xl bg-[#0e1c28] hover:bg-[#142636] text-gray-300 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Betslip Panel Toggle Icon */}
          <button
            onClick={() => { playClick(); setIsBetslipPanelOpen(!isBetslipPanelOpen); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all relative ${
              isBetslipPanelOpen
                ? 'bg-[#00A3FF] text-black font-bold border-[#00A3FF]'
                : 'bg-[#0e1c28] hover:bg-[#142636] text-gray-300 hover:text-white border-white/5'
            }`}
            title="Toggle Betslip"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {singlesInSlip.length > 0 && !isBetslipPanelOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00A3FF] text-black text-[9px] font-black flex items-center justify-center shadow-md">
                {singlesInSlip.length}
              </span>
            )}
          </button>

          {/* Log In Button (dark outline) */}
          <button
            onClick={playClick}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-xl bg-[#0e1c28] hover:bg-[#132433] text-gray-200 hover:text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            Log In
          </button>

          {/* Register Button (solid light cyan / white) */}
          <button
            onClick={playClick}
            className="px-4 py-1.5 rounded-xl bg-[#e2f9fd] hover:bg-white text-[#071017] font-extrabold text-xs shadow-md transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
