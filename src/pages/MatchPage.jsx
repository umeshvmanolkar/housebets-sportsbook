import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  Star, 
  ChevronUp, 
  Check, 
  Lock, 
  AlertCircle 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

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

  const [activeMarketGroup, setActiveMarketGroup] = useState('popular');
  const [collapsedMarkets, setCollapsedMarkets] = useState({});
  const [simulateMarketSuspended, setSimulateMarketSuspended] = useState(false);

  const toggleAccordion = (id) => {
    playClick();
    setCollapsedMarkets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isHomeFollowed = isFollowed(selectedMatch.homeTeam.name);
  const isAwayFollowed = isFollowed(selectedMatch.awayTeam.name);

  const marketTabs = [
    { id: 'popular', label: 'Popular', count: 10 },
    { id: 'goalscorers', label: 'Goalscorers', count: 9 },
    { id: 'goals', label: 'Goals', count: 11 },
    { id: 'players', label: 'Players', count: 11 },
    { id: 'halves', label: 'Halves', count: 8 },
    { id: 'handicaps', label: 'Handicaps', count: 5 },
    { id: 'cornersCards', label: 'Corners & cards', count: 14 },
    { id: 'minutes', label: 'Minutes', count: 10 },
    { id: 'specials', label: 'Specials', count: 7 },
    { id: 'all', label: 'All markets', count: 85 }
  ];

  const currentMarkets = selectedMatch.marketGroups
    ? selectedMatch.marketGroups[activeMarketGroup] || selectedMatch.marketGroups.popular
    : [];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6">
      {/* Top Breadcrumbs matching Screenshot 4: `< Soccer ⌵  England ⌵  Premier League ⌵  ARS - BHA ⌵` */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="p-1.5 rounded-xl bg-[#0e1c28] hover:bg-[#142636] border border-white/5 text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00A3FF]" />
        </button>

        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0e1c28] border border-white/5 text-gray-300 hover:text-white"
        >
          <span>Soccer</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </button>

        <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0e1c28] border border-white/5 text-gray-300">
          <span>England</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </button>

        <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0e1c28] border border-white/5 text-gray-300">
          <span>Premier League</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </button>

        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0e2738] border border-[#00A3FF]/30 text-[#00A3FF] font-bold">
          <span>ARS - BHA</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Match Header / Scoreboard Card (Contest Requirement: "Scoreboard: score, clock") */}
      <div className="rounded-3xl bg-[#0e1c28] border border-white/[0.08] p-5 sm:p-7 shadow-lg relative overflow-hidden">
        {/* Subheader: Premier League with Follow star */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <span className="text-[11px] font-mono text-gray-400 font-bold uppercase tracking-wider">
            PREMIER LEAGUE
          </span>
          <button
            onClick={() => toggleFollow({ name: 'Premier League', type: 'competition', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' })}
            className="p-1 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Star className={`w-4 h-4 ${isFollowed('Premier League') ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Teams and Live Clock Display */}
        <div className="grid grid-cols-12 items-center gap-2 sm:gap-4 py-2">
          {/* Home Team (Arsenal) */}
          <div className="col-span-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl">{selectedMatch.homeTeam.logo}</span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white">{selectedMatch.homeTeam.name}</h2>
              <button
                onClick={() => toggleFollow({ name: selectedMatch.homeTeam.name, type: 'team', icon: selectedMatch.homeTeam.logo })}
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 transition-colors ${
                  isHomeFollowed
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                <Star className={`w-3 h-3 ${isHomeFollowed ? 'fill-amber-400' : ''}`} />
                <span>{isHomeFollowed ? 'Following' : 'Follow'}</span>
              </button>
            </div>
          </div>

          {/* Score & Clock */}
          <div className="col-span-2 text-center">
            <div className="font-mono text-2xl sm:text-4xl font-black text-white tracking-widest">
              {selectedMatch.homeTeam.score} - {selectedMatch.awayTeam.score}
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[10px] font-mono font-bold mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE {selectedMatch.minute}</span>
            </div>
          </div>

          {/* Away Team (Brighton) */}
          <div className="col-span-5 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 text-center sm:text-right">
            <div>
              <h2 className="text-base sm:text-xl font-black text-white">{selectedMatch.awayTeam.name}</h2>
              <button
                onClick={() => toggleFollow({ name: selectedMatch.awayTeam.name, type: 'team', icon: selectedMatch.awayTeam.logo })}
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 transition-colors ${
                  isAwayFollowed
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                <Star className={`w-3 h-3 ${isAwayFollowed ? 'fill-amber-400' : ''}`} />
                <span>{isAwayFollowed ? 'Following' : 'Follow'}</span>
              </button>
            </div>
            <span className="text-3xl sm:text-4xl">{selectedMatch.awayTeam.logo}</span>
          </div>
        </div>
      </div>

      {/* Search markets */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search markets or players"
          className="w-full bg-[#0e1c28] text-xs text-gray-200 pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] focus:border-[#00A3FF] focus:outline-none placeholder:text-gray-500 transition-colors"
        />
      </div>

      {/* Market Category Pills (Contest Requirement: "Popular, Goals, Halves, Handicaps, Goalscorers, Corners & cards") */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {marketTabs.map((tab) => {
          const isActive = activeMarketGroup === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { playClick(); setActiveMarketGroup(tab.id); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#00A3FF] text-white font-bold shadow-sm'
                  : 'bg-[#0e1c28] text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${isActive ? 'bg-black/20 text-white font-bold' : 'text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toggle to demonstrate suspended markets (Contest Requirement: "Odds moving, markets suspended") */}
      <div className="flex items-center justify-between text-xs px-1 text-gray-400">
        <span>Click any odd to add to slip</span>
        <button
          onClick={() => { playClick(); setSimulateMarketSuspended(!simulateMarketSuspended); }}
          className="text-[#00A3FF] hover:underline font-mono text-[11px]"
        >
          {simulateMarketSuspended ? '🔓 Unlock Markets' : '🔒 Simulate Market Suspended'}
        </button>
      </div>

      {/* Market Accordions List */}
      <div className="space-y-3">
        {currentMarkets.map((market) => {
          const isCollapsed = collapsedMarkets[market.id];

          return (
            <div
              key={market.id}
              className="rounded-2xl bg-[#0e1c28] border border-white/[0.08] overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(market.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-white hover:bg-white/[0.02] transition-colors"
              >
                <span>{market.name}</span>
                {isCollapsed ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronUp className="w-4 h-4 text-gray-500" />}
              </button>

              {/* Accordion Content */}
              {!isCollapsed && (
                <div className="p-3 pt-0 border-t border-white/[0.04]">
                  {simulateMarketSuspended ? (
                    <div className="p-3 rounded-xl bg-[#132230] text-amber-400 text-xs font-bold flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Market Currently Suspended</span>
                    </div>
                  ) : (
                    <div className={`grid gap-2 ${
                      market.options.length === 3 ? 'grid-cols-3' : market.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
                    }`}>
                      {market.options.map((opt) => {
                        const isSelected = singlesInSlip.some((s) => s.id === opt.id);

                        return (
                          <button
                            key={opt.id}
                            onClick={() =>
                              toggleSelection({
                                id: opt.id,
                                matchId: selectedMatch.id,
                                matchTitle: `${selectedMatch.homeTeam.name} v ${selectedMatch.awayTeam.name}`,
                                scoreMinute: `${selectedMatch.homeTeam.score}-${selectedMatch.awayTeam.score} ${selectedMatch.minute}`,
                                marketName: market.name,
                                selectionName: opt.label,
                                odd: opt.odd,
                                isSuspended: false
                              })
                            }
                            className={`p-3 rounded-xl text-xs flex items-center justify-between gap-3 transition-all ${
                              isSelected
                                ? 'bg-[#00A3FF] text-white font-black shadow-md'
                                : 'bg-[#132230] hover:bg-[#182c3f] text-gray-300 border border-white/5'
                            }`}
                          >
                            <span className="truncate font-medium">{opt.label}</span>
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
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
