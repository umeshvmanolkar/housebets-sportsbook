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
    playClick
  } = useSportsbook();

  const [activeMarketTab, setActiveMarketTab] = useState('popular');
  const [collapsedMarkets, setCollapsedMarkets] = useState({});
  const [timeTab, setTimeTab] = useState('full-time'); // 'full-time' | '1up' | '2up'

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
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb matching Stake Screenshot 2 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#b1bad3]">
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="p-2 rounded-xl bg-[#1a2c38] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white"
        >
          <span>Soccer</span>
          <ChevronDown className="w-3 h-3 text-[#557086]" />
        </button>

        <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white">
          <span>{selectedMatch.country || 'International'}</span>
          <ChevronDown className="w-3 h-3 text-[#557086]" />
        </button>

        <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1a2c38] hover:text-white">
          <span>{selectedMatch.league}</span>
          <ChevronDown className="w-3 h-3 text-[#557086]" />
        </button>

        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#213743] text-white font-bold">
          <span>{selectedMatch.homeTeam.shortName} - {selectedMatch.awayTeam.shortName}</span>
          <ChevronDown className="w-3 h-3 text-[#00A3FF]" />
        </div>
      </div>

      {/* Main Grid: Left Stage (Markets) + Right Widget (Pitch Radar & Win Probability) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols): Hero Scoreboard + Markets */}
        <div className="lg:col-span-8 space-y-4">
          {/* Stake-style Hero Banner with Scoreboard Overlay */}
          <div className="rounded-3xl bg-gradient-to-r from-[#173042] via-[#102433] to-[#0d1e2b] border border-white/10 p-5 sm:p-7 relative overflow-hidden shadow-card-elevated">
            {/* Background soccer net subtle graphic */}
            <div className="absolute right-0 top-0 w-80 h-full opacity-10 bg-[radial-gradient(#00A3FF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Scoreboard Card */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#b1bad3] border-b border-white/[0.08] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00A3FF] font-bold">{selectedMatch.date}</span>
                  <span>• {selectedMatch.league}</span>
                </div>

                <div className="flex items-center gap-2">
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

              {/* Teams & Score */}
              <div className="grid grid-cols-12 items-center gap-3">
                {/* Home */}
                <div className="col-span-5 flex items-center gap-3">
                  <TeamCrest teamName={selectedMatch.homeTeam.name} className="w-10 h-10 flex-shrink-0" />
                  <div className="truncate">
                    <h2 className="text-base sm:text-lg font-black text-white truncate">
                      {selectedMatch.homeTeam.name}
                    </h2>
                    <button
                      onClick={() => toggleFollow({ name: selectedMatch.homeTeam.name, type: 'team' })}
                      className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{isHomeFollowed ? 'Following' : 'Follow'}</span>
                    </button>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-2 text-center">
                  <div className="font-mono text-2xl sm:text-4xl font-black text-white tracking-widest bg-[#0f212e]/80 px-3 py-1.5 rounded-2xl border border-white/5 inline-block">
                    {selectedMatch.isLive ? `${selectedMatch.homeTeam.score} - ${selectedMatch.awayTeam.score}` : 'vs'}
                  </div>
                </div>

                {/* Away */}
                <div className="col-span-5 flex items-center justify-end gap-3 text-right">
                  <div className="truncate">
                    <h2 className="text-base sm:text-lg font-black text-white truncate">
                      {selectedMatch.awayTeam.name}
                    </h2>
                    <button
                      onClick={() => toggleFollow({ name: selectedMatch.awayTeam.name, type: 'team' })}
                      className="text-[10px] text-amber-400 hover:underline flex items-center justify-end gap-1 mt-0.5"
                    >
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{isAwayFollowed ? 'Following' : 'Follow'}</span>
                    </button>
                  </div>
                  <TeamCrest teamName={selectedMatch.awayTeam.name} className="w-10 h-10 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Subnav & Search matching Stake Screenshot 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
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

          {/* Market 1: 1x2 (Exact match to Stake Screenshot 2) */}
          <div className="rounded-2xl bg-[#1a2c38] border border-white/[0.08] overflow-hidden shadow-card-elevated">
            <div className="p-3.5 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">1x2</span>
                {/* Sub-tabs: Full Time | 1UP | 2UP */}
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

            {/* 3 Odds horizontal boxes */}
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
                    className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'bg-[#1475e1] text-white font-black shadow-glow-blue'
                        : 'bg-[#213743] hover:bg-[#2a4454] text-white border border-white/5'
                    }`}
                  >
                    <span className="truncate font-medium text-[#b1bad3]">{label}</span>
                    <div className="flex items-center gap-1 font-mono font-bold">
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span className={isSelected ? 'text-white' : 'text-[#00A3FF]'}>
                        {opt.odd.toFixed(2)}
                      </span>
                    </div>
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
                className="p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
              >
                <span className="text-[#b1bad3]">{selectedMatch.homeTeam.name}</span>
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
                className="p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
              >
                <span className="text-[#b1bad3]">{selectedMatch.awayTeam.name}</span>
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
                className="p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
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
                className="p-3 rounded-xl bg-[#213743] hover:bg-[#2a4454] text-white flex items-center justify-between text-xs"
              >
                <span className="text-[#b1bad3]">No</span>
                <span className="font-mono font-bold text-[#00A3FF]">1.68</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Match Tracker Pitch Radar & Win Probability (From Stake Screenshot 2) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Stake-Style Match Tracker Card */}
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

            {/* Win Probability Bar (Stake reference: 76% NOR, 14% DRAW, 10% WAL) */}
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

            {/* 2D Synthetic Pitch Radar from Stake Screenshot 2 */}
            <div className="rounded-2xl bg-[#0e3b23] border border-emerald-500/30 p-3 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300">
                <span>Kickoff Time</span>
                <span className="bg-black/40 px-2 py-0.5 rounded font-bold">Prematch • Live</span>
              </div>

              {/* Countdown clock in pitch center: 00 Days 02 Hrs 21 Mins 12 Secs */}
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
      </div>
    </div>
  );
};
