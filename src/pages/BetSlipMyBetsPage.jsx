import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp,
  Menu,
  CheckCircle, 
  XCircle, 
  Zap, 
  ArrowRight,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const BetSlipMyBetsPage = () => {
  const {
    setCurrentPage,
    myBets,
    cashOut,
    usdtBalance,
    playClick,
    isMobile
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState('open'); // 'open' | 'settled'
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [isSportDropdownOpen, setIsSportDropdownOpen] = useState(false);
  const [expandedBetId, setExpandedBetId] = useState('bet-op-1'); // Default open bet expanded to showcase Cash Out

  const displayedBets = activeTab === 'open' ? myBets.open : myBets.settled;

  // Filter by sport if selected
  const filteredBets = displayedBets.filter((bet) => {
    if (selectedSport === 'all') return true;
    return bet.sport === selectedSport;
  });

  const sportsOptions = [
    { id: 'all', label: 'All sports' },
    { id: 'soccer', label: 'Soccer' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'esports', label: 'Esports' }
  ];

  const currentSportLabel = sportsOptions.find(s => s.id === selectedSport)?.label || 'All sports';

  const toggleExpand = (betId) => {
    playClick();
    setExpandedBetId(prev => prev === betId ? null : betId);
  };

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 select-none max-w-[1400px]">
      {/* 1. Top Header Row (Matching Screenshot: <  My bets  1 open · 7 settled) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Back button */}
          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="w-9 h-9 rounded-xl bg-[#1a2c38] hover:bg-[#213743] border border-[#213743] flex items-center justify-center text-[#b1bad3] hover:text-white transition-colors"
            title="Back to Sports Home"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* My bets button/pill */}
          <div className="px-4 py-2 rounded-xl bg-[#1a2c38] border border-[#213743] text-white font-bold text-xs">
            My bets
          </div>

          {/* Counts */}
          <span className="text-xs text-[#557086] font-medium ml-1">
            {myBets.open.length} open · {myBets.settled.length} settled
          </span>
        </div>

        {/* USDT Balance display on far right */}
        <div className="hidden sm:flex items-center gap-2 bg-[#1a2c38] border border-[#213743] px-3.5 py-1.5 rounded-xl">
          <span className="text-[10px] text-[#557086] font-semibold uppercase">USDT Vault:</span>
          <span className="text-xs font-bold font-mono text-[#00A3FF]">${usdtBalance.toFixed(2)} ₮</span>
        </div>
      </div>

      {/* 2. Tabs Row: [ Open (1) ]  [ Settled (7) ] */}
      <div>
        <div className="bg-[#1a2c38] border border-[#213743] rounded-xl p-1 inline-flex items-center gap-1 shadow-sm">
          <button
            onClick={() => { playClick(); setActiveTab('open'); }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'open'
                ? 'bg-[#213743] text-white shadow-sm'
                : 'text-[#b1bad3] hover:text-white'
            }`}
          >
            Open ({myBets.open.length})
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('settled'); }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'settled'
                ? 'bg-[#213743] text-white shadow-sm'
                : 'text-[#b1bad3] hover:text-white'
            }`}
          >
            Settled ({myBets.settled.length})
          </button>
        </div>
      </div>

      {/* 3. Filters Row: Date Pills on Left + Sport Dropdown on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Date Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'all', label: 'All time' },
            { id: 'today', label: 'Today' },
            { id: '7d', label: 'Last 7 days' },
            { id: '30d', label: 'Last 30 days' },
            { id: 'custom', label: 'Custom' }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => { playClick(); setDateFilter(d.id); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === d.id
                  ? 'bg-[#1a2c38] border border-[#213743] text-white font-bold'
                  : 'text-[#b1bad3] hover:text-white hover:bg-[#1a2c38]/40'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* All sports Dropdown */}
        <div className="relative">
          <button
            onClick={() => { playClick(); setIsSportDropdownOpen(!isSportDropdownOpen); }}
            className="flex items-center gap-2 bg-[#1a2c38] hover:bg-[#213743] border border-[#213743] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white transition-colors"
          >
            <Menu className="w-3.5 h-3.5 text-[#b1bad3]" />
            <span>{currentSportLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#557086]" />
          </button>

          {isSportDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#1a2c38] border border-[#213743] shadow-2xl py-1.5 z-40 animate-fade-in">
              {sportsOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    playClick();
                    setSelectedSport(opt.id);
                    setIsSportDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-1.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-[#213743] transition-colors ${
                    selectedSport === opt.id ? 'text-[#00A3FF] font-bold bg-[#0f212e]' : 'text-[#b1bad3] hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedSport === opt.id && <span className="text-[#00A3FF]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Table / Content Container (Matching Screenshot Elevated Box) */}
      <div className="rounded-2xl bg-[#1a2c38] border border-[#213743] overflow-hidden shadow-xl">
        {filteredBets.length === 0 ? (
          <div className="text-center py-16 text-[#557086] text-xs font-medium space-y-2">
            <div>No {activeTab} bets found for this filter.</div>
            <button
              onClick={() => { playClick(); setCurrentPage('home'); }}
              className="px-4 py-2 rounded-xl bg-[#00A3FF] hover:bg-[#0092e6] text-white font-bold text-xs"
            >
              Explore Matches & Place Bet
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#1a2c38] text-[#557086] font-semibold text-xs border-b border-[#213743]">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Placed</th>
                    <th className="py-3.5 px-6 font-semibold">Bet</th>
                    <th className="py-3.5 px-6 font-semibold text-center">Odds</th>
                    <th className="py-3.5 px-6 font-semibold text-center">Stake</th>
                    <th className="py-3.5 px-6 font-semibold text-center">Returns</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#213743]/60">
                  {filteredBets.map((bet) => {
                    const isExpanded = expandedBetId === bet.id;

                    return (
                      <React.Fragment key={bet.id}>
                        <tr 
                          onClick={() => toggleExpand(bet.id)}
                          className={`hover:bg-[#213743]/50 transition-colors cursor-pointer ${
                            isExpanded ? 'bg-[#213743]/30' : ''
                          }`}
                        >
                          {/* Placed Column */}
                          <td className="py-4 px-6 font-mono text-xs whitespace-nowrap align-top">
                            <div className="text-[#b1bad3] font-medium">{bet.date || bet.placedDate.split(' ')[0]}</div>
                            <div className="text-[#557086] text-[11px]">{bet.time || bet.placedDate.split(' ')[1]}</div>
                          </td>

                          {/* Bet Column */}
                          <td className="py-4 px-6 align-top">
                            <div className="font-bold text-white text-sm leading-snug">
                              {bet.team}
                            </div>
                            <div className="text-xs text-[#b1bad3] flex items-center gap-1.5 flex-wrap pt-0.5">
                              <span>{bet.match}</span>
                              {bet.isLive ? (
                                <>
                                  <span className="text-[#ff3366] font-bold">●</span>
                                  <span className="font-mono text-xs text-red-400 font-bold">{bet.minute || "52'"}</span>
                                  <span className="px-1.5 py-0.2 rounded bg-[#0f212e] text-[#00A3FF] font-mono font-bold text-[10px] border border-[#213743]">
                                    {bet.score || '1-0'}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-[#557086]">•</span>
                                  <span className="text-[#557086] font-mono">{bet.minute || 'FT'}</span>
                                  <span className="px-1.5 py-0.2 rounded bg-[#0f212e] text-[#b1bad3] font-mono font-semibold text-[10px] border border-[#213743]">
                                    {bet.score || '2-1'}
                                  </span>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Odds Column */}
                          <td className="py-4 px-6 text-center font-mono font-bold text-[#00A3FF] text-sm align-top">
                            {bet.odds.toFixed(2)}
                          </td>

                          {/* Stake Column */}
                          <td className="py-4 px-6 text-center font-mono text-white text-xs align-top">
                            ${bet.stake.toFixed(2)}
                          </td>

                          {/* Returns Column */}
                          <td className="py-4 px-6 text-center font-mono font-bold text-white text-xs align-top">
                            ${bet.returns.toFixed(2)}
                          </td>

                          {/* Result Column with Chevron */}
                          <td className="py-4 px-6 text-right align-top whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              {bet.result === 'Open' ? (
                                <span className="font-bold text-white text-xs">Open</span>
                              ) : (
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                                  bet.result === 'Won'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : bet.result.includes('Cashed')
                                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}>
                                  {bet.result}
                                </span>
                              )}
                              <ChevronDown className={`w-3.5 h-3.5 text-[#557086] transition-transform ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Row with Cash Out Action & Detailed Info */}
                        {isExpanded && (
                          <tr className="bg-[#14232d]/90 border-b border-[#213743]">
                            <td colSpan={6} className="px-6 py-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1 text-xs">
                                  <div className="text-[#b1bad3]">
                                    <span className="text-[#557086]">Bet ID:</span> <span className="font-mono text-white font-bold">{bet.id}</span>
                                    <span className="mx-2 text-[#557086]">·</span>
                                    <span className="text-[#557086]">Market:</span> <span className="text-white font-semibold">{bet.market || '1x2 (Full Time)'}</span>
                                    <span className="mx-2 text-[#557086]">·</span>
                                    <span className="text-[#557086]">Type:</span> <span className="text-white font-semibold">Single</span>
                                  </div>
                                  <div className="text-[11px] text-[#557086]">
                                    Placed at {bet.placedDate} via Housebets Web Sportsbook • Settles instantly on match completion
                                  </div>
                                </div>

                                {/* Cash Out action if Open */}
                                {bet.result === 'Open' ? (
                                  <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="text-right">
                                      <div className="text-[10px] text-[#557086] uppercase font-bold">Cash Out Value</div>
                                      <div className="font-mono text-sm font-bold text-amber-400">${(bet.cashoutAmount || bet.stake * 1.42).toFixed(2)} ₮</div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        cashOut(bet.id);
                                      }}
                                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
                                    >
                                      <Zap className="w-3.5 h-3.5 fill-current" />
                                      <span>Cash Out (${(bet.cashoutAmount || bet.stake * 1.42).toFixed(2)})</span>
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-xs font-semibold text-[#557086] flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Settled & Credited to Player Vault</span>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (390px Viewport) */}
            <div className="md:hidden divide-y divide-[#213743]/70">
              {filteredBets.map((bet) => {
                const isExpanded = expandedBetId === bet.id;

                return (
                  <div key={bet.id} className="p-3.5 space-y-2.5">
                    {/* Card Top: Placed Date + Status */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#557086] font-mono text-[11px]">{bet.placedDate}</span>
                      {bet.result === 'Open' ? (
                        <span className="px-2 py-0.5 rounded bg-[#00A3FF]/20 text-[#00A3FF] font-bold text-[10px] border border-[#00A3FF]/30">
                          Open Bet
                        </span>
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          bet.result === 'Won'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : bet.result.includes('Cashed')
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {bet.result}
                        </span>
                      )}
                    </div>

                    {/* Team Selection */}
                    <div>
                      <div className="text-sm font-bold text-white">{bet.team}</div>
                      <div className="text-xs text-[#b1bad3] flex items-center gap-1 flex-wrap pt-0.5">
                        <span>{bet.match}</span>
                        {bet.isLive && (
                          <>
                            <span className="text-[#ff3366] font-bold">●</span>
                            <span className="text-red-400 font-mono font-bold text-xs">{bet.minute || "52'"}</span>
                            <span className="px-1.5 py-0.2 rounded bg-[#0f212e] text-[#00A3FF] font-mono font-bold text-[10px] border border-[#213743]">
                              {bet.score || '1-0'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Metrics Row: Odds, Stake, Returns */}
                    <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-[#0f212e] border border-[#213743] text-center">
                      <div>
                        <div className="text-[10px] text-[#557086] font-semibold">Odds</div>
                        <div className="font-mono text-xs font-bold text-[#00A3FF]">{bet.odds.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#557086] font-semibold">Stake</div>
                        <div className="font-mono text-xs font-bold text-white">${bet.stake.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#557086] font-semibold">Returns</div>
                        <div className="font-mono text-xs font-bold text-white">${bet.returns.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Cash out button for Open bet on mobile */}
                    {bet.result === 'Open' && (
                      <button
                        onClick={() => cashOut(bet.id)}
                        className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Cash Out ${(bet.cashoutAmount || bet.stake * 1.42).toFixed(2)} ₮</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
