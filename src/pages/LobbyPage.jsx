import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Sliders,
  Filter
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { UPCOMING_FIXTURES } from '../data/mockData';

export const LobbyPage = () => {
  const {
    liveMatches,
    setSelectedMatchId,
    setCurrentPage,
    formatOdds,
    singlesInSlip,
    toggleSingleBet,
    selectedSport,
    setSelectedSport,
    playSound
  } = useSportsbook();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'live' | 'upcoming'

  const filteredMatches = liveMatches.filter((m) => {
    if (selectedSport && selectedSport !== 'all' && m.sport !== selectedSport) {
      // if selected sport has no matches, fall back to showing matches
      return true;
    }
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6">
      {/* Hero Marquee / Featured Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0c1b12] via-[#0f1724] to-[#141224] border border-[#00E701]/30 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E701]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E701]/10 border border-[#00E701]/30 text-[#00E701] text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-[#00E701]" />
            HOUSEBETS CONTEST PROTOTYPE — 5 PAGES, SINGLES ONLY
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Speed of DeFi. The Thrill of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E701] to-[#00ff9d]">Sportsbook</span>.
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Zero accumulator friction. High-liquidity single bets with instant Solana settlements and live cashout controls.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                playSound('click');
                setSelectedMatchId('match-1');
                setCurrentPage('match-detail');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#00E701] hover:bg-[#00c801] text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-glow-green transition-all"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Launch Live Match Tracker</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playSound('click');
                setCurrentPage('my-bets');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-semibold text-xs sm:text-sm border border-white/10 transition-colors"
            >
              View Player Vault & PnL
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Fixtures', icon: Filter },
            { id: 'live', label: '🔥 Live In-Play', icon: Flame, count: liveMatches.length },
            { id: 'upcoming', label: '⏰ Upcoming', icon: Clock, count: UPCOMING_FIXTURES.length }
          ].map((tab) => {
            const isTabActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playSound('click'); setActiveFilter(tab.id); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isTabActive
                    ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                    : 'bg-[#121722] text-gray-300 hover:text-white border border-white/[0.06]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isTabActive ? 'bg-black text-[#00E701]' : 'bg-white/10 text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-gray-400 font-mono hidden sm:block">
          <span className="text-[#00E701] font-bold">●</span> Live Odds Engine Active
        </div>
      </div>

      {/* Live Matches Grid (Page 1 Core Experience) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Live In-Play Matches ({filteredMatches.length})
            </h2>
          </div>
          <span className="text-xs text-gray-400">Click any odd to add single</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMatches.map((match) => {
            const isSelected = singlesInSlip.some((s) => s.matchId === match.id);

            return (
              <div
                key={match.id}
                className="rounded-2xl bg-[#0f141d] border border-white/[0.08] hover:border-white/20 transition-all p-4 space-y-3 shadow-glow-card relative group"
              >
                {/* Match Header */}
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-300">{match.league}</span>
                    <span className="text-[10px] text-gray-500">• {match.country}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {match.minute}
                    </span>
                    <button
                      onClick={() => {
                        playSound('click');
                        setSelectedMatchId(match.id);
                        setCurrentPage('match-detail');
                      }}
                      className="text-[11px] text-[#00E701] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <span>Tracker</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Teams & Score */}
                <div 
                  onClick={() => {
                    playSound('click');
                    setSelectedMatchId(match.id);
                    setCurrentPage('match-detail');
                  }}
                  className="grid grid-cols-12 items-center gap-2 cursor-pointer py-1"
                >
                  {/* Home Team */}
                  <div className="col-span-5 flex items-center gap-2.5">
                    <span className="text-xl">{match.homeTeam.logo}</span>
                    <div className="truncate">
                      <div className="text-sm font-bold text-white truncate">{match.homeTeam.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Rank: {match.homeTeam.rank}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 text-center">
                    <div className="font-mono text-lg font-black text-white bg-[#141a26] px-2 py-1 rounded-xl border border-white/5 inline-block">
                      {match.homeTeam.score} : {match.awayTeam.score}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="col-span-5 flex items-center justify-end gap-2.5 text-right">
                    <div className="truncate">
                      <div className="text-sm font-bold text-white truncate">{match.awayTeam.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Rank: {match.awayTeam.rank}</div>
                    </div>
                    <span className="text-xl">{match.awayTeam.logo}</span>
                  </div>
                </div>

                {/* Live Match Commentary Ticker */}
                <div className="bg-[#121722] rounded-xl px-3 py-1.5 flex items-center gap-2 text-[11px] text-gray-300 border border-white/[0.04]">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E701] flex-shrink-0" />
                  <span className="truncate">{match.liveEvent}</span>
                </div>

                {/* Singles Betting Market: Match Winner (1X2) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                    <span>Match Winner (Single Bet)</span>
                    <span className="text-[10px] text-gray-500">1X2</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {match.markets.matchWinner.map((option) => {
                      const isBetInSlip = singlesInSlip.some((s) => s.id === option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() =>
                            toggleSingleBet({
                              id: option.id,
                              matchId: match.id,
                              matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                              marketName: 'Match Winner',
                              selectionName: option.label,
                              odd: option.odd,
                              trend: option.trend
                            })
                          }
                          className={`p-2 rounded-xl flex items-center justify-between text-xs transition-all ${
                            isBetInSlip
                              ? 'bg-[#00E701] text-black font-extrabold shadow-glow-green-sm scale-[1.02]'
                              : 'bg-[#141a26] hover:bg-[#1a2233] text-gray-200 border border-white/[0.06]'
                          } ${
                            option.trend === 'up'
                              ? 'border-emerald-500/40'
                              : option.trend === 'down'
                              ? 'border-red-500/40'
                              : ''
                          }`}
                        >
                          <span className="truncate font-medium">{option.label}</span>
                          <div className="flex items-center gap-1 font-mono font-bold">
                            {option.trend === 'up' && (
                              <TrendingUp className={`w-3 h-3 ${isBetInSlip ? 'text-black' : 'text-[#00E701]'}`} />
                            )}
                            {option.trend === 'down' && (
                              <TrendingDown className={`w-3 h-3 ${isBetInSlip ? 'text-black' : 'text-red-400'}`} />
                            )}
                            <span>{formatOdds(option.odd)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Market: Total Goals or Handicap */}
                {match.markets.totalGoals && (
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.04]">
                    {match.markets.totalGoals.slice(0, 2).map((opt) => {
                      const isBetInSlip = singlesInSlip.some((s) => s.id === opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() =>
                            toggleSingleBet({
                              id: opt.id,
                              matchId: match.id,
                              matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                              marketName: 'Total Goals',
                              selectionName: opt.label,
                              odd: opt.odd,
                              trend: opt.trend
                            })
                          }
                          className={`p-1.5 px-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                            isBetInSlip
                              ? 'bg-[#00E701] text-black font-extrabold shadow-glow-green-sm'
                              : 'bg-[#121722] hover:bg-[#182030] text-gray-300 border border-white/[0.04]'
                          }`}
                        >
                          <span className="text-[11px] font-medium">{opt.label}</span>
                          <span className="font-mono font-bold">{formatOdds(opt.odd)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming High-Liquidity Fixtures */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00E701]" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Upcoming Marquee Matches
            </h2>
          </div>
          <button
            onClick={() => { playSound('click'); setCurrentPage('leagues'); }}
            className="text-xs text-[#00E701] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Competitions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {UPCOMING_FIXTURES.map((fixture) => (
            <div
              key={fixture.id}
              className="p-3.5 rounded-2xl bg-[#0f141d] border border-white/[0.08] hover:border-white/20 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>{fixture.league}</span>
                <span className="font-mono text-gray-500">{fixture.date}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span>{fixture.homeTeam.logo}</span>
                    <span>{fixture.homeTeam.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span>{fixture.awayTeam.logo}</span>
                    <span>{fixture.awayTeam.name}</span>
                  </div>
                </div>
              </div>

              {/* Quick Singles Odds */}
              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
                <button
                  onClick={() =>
                    toggleSingleBet({
                      id: `up-${fixture.id}-1`,
                      matchId: fixture.id,
                      matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                      marketName: 'Match Winner',
                      selectionName: fixture.homeTeam.name,
                      odd: fixture.odds.home,
                      trend: 'none'
                    })
                  }
                  className="p-1 rounded-lg bg-[#141a26] hover:bg-[#1e2638] text-[11px] font-mono text-center text-white"
                >
                  <span className="text-[9px] text-gray-500 block">1</span>
                  <strong>{formatOdds(fixture.odds.home)}</strong>
                </button>

                <button
                  onClick={() =>
                    toggleSingleBet({
                      id: `up-${fixture.id}-x`,
                      matchId: fixture.id,
                      matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                      marketName: 'Match Winner',
                      selectionName: 'Draw',
                      odd: fixture.odds.draw || 3.5,
                      trend: 'none'
                    })
                  }
                  className="p-1 rounded-lg bg-[#141a26] hover:bg-[#1e2638] text-[11px] font-mono text-center text-white"
                >
                  <span className="text-[9px] text-gray-500 block">X</span>
                  <strong>{fixture.odds.draw ? formatOdds(fixture.odds.draw) : '-'}</strong>
                </button>

                <button
                  onClick={() =>
                    toggleSingleBet({
                      id: `up-${fixture.id}-2`,
                      matchId: fixture.id,
                      matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                      marketName: 'Match Winner',
                      selectionName: fixture.awayTeam.name,
                      odd: fixture.odds.away,
                      trend: 'none'
                    })
                  }
                  className="p-1 rounded-lg bg-[#141a26] hover:bg-[#1e2638] text-[11px] font-mono text-center text-white"
                >
                  <span className="text-[9px] text-gray-500 block">2</span>
                  <strong>{formatOdds(fixture.odds.away)}</strong>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
