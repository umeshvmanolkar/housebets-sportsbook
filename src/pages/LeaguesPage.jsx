import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Filter, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Shield, 
  Sliders 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { LEAGUE_STANDINGS, UPCOMING_FIXTURES } from '../data/mockData';

export const LeaguesPage = () => {
  const {
    selectedLeague,
    setSelectedLeague,
    formatOdds,
    singlesInSlip,
    toggleSingleBet,
    setSelectedMatchId,
    setCurrentPage,
    playSound
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState('fixtures'); // 'fixtures' | 'table'

  const LEAGUES_LIST = [
    { id: 'Premier League', name: 'English Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', season: '2026/27' },
    { id: 'UEFA Champions League', name: 'UEFA Champions League', flag: '🇪🇺', season: 'League Stage' },
    { id: 'NBA', name: 'NBA Basketball', flag: '🇺🇸', season: 'Regular Season' },
    { id: 'La Liga', name: 'Spanish La Liga', flag: '🇪🇸', season: '2026/27' },
    { id: 'Blast Premier CS2', name: 'Blast Premier CS2', flag: '🎮', season: 'Fall Final' }
  ];

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6">
      {/* League Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#111927] to-[#0c121e] border border-white/[0.08] p-5 sm:p-7 shadow-glow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#141a26] border border-white/10 flex items-center justify-center text-3xl shadow-md">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00E701] font-bold">SPORTS COMPETITION</span>
              <span className="text-xs text-gray-500">• Official Verified Odds</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white">{selectedLeague}</h1>
            <p className="text-xs text-gray-400">Matchday 28 • Single Bets with 0% House Vig</p>
          </div>
        </div>

        {/* League Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {LEAGUES_LIST.map((lg) => (
            <button
              key={lg.id}
              onClick={() => { playSound('click'); setSelectedLeague(lg.id); }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLeague === lg.id
                  ? 'bg-[#00E701] text-black font-bold shadow-glow-green-sm'
                  : 'bg-[#141a26] text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              <span>{lg.flag}</span>
              <span>{lg.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub Tabs: Fixtures vs Table */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2 bg-[#121722] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => { playSound('click'); setActiveTab('fixtures'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'fixtures' ? 'bg-[#00E701] text-black shadow-glow-green-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Matchday Fixtures
          </button>
          <button
            onClick={() => { playSound('click'); setActiveTab('table'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'table' ? 'bg-[#00E701] text-black shadow-glow-green-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Standings & Form Table
          </button>
        </div>

        <span className="text-xs text-gray-400 font-mono hidden sm:inline">
          Singles Only Format
        </span>
      </div>

      {activeTab === 'fixtures' ? (
        /* Fixtures List with Single Odds */
        <div className="space-y-3">
          {UPCOMING_FIXTURES.map((fixture) => (
            <div
              key={fixture.id}
              className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Fixture Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="text-xs font-mono text-gray-400 min-w-24">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#00E701]" />
                  {fixture.date}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <span>{fixture.homeTeam.logo}</span>
                    <span>{fixture.homeTeam.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <span>{fixture.awayTeam.logo}</span>
                    <span>{fixture.awayTeam.name}</span>
                  </div>
                </div>
              </div>

              {/* Single Bet Odds Buttons (1 X 2) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    toggleSingleBet({
                      id: `league-${fixture.id}-1`,
                      matchId: fixture.id,
                      matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                      marketName: 'Match Winner',
                      selectionName: fixture.homeTeam.name,
                      odd: fixture.odds.home,
                      trend: 'none'
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-[#141a26] hover:bg-[#1f283a] text-xs font-mono text-center border border-white/5 transition-all text-white"
                >
                  <span className="text-[10px] text-gray-400 block font-sans">1 (Home)</span>
                  <strong className="text-sm">{formatOdds(fixture.odds.home)}</strong>
                </button>

                {fixture.odds.draw && (
                  <button
                    onClick={() =>
                      toggleSingleBet({
                        id: `league-${fixture.id}-x`,
                        matchId: fixture.id,
                        matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                        marketName: 'Match Winner',
                        selectionName: 'Draw',
                        odd: fixture.odds.draw,
                        trend: 'none'
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-[#141a26] hover:bg-[#1f283a] text-xs font-mono text-center border border-white/5 transition-all text-white"
                  >
                    <span className="text-[10px] text-gray-400 block font-sans">X (Draw)</span>
                    <strong className="text-sm">{formatOdds(fixture.odds.draw)}</strong>
                  </button>
                )}

                <button
                  onClick={() =>
                    toggleSingleBet({
                      id: `league-${fixture.id}-2`,
                      matchId: fixture.id,
                      matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                      marketName: 'Match Winner',
                      selectionName: fixture.awayTeam.name,
                      odd: fixture.odds.away,
                      trend: 'none'
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-[#141a26] hover:bg-[#1f283a] text-xs font-mono text-center border border-white/5 transition-all text-white"
                >
                  <span className="text-[10px] text-gray-400 block font-sans">2 (Away)</span>
                  <strong className="text-sm">{formatOdds(fixture.odds.away)}</strong>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedMatchId('match-1');
                    setCurrentPage('match-detail');
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00E701]/10 text-gray-400 hover:text-[#00E701] border border-white/5 transition-colors"
                  title="Open Match Tracker"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standings Table */
        <div className="rounded-3xl bg-[#0f141d] border border-white/[0.08] overflow-hidden shadow-glow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#121722] text-gray-400 uppercase font-mono text-[10px] border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">P</th>
                  <th className="py-3 px-4 text-center">W</th>
                  <th className="py-3 px-4 text-center">D</th>
                  <th className="py-3 px-4 text-center">L</th>
                  <th className="py-3 px-4 text-center">GD</th>
                  <th className="py-3 px-4 text-center font-bold text-white">Pts</th>
                  <th className="py-3 px-4 text-center">Last 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {LEAGUE_STANDINGS.map((row) => (
                  <tr key={row.pos} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-400">{row.pos}</td>
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00E701]" />
                      <span>{row.team}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-gray-300">{row.p}</td>
                    <td className="py-3 px-4 text-center font-mono text-gray-300">{row.w}</td>
                    <td className="py-3 px-4 text-center font-mono text-gray-300">{row.d}</td>
                    <td className="py-3 px-4 text-center font-mono text-gray-300">{row.l}</td>
                    <td className="py-3 px-4 text-center font-mono text-[#00E701] font-semibold">{row.gd}</td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-white text-sm bg-white/[0.02]">
                      {row.pts}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {row.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded-md text-[9px] font-black flex items-center justify-center ${
                              res === 'W'
                                ? 'bg-emerald-500/20 text-[#00E701] border border-[#00E701]/30'
                                : res === 'D'
                                ? 'bg-gray-500/20 text-gray-300'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
