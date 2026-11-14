import React, { useState } from 'react';
import { 
  Trophy, 
  Smartphone, 
  Monitor, 
  Sliders, 
  Wallet, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  Search,
  Bell,
  Info,
  Maximize2
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Header = ({ onOpenContestModal }) => {
  const {
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    oddsFormat,
    setOddsFormat,
    wallets,
    selectedCurrency,
    setSelectedCurrency,
    activeWallet,
    singlesInSlip,
    soundEnabled,
    setSoundEnabled,
    playSound
  } = useSportsbook();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isOddsOpen, setIsOddsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/[0.07] px-3 sm:px-6 py-2.5">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand & Page Quick-Tabs */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => { playSound('click'); setCurrentPage('lobby'); }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00E701] to-[#00b001] flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(0,231,1,0.4)] group-hover:scale-105 transition-transform">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">HOUSEBETS</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/30">
                  SPORTS
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-medium">Singles-Only Architecture</div>
            </div>
          </button>

          {/* 5-Page Navigation Pills (Desktop visible) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121722] p-1 rounded-xl border border-white/[0.05]">
            <button
              onClick={() => { playSound('click'); setCurrentPage('lobby'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'lobby'
                  ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              1. Lobby
            </button>

            <button
              onClick={() => { playSound('click'); setCurrentPage('match-detail'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'match-detail'
                  ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              2. Live Tracker
            </button>

            <button
              onClick={() => { playSound('click'); setCurrentPage('leagues'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'leagues'
                  ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              3. Leagues
            </button>

            <button
              onClick={() => { playSound('click'); setCurrentPage('betslip-terminal'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
                currentPage === 'betslip-terminal'
                  ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              4. Singles Slip
              {singlesInSlip.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  currentPage === 'betslip-terminal' ? 'bg-black text-[#00E701]' : 'bg-[#00E701] text-black'
                }`}>
                  {singlesInSlip.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { playSound('click'); setCurrentPage('my-bets'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'my-bets'
                  ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              5. My Bets & PnL
            </button>
          </nav>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device Switcher (Desktop vs Mobile Preview vs Responsive) */}
          <div className="hidden md:flex items-center bg-[#131924] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => { playSound('click'); setViewMode('desktop'); }}
              title="Force Desktop 3-Column View"
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'desktop' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-[#00E701]" />
              <span className="hidden xl:inline">Desktop</span>
            </button>

            <button
              onClick={() => { playSound('click'); setViewMode('mobile-preview'); }}
              title="Interactive Mobile Phone Bezel Simulator"
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'mobile-preview' ? 'bg-[#00E701] text-black font-bold shadow-glow-green-sm' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Mobile Frame</span>
            </button>

            <button
              onClick={() => { playSound('click'); setViewMode('responsive'); }}
              title="Auto-Responsive to window width"
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'responsive' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xl:inline">Responsive</span>
            </button>
          </div>

          {/* Odds Format Selector */}
          <div className="relative">
            <button
              onClick={() => { playSound('click'); setIsOddsOpen(!isOddsOpen); }}
              className="bg-[#121722] hover:bg-[#1a2130] text-gray-200 border border-white/[0.08] px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <span className="text-gray-400">Odds:</span>
              <span className="font-semibold text-[#00E701] uppercase">{oddsFormat}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isOddsOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#0f141d] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                {[
                  { id: 'decimal', label: 'Decimal (2.15)' },
                  { id: 'american', label: 'American (+115)' },
                  { id: 'fractional', label: 'Fractional (23/20)' },
                  { id: 'implied', label: 'Implied % (46.5%)' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => {
                      setOddsFormat(fmt.id);
                      setIsOddsOpen(false);
                      playSound('click');
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      oddsFormat === fmt.id ? 'bg-[#00E701]/10 text-[#00E701] font-semibold' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{fmt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Crypto Wallet & Balance */}
          <div className="relative">
            <button
              onClick={() => { playSound('click'); setIsWalletOpen(!isWalletOpen); }}
              className="bg-[#121722] hover:bg-[#1a2130] border border-white/[0.08] px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all"
            >
              <span className="text-sm">{activeWallet.icon}</span>
              <div className="text-left font-mono">
                <div className="text-xs font-bold text-white leading-tight">
                  {activeWallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">{activeWallet.symbol}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isWalletOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0f141d] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">
                  Select Crypto Balance
                </div>
                {wallets.map((w) => (
                  <button
                    key={w.symbol}
                    onClick={() => {
                      setSelectedCurrency(w.symbol);
                      setIsWalletOpen(false);
                      playSound('click');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                      selectedCurrency === w.symbol ? 'bg-[#00E701]/10 text-[#00E701] font-semibold' : 'text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{w.icon}</span>
                      <div>
                        <div className="font-semibold">{w.name}</div>
                        <div className="text-[10px] text-gray-400">{w.symbol}</div>
                      </div>
                    </div>
                    <div className="font-mono text-right">
                      {w.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playSound('click');
            }}
            title={soundEnabled ? 'Mute Sounds' : 'Enable Audio'}
            className="p-2 rounded-xl bg-[#121722] hover:bg-[#1a2130] text-gray-400 hover:text-white border border-white/[0.08] transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00E701]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Contest Specs Pill */}
          <button
            onClick={() => { playSound('click'); onOpenContestModal(); }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-green-950 border border-[#00E701]/40 text-[#00E701] text-xs font-semibold hover:border-[#00E701] transition-all shadow-[0_0_12px_rgba(0,231,1,0.2)]"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Contest Specs</span>
          </button>
        </div>
      </div>
    </header>
  );
};
