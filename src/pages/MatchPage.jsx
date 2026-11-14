import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Check, 
  Lock, 
  Activity,
  Clock,
  TrendingUp,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { TeamCrest } from '../components/Logos';

export const MatchPage = () => {
  const {
    selectedMatch,
    setCurrentPage,
    singlesInSlip,
    toggleSelection,
    favourites,
    toggleFollow,
    isFollowed,
    playClick,
    isMobile
  } = useSportsbook();

  const [activeMarketTab, setActiveMarketTab] = useState('popular');
  const [collapsedMarkets, setCollapsedMarkets] = useState({});
  const [timeTab, setTimeTab] = useState('full-time'); // 'full-time' | '1up' | '2up'
  const [mobileTab, setMobileTab] = useState('markets'); // 'markets' | 'tracker'

  const toggleAccordion = (id) => {
    playClick();
    setCollapsedMarkets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isHomeFollowed = isFollowed(selectedMatch.homeTeam.name);
  const isAwayFollowed = isFollowed(selectedMatch.awayTeam.name);

  const marketTabs = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'goals', label: 'Goals' },
    { id: 'asian', label: 'Asian Lines' },
    { id: 'goalscorers', label: 'Goalscorers' },
    { id: 'players', label: 'Players' },
    { id: 'half', label: 'Half' },
    { id: 'cardsCorners', label: 'Cards and Corners' }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto px-0.5 sm:px-1">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#b1bad3] scrollbar-none">
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="p-2 rounded-xl bg-[#1a2c38] hover:text-white transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white flex-shrink-0"
        >
          <span>Soccer</span>
          <ChevronDown className="w-3 h-3 text-[#557086]" />
        </button>

        {!isMobile && (
          <>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white flex-shrink-0">
              <span>{selectedMatch.country || 'England'}</span>
              <ChevronDown className="w-3 h-3 text-[#557086]" />
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white flex-shrink-0">
              <span>{selectedMatch.league}</span>
              <ChevronDown className="w-3 h-3 text-[#557086]" />
            </button>
          </>
        )}

        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#213743] text-white font-bold flex-shrink-0">
          <span>{selectedMatch.homeTeam.shortName || selectedMatch.homeTeam.name.slice(0, 3)} - {selectedMatch.awayTeam.shortName || selectedMatch.awayTeam.name.slice(0, 3)}</span>
          <ChevronDown className="w-3 h-3 text-[#00A3FF]" />
        </div>
      </div>

      {/* Hero Scoreboard Banner (Full width on both Mobile and Desktop) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#173042] via-[#102433] to-[#0d1e2b] border border-white/10 p-4 sm:p-6 relative overflow-hidden shadow-card-elevated">
        <div className="relative z-10 space-y-3 sm:space-y-4">
          {/* Meta row: Date, League & Live Badge */}
          <div className="flex items-center justify-between text-xs text-[#b1bad3] border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[#00A3FF] font-bold flex-shrink-0">{selectedMatch.date}</span>
              <span className="truncate max-w-[120px] sm:max-w-none">• {selectedMatch.league}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {selectedMatch.isLive ? (
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE {selectedMatch.minute}
                </span>
              ) : (
                <span className="text-gray-400 font-mono text-[10px]">Upcoming</span>
              )}
              <button
                onClick={() => toggleFollow({ name: selectedMatch.league, type: 'competition' })}
                className="p-1 text-[#557086] hover:text-amber-400 transition-colors"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Teams & Score Row (Symmetric, never breaking onto multiple single-char lines) */}
          <div className="flex items-center justify-between gap-2 py-1">
            {/* Home Team */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
              <TeamCrest teamName={selectedMatch.homeTeam.name} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
              <div className="min-w-0">
                <h2 className="text-xs sm:text-base font-black text-white truncate">
                  {selectedMatch.homeTeam.name}
                </h2>
                <button
                  onClick={() => toggleFollow({ name: selectedMatch.homeTeam.name, type: 'team' })}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5 mt-0.5"
                >
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <span>{isHomeFollowed ? 'Following' : selectedMatch.homeTeam.shortName || 'Follow'}</span>
                </button>
              </div>
            </div>

            {/* Score Center Box */}
            <div className="px-2 flex-shrink-0 text-center">
              <div className="font-mono text-xl sm:text-3xl font-black text-white tracking-widest bg-[#0f212e]/90 px-3 py-1.5 rounded-2xl border border-white/10 shadow-inner">
                {selectedMatch.isLive ? `${selectedMatch.homeTeam.score} - ${selectedMatch.awayTeam.score}` : 'vs'}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 min-w-0 text-right">
              <div className="min-w-0">
                <h2 className="text-xs sm:text-base font-black text-white truncate">
                  {selectedMatch.awayTeam.name}
                </h2>
                <button
                  onClick={() => toggleFollow({ name: selectedMatch.awayTeam.name, type: 'team' })}
                  className="text-[10px] text-amber-400 hover:underline flex items-center justify-end gap-0.5 mt-0.5"
                >
                  <span>{isAwayFollowed ? 'Following' : selectedMatch.awayTeam.shortName || 'Follow'}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                </button>
              </div>
              <TeamCrest teamName={selectedMatch.awayTeam.name} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher: Markets vs Tracker/Stats */}
      {isMobile && (
        <div className="flex rounded-xl bg-[#1a2c38] p-1 border border-[#213743]">
          <button
            onClick={() => { playClick(); setMobileTab('markets'); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'markets' ? 'bg-[#1475e1] text-white shadow-sm' : 'text-[#b1bad3]'
            }`}
          >
            Markets ({selectedMatch.moreMarketsCount || 115})
          </button>
          <button
            onClick={() => { playClick(); setMobileTab('tracker'); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'tracker' ? 'bg-[#1475e1] text-white shadow-sm' : 'text-[#b1bad3]'
            }`}
          >
            Tracker & Radar
          </button>
        </div>
      )}

      {/* Main Grid: Desktop side-by-side (8 col / 4 col), Mobile single full-width column */}
      <div className={isMobile ? "space-y-4 w-full" : "grid grid-cols-12 gap-5"}>
        {/* Markets Stage */}
        {(!isMobile || mobileTab === 'markets') && (
          <div className={isMobile ? "space-y-4 w-full" : "col-span-8 space-y-4"}>
            {/* Subnav & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                {marketTabs.map((tab) => {
                  const isActive = activeMarketTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { playClick(); setActiveMarketTab(tab.id); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-[#1475e1] text-white shadow-sm'
                          : 'bg-[#1a2c38] text-[#b1bad3] hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-44">
                <Search className="w-3.5 h-3.5 text-[#557086] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search markets"
                  className="w-full bg-[#1a2c38] text-xs text-white pl-8 pr-3 py-1.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#1475e1]"
                />
              </div>
            </div>

            {/* Market 1: 1x2 */}
            <div className="rounded-2xl bg-[#1a2c38] border border-white/[0.08] overflow-hidden shadow-card-elevated">
              <div className="p-3.5 border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-white uppercase tracking-wider">1x2</span>
                  <div className="flex items-center bg-[#0f212e] p-0.5 rounded-lg border border-white/5 text-[10px] font-bold">
                    {['Full Time', '1UP', '2UP'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeTab(t.toLowerCase().replace(' ', '-'))}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          timeTab === t.toLowerCase().replace(' ', '-') ? 'bg-[#213743] text-white' : 'text-[#557086] hover:text-[#b1bad3]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <ChevronUp className="w-4 h-4 text-gray-500" />
              </div>

              {/* 3 Odds Boxes */}
              <div className="p-3 grid grid-cols-3 gap-2">
                {[
                  { label: selectedMatch.homeTeam.name, opt: selectedMatch.matchResult.home },
                  { label: 'Draw', opt: selectedMatch.matchResult.draw },
                  { label: selectedMatch.awayTeam.name, opt: selectedMatch.matchResult.away }
                ].map(({ label, opt }) => {
                  const isSelected = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSelection({
                          id: opt.id,
                          matchId: selectedMatch.id,
                          matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                          scoreMinute: selectedMatch.isLive ? `${selectedMatch.homeTeam.score}-${selectedMatch.awayTeam.score} ${selectedMatch.minute}` : selectedMatch.date,
                          marketName: '1x2',
                          selectionName: opt.label,
                          odd: opt.odd,
                          isSuspended: selectedMatch.isSuspended
                        })
                      }
                      className={`p-2.5 rounded-xl flex flex-col items-center justify-center text-center transition-all border ${
                        isSelected
                          ? 'bg-[#1475e1] border-[#1475e1] text-white font-black shadow-glow-blue'
                          : 'bg-[#213743] hover:bg-[#2a4454] text-white border border-white/5'
                      }`}
                    >
                      <span className="truncate max-w-full text-[11px] font-bold text-[#b1bad3]">{label}</span>
                      <span className={`font-mono text-xs font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-[#00A3FF]'}`}>
                        {opt.odd.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Market 2: Draw No Bet */}
            <div className="rounded-2xl bg-[#1a2c38] border border-white/[0.08] overflow-hidden shadow-card-elevated">
              <div className="p-3.5 border-b border-white/[0.05] flex items-center justify-between">
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">Draw No Bet</span>
                <ChevronUp className="w-4 h-4 text-gray-500" />
              </div>

              <div className="p-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    toggleSelection({
                      id: `dnb-${selectedMatch.id}-1`,
                      matchId: selectedMatch.id,
                      matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                      marketName: 'Draw No Bet',
                      selectionName: selectedMatch.homeTeam.name,
                      odd: 1.09
                    })
                  }
                  className="p-2.5 sm:p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
                >
                  <span className="text-[#b1bad3] truncate pr-2">{selectedMatch.homeTeam.name}</span>
                  <span className="font-mono font-bold text-[#00A3FF]">1.09</span>
                </button>

                <button
                  onClick={() =>
                    toggleSelection({
                      id: `dnb-${selectedMatch.id}-2`,
                      matchId: selectedMatch.id,
                      matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                      marketName: 'Draw No Bet',
                      selectionName: selectedMatch.awayTeam.name,
                      odd: 6.00
                    })
                  }
                  className="p-2.5 sm:p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
                >
                  <span className="text-[#b1bad3] truncate pr-2">{selectedMatch.awayTeam.name}</span>
                  <span className="font-mono font-bold text-[#00A3FF]">6.00</span>
                </button>
              </div>
            </div>

            {/* Market 3: Both Teams to Score */}
            <div className="rounded-2xl bg-[#1a2c38] border border-white/[0.08] overflow-hidden shadow-card-elevated">
              <div className="p-3.5 border-b border-white/[0.05] flex items-center justify-between">
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">Both Teams to Score</span>
                <ChevronUp className="w-4 h-4 text-gray-500" />
              </div>

              <div className="p-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    toggleSelection({
                      id: `btts-${selectedMatch.id}-y`,
                      matchId: selectedMatch.id,
                      matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                      marketName: 'Both Teams to Score',
                      selectionName: 'Yes',
                      odd: 2.10
                    })
                  }
                  className="p-2.5 sm:p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
                >
                  <span className="text-[#b1bad3]">Yes</span>
                  <span className="font-mono font-bold text-[#00A3FF]">2.10</span>
                </button>

                <button
                  onClick={() =>
                    toggleSelection({
                      id: `btts-${selectedMatch.id}-n`,
                      matchId: selectedMatch.id,
                      matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                      marketName: 'Both Teams to Score',
                      selectionName: 'No',
                      odd: 1.68
                    })
                  }
                  className="p-2.5 sm:p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
                >
                  <span className="text-[#b1bad3]">No</span>
                  <span className="font-mono font-bold text-[#00A3FF]">1.68</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Column / Mobile Tab: Match Tracker Pitch Radar & Win Probability */}
        {(!isMobile || mobileTab === 'tracker') && (
          <div className={isMobile ? "space-y-4 w-full" : "col-span-4 space-y-4"}>
            <div className="p-4 rounded-3xl bg-[#1a2c38] border border-white/[0.08] space-y-4 shadow-card-elevated">
              {/* Header: Flags + Date */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <TeamCrest teamName={selectedMatch.homeTeam.name} className="w-5 h-5" />
                  <span className="font-mono font-bold text-xs text-white">{selectedMatch.homeTeam.shortName}</span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-mono font-bold text-xs text-white">{selectedMatch.awayTeam.shortName}</span>
                  <TeamCrest teamName={selectedMatch.awayTeam.name} className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#00A3FF] font-bold">{selectedMatch.date}</span>
              </div>

              {/* Win Probability Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-[#b1bad3]">
                  <span>Win Probability</span>
                  <span className="text-[#00A3FF] font-mono">Live Projections</span>
                </div>
                <div className="h-2 rounded-full bg-[#0f212e] overflow-hidden flex">
                  <div className="bg-[#1475e1] h-full" style={{ width: `${selectedMatch.winProbability?.home || 76}%` }} />
                  <div className="bg-[#557086] h-full" style={{ width: `${selectedMatch.winProbability?.draw || 14}%` }} />
                  <div className="bg-[#e91e63] h-full" style={{ width: `${selectedMatch.winProbability?.away || 10}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span className="text-[#1475e1] font-bold">{selectedMatch.homeTeam.shortName} {selectedMatch.winProbability?.home || 76}%</span>
                  <span>DRAW {selectedMatch.winProbability?.draw || 14}%</span>
                  <span className="text-[#e91e63] font-bold">{selectedMatch.awayTeam.shortName} {selectedMatch.winProbability?.away || 10}%</span>
                </div>
              </div>

              {/* 2D Synthetic Pitch Radar from Stake Reference */}
              <div className="rounded-2xl bg-[#0e3b23] border border-emerald-500/30 p-3 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300">
                  <span>Kickoff Time</span>
                  <span className="bg-black/40 px-2 py-0.5 rounded font-bold">Prematch • Live</span>
                </div>

                {/* Countdown clock in pitch center */}
                <div className="text-center py-4 bg-black/30 rounded-xl border border-white/10 space-y-1">
                  <div className="font-mono text-xl font-black text-white tracking-widest">
                    00 : 02 : 21 : 12
                  </div>
                  <div className="flex justify-center gap-4 text-[9px] font-mono text-[#b1bad3]">
                    <span>Days</span>
                    <span>Hrs</span>
                    <span>Mins</span>
                    <span>Secs</span>
                  </div>
                </div>

                {/* Match officials info */}
                <div className="flex justify-between text-[10px] text-emerald-200/80 font-mono pt-1">
                  <span>Referee: M. Oliver</span>
                  <span>London Stadium</span>
                </div>
              </div>

              {/* Head to Head Summary */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                  Head to Head (Last 5 Encounters)
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#213743]">
                    <span className="text-[10px] text-gray-400 block font-sans">Home Wins</span>
                    <span className="text-sm font-black text-white font-mono">3</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#213743]">
                    <span className="text-[10px] text-gray-400 block font-sans">Draws</span>
                    <span className="text-sm font-black text-white font-mono">2</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#213743]">
                    <span className="text-[10px] text-gray-400 block font-sans">Away Wins</span>
                    <span className="text-sm font-black text-white font-mono">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
