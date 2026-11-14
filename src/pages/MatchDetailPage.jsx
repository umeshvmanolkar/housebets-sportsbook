import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Activity, 
  Sliders, 
  CheckCircle,
  HelpCircle,
  Clock,
  Zap
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { HUBIE_INSIGHTS } from '../data/mockData';

export const MatchDetailPage = () => {
  const {
    selectedMatch,
    setCurrentPage,
    formatOdds,
    singlesInSlip,
    toggleSingleBet,
    liveMatches,
    setSelectedMatchId,
    playSound
  } = useSportsbook();

  const [activeMarketTab, setActiveMarketTab] = useState('all');

  const hubieNote = HUBIE_INSIGHTS.find((h) => h.matchId === selectedMatch.id) || HUBIE_INSIGHTS[0];

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6">
      {/* Top Breadcrumb & Match Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => { playSound('click'); setCurrentPage('lobby'); }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white bg-[#121722] px-3 py-1.5 rounded-xl border border-white/[0.08] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#00E701]" />
          <span>Back to All Fixtures</span>
        </button>

        {/* Quick match switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {liveMatches.map((m) => (
            <button
              key={m.id}
              onClick={() => { playSound('click'); setSelectedMatchId(m.id); }}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedMatch.id === m.id
                  ? 'bg-[#00E701] text-black font-bold shadow-glow-green-sm'
                  : 'bg-[#121722] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {m.homeTeam.shortName} vs {m.awayTeam.shortName} ({m.homeTeam.score}-{m.awayTeam.score})
            </button>
          ))}
        </div>
      </div>

      {/* Hero Match Scoreboard */}
      <div className="rounded-3xl bg-[#0f141d] border border-white/[0.08] p-5 sm:p-7 relative overflow-hidden shadow-glow-card">
        <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-300">{selectedMatch.league}</span>
            <span className="text-xs text-gray-500">• {selectedMatch.period}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>LIVE {selectedMatch.minute}</span>
          </div>
        </div>

        {/* Score Board */}
        <div className="grid grid-cols-12 items-center gap-4 py-2">
          {/* Home Team */}
          <div className="col-span-5 flex flex-col items-center sm:flex-row sm:items-center gap-3 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#141a26] border border-white/10 flex items-center justify-center text-3xl shadow-md">
              {selectedMatch.homeTeam.logo}
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white">{selectedMatch.homeTeam.name}</h2>
              <div className="text-xs text-gray-400 font-mono">Form: {selectedMatch.homeTeam.form.join(' ')}</div>
            </div>
          </div>

          {/* Scores */}
          <div className="col-span-2 text-center">
            <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-widest bg-[#141a26] px-4 py-2 rounded-2xl border border-white/10 inline-block shadow-inner">
              {selectedMatch.homeTeam.score} : {selectedMatch.awayTeam.score}
            </div>
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex flex-col-reverse items-center sm:flex-row sm:items-center justify-end gap-3 text-center sm:text-right">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white">{selectedMatch.awayTeam.name}</h2>
              <div className="text-xs text-gray-400 font-mono">Form: {selectedMatch.awayTeam.form.join(' ')}</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#141a26] border border-white/10 flex items-center justify-center text-3xl shadow-md">
              {selectedMatch.awayTeam.logo}
            </div>
          </div>
        </div>
      </div>

      {/* 2D Interactive Pitch Radar & Match Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Animated Pitch / Court Visualizer */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0d1612] border border-[#00E701]/20 p-5 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00E701]" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Live 2D Match Radar & Attack Tracker
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#00E701] font-bold">
              Latency: 14ms (WebSockets)
            </span>
          </div>

          {/* Synthetic Pitch */}
          <div className="h-48 sm:h-56 soccer-pitch rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Center Line and Circle */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            
            {/* Penalty boxes */}
            <div className="absolute inset-y-8 left-0 w-16 border-r border-t border-b border-white/20" />
            <div className="absolute inset-y-8 right-0 w-16 border-l border-t border-b border-white/20" />

            {/* Radar Coordinates of Action */}
            <div
              className="absolute w-8 h-8 rounded-full bg-[#00E701]/30 border-2 border-[#00E701] flex items-center justify-center animate-ping"
              style={{
                left: `${selectedMatch.radarCoords?.x || 70}%`,
                top: `${selectedMatch.radarCoords?.y || 45}%`
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-full bg-[#00E701] shadow-[0_0_12px_#00E701]"
              style={{
                left: `${(selectedMatch.radarCoords?.x || 70) + 0.6}%`,
                top: `${(selectedMatch.radarCoords?.y || 45) + 0.6}%`
              }}
            />

            {/* Live event notification banner inside pitch */}
            <div className="z-10 flex justify-between items-start text-xs font-mono">
              <span className="bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg text-white border border-white/10">
                {selectedMatch.homeTeam.shortName}
              </span>
              <span className="bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg text-white border border-white/10">
                {selectedMatch.awayTeam.shortName}
              </span>
            </div>

            <div className="z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#00E701]/40 text-xs font-semibold text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#00E701] animate-pulse" />
                <span>{selectedMatch.liveEvent}</span>
              </div>
            </div>

            <div className="z-10 flex justify-between text-[10px] text-gray-400 font-mono">
              <span>Goal Line (Home)</span>
              <span>Goal Line (Away)</span>
            </div>
          </div>

          {/* Possession Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span className="text-[#00E701]">{selectedMatch.homeTeam.name}: {selectedMatch.stats.possession[0]}%</span>
              <span className="text-gray-400">Ball Possession</span>
              <span className="text-blue-400">{selectedMatch.awayTeam.name}: {selectedMatch.stats.possession[1]}%</span>
            </div>
            <div className="h-2 w-full bg-[#141a26] rounded-full overflow-hidden flex">
              <div
                className="bg-[#00E701] h-full transition-all duration-500"
                style={{ width: `${selectedMatch.stats.possession[0]}%` }}
              />
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${selectedMatch.stats.possession[1]}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Col: Live Stats & Hubie AI Sharp Alert */}
        <div className="space-y-4">
          {/* Live Match Stats Card */}
          <div className="p-4 rounded-3xl bg-[#0f141d] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <span>Match Statistics</span>
            </h4>

            <div className="space-y-2 text-xs font-mono">
              {[
                { label: 'Shots on Target', home: selectedMatch.stats.shotsOnTarget[0], away: selectedMatch.stats.shotsOnTarget[1] },
                { label: 'Total Shots', home: selectedMatch.stats.totalShots[0], away: selectedMatch.stats.totalShots[1] },
                { label: 'Corners', home: selectedMatch.stats.corners[0], away: selectedMatch.stats.corners[1] },
                { label: 'Dangerous Attacks', home: selectedMatch.stats.dangerousAttacks[0], away: selectedMatch.stats.dangerousAttacks[1] },
                { label: 'Yellow Cards', home: selectedMatch.stats.yellowCards[0], away: selectedMatch.stats.yellowCards[1] },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#141a26]">
                  <span className="font-bold text-white">{stat.home}</span>
                  <span className="text-gray-400 text-[11px] font-sans">{stat.label}</span>
                  <span className="font-bold text-white">{stat.away}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hubie AI Assistant Sharp Insight */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#121c2c] to-[#0f141f] border border-blue-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                🦥
              </div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                {hubieNote.title}
              </span>
              <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">
                {hubieNote.confidence} Edge
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {hubieNote.tip}
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Singles Markets Section (Singles Only Architecture) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00E701]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Singles Betting Markets
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/30">
              CLICK ODD TO BET SINGLE
            </span>
          </div>

          {/* Market Category Tabs */}
          <div className="flex items-center gap-1 bg-[#121722] p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
            {['all', 'main', 'goals', 'handicap'].map((tab) => (
              <button
                key={tab}
                onClick={() => { playSound('click'); setActiveMarketTab(tab); }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeMarketTab === tab ? 'bg-[#00E701] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Market 1: Match Winner 1X2 */}
          {(activeMarketTab === 'all' || activeMarketTab === 'main') && (
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Match Winner (1X2)</span>
                <span className="text-[10px] text-gray-400 font-mono">Single Market</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {selectedMatch.markets.matchWinner.map((opt) => {
                  const isInSlip = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSingleBet({
                          id: opt.id,
                          matchId: selectedMatch.id,
                          matchTitle: `${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`,
                          marketName: 'Match Winner',
                          selectionName: opt.label,
                          odd: opt.odd,
                          trend: opt.trend
                        })
                      }
                      className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                        isInSlip
                          ? 'bg-[#00E701] text-black font-black shadow-glow-green-sm'
                          : 'bg-[#141a26] hover:bg-[#1c2436] text-white border border-white/[0.06]'
                      }`}
                    >
                      <span className="text-xs font-medium truncate">{opt.label}</span>
                      <span className="text-sm font-bold font-mono">{formatOdds(opt.odd)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Market 2: Total Goals Over/Under */}
          {(activeMarketTab === 'all' || activeMarketTab === 'goals') && selectedMatch.markets.totalGoals && (
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Total Goals (Over/Under)</span>
                <span className="text-[10px] text-gray-400 font-mono">Single Market</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedMatch.markets.totalGoals.map((opt) => {
                  const isInSlip = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSingleBet({
                          id: opt.id,
                          matchId: selectedMatch.id,
                          matchTitle: `${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`,
                          marketName: 'Total Goals',
                          selectionName: opt.label,
                          odd: opt.odd,
                          trend: opt.trend
                        })
                      }
                      className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                        isInSlip
                          ? 'bg-[#00E701] text-black font-black shadow-glow-green-sm'
                          : 'bg-[#141a26] hover:bg-[#1c2436] text-white border border-white/[0.06]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-mono font-bold">{formatOdds(opt.odd)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Market 3: Asian Handicap */}
          {(activeMarketTab === 'all' || activeMarketTab === 'handicap') && selectedMatch.markets.handicap && (
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Asian Handicap</span>
                <span className="text-[10px] text-gray-400 font-mono">Single Market</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedMatch.markets.handicap.map((opt) => {
                  const isInSlip = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSingleBet({
                          id: opt.id,
                          matchId: selectedMatch.id,
                          matchTitle: `${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`,
                          marketName: 'Asian Handicap',
                          selectionName: opt.label,
                          odd: opt.odd,
                          trend: opt.trend
                        })
                      }
                      className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                        isInSlip
                          ? 'bg-[#00E701] text-black font-black shadow-glow-green-sm'
                          : 'bg-[#141a26] hover:bg-[#1c2436] text-white border border-white/[0.06]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-mono font-bold">{formatOdds(opt.odd)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Market 4: Both Teams to Score (BTTS) */}
          {(activeMarketTab === 'all' || activeMarketTab === 'goals') && selectedMatch.markets.btts && (
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Both Teams To Score</span>
                <span className="text-[10px] text-gray-400 font-mono">Single Market</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedMatch.markets.btts.map((opt) => {
                  const isInSlip = singlesInSlip.some((s) => s.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        toggleSingleBet({
                          id: opt.id,
                          matchId: selectedMatch.id,
                          matchTitle: `${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`,
                          marketName: 'BTTS',
                          selectionName: `BTTS ${opt.label}`,
                          odd: opt.odd,
                          trend: opt.trend
                        })
                      }
                      className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                        isInSlip
                          ? 'bg-[#00E701] text-black font-black shadow-glow-green-sm'
                          : 'bg-[#141a26] hover:bg-[#1c2436] text-white border border-white/[0.06]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-mono font-bold">{formatOdds(opt.odd)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
