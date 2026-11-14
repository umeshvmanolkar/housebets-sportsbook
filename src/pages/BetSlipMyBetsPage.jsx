import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Lock, 
  Clock, 
  ChevronDown, 
  SlidersHorizontal 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const BetSlipMyBetsPage = () => {
  const {
    setCurrentPage,
    singlesInSlip,
    removeSelection,
    clearSlip,
    updateStake,
    oddsChangedNotice,
    acceptChangedOdds,
    triggerSimulateOddsChange,
    betFeedback,
    simulateFailNextBet,
    setSimulateFailNextBet,
    placeSingleBet,
    myBets,
    cashOut,
    usdtBalance,
    playClick
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState('open'); // 'open' | 'settled' | 'slip'
  const [dateFilter, setDateFilter] = useState('all');

  const currentBet = singlesInSlip[0];
  const totalStake = currentBet ? currentBet.stake : 0;
  const currentReturn = currentBet ? (currentBet.stake * currentBet.odd).toFixed(2) : '0.00';

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6">
      {/* Top Bar matching Screenshot 6: `< My bets  1 open · 7 settled` */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); setCurrentPage('home'); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e1c28] hover:bg-[#142636] border border-white/[0.08] text-xs font-bold text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>My bets</span>
          </button>
          <span className="text-xs text-gray-400 font-medium">
            {myBets.open.length} open · {myBets.settled.length} settled
          </span>
        </div>

        {/* USDT Wallet display */}
        <div className="text-right font-mono text-xs">
          <span className="text-gray-400 text-[10px] block">USDT Balance</span>
          <span className="text-[#00A3FF] font-bold">${usdtBalance.toFixed(2)} ₮</span>
        </div>
      </div>

      {/* Tabs: Open (1) | Settled (7) | Bet Slip (1) */}
      <div className="flex items-center gap-2 bg-[#0e1c28] p-1 rounded-2xl border border-white/5">
        <button
          onClick={() => { playClick(); setActiveTab('open'); }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'open'
              ? 'bg-[#00A3FF] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Open ({myBets.open.length})
        </button>

        <button
          onClick={() => { playClick(); setActiveTab('settled'); }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settled'
              ? 'bg-[#00A3FF] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Settled ({myBets.settled.length})
        </button>

        <button
          onClick={() => { playClick(); setActiveTab('slip'); }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ml-auto flex items-center gap-1.5 ${
            activeTab === 'slip'
              ? 'bg-[#00A3FF] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Bet slip</span>
          {singlesInSlip.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-[#00A3FF] text-[10px] font-bold flex items-center justify-center">
              {singlesInSlip.length}
            </span>
          )}
        </button>
      </div>

      {/* Date Filter Pills & Sports Filter matching Screenshot 6 */}
      {activeTab !== 'slip' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  dateFilter === d.id
                    ? 'bg-[#142636] text-white font-bold border border-[#00A3FF]/40'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 text-xs text-gray-300 bg-[#0e1c28] px-3 py-1.5 rounded-xl border border-white/5">
            <span>All sports</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      )}

      {/* Tab 1: Open Bets (Contest Requirement: "My bets: open, settled, cash out") */}
      {activeTab === 'open' && (
        <div className="rounded-3xl bg-[#0e1c28] border border-white/[0.08] overflow-hidden shadow-lg">
          {myBets.open.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">No open bets currently</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0b1620] text-gray-400 font-mono text-[11px] border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4">Placed</th>
                    <th className="py-3 px-4">Bet</th>
                    <th className="py-3 px-4 text-center">Odds</th>
                    <th className="py-3 px-4 text-center">Stake</th>
                    <th className="py-3 px-4 text-center">Returns</th>
                    <th className="py-3 px-4 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {myBets.open.map((bet) => (
                    <tr key={bet.id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-4 font-mono text-gray-400 text-[11px] whitespace-nowrap">
                        {bet.placedDate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm">{bet.team}</div>
                        <div className="text-[11px] text-gray-400">
                          {bet.match} · <span className="text-red-400 font-mono">● {bet.statusNote}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-bold text-[#00A3FF]">
                        {bet.odds.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center font-mono text-white">
                        ${bet.stake.toFixed(2)} ₮
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-bold text-white">
                        ${bet.returns.toFixed(2)} ₮
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => cashOut(bet.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-all"
                        >
                          Cash Out (${bet.cashoutAmount.toFixed(2)})
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Settled Bets */}
      {activeTab === 'settled' && (
        <div className="rounded-3xl bg-[#0e1c28] border border-white/[0.08] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0b1620] text-gray-400 font-mono text-[11px] border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Placed</th>
                  <th className="py-3 px-4">Bet</th>
                  <th className="py-3 px-4 text-center">Odds</th>
                  <th className="py-3 px-4 text-center">Stake</th>
                  <th className="py-3 px-4 text-center">Returns</th>
                  <th className="py-3 px-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {myBets.settled.map((bet) => (
                  <tr key={bet.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px] whitespace-nowrap">
                      {bet.placedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{bet.team}</div>
                      <div className="text-[11px] text-gray-400">{bet.match} · {bet.statusNote}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-300">
                      {bet.odds.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-300">
                      ${bet.stake.toFixed(2)} ₮
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                      ${bet.returns.toFixed(2)} ₮
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        bet.result === 'Won'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : bet.result.includes('Cashed')
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {bet.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Dedicated Bet Slip View */}
      {activeTab === 'slip' && (
        <div className="rounded-3xl bg-[#0e1c28] border border-white/[0.08] p-5 space-y-4 max-w-xl mx-auto shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Singles Slip (1 Selection)</h3>
            {singlesInSlip.length > 0 && (
              <button onClick={clearSlip} className="text-gray-400 hover:text-red-400 text-xs">
                Clear all
              </button>
            )}
          </div>

          {/* Odds Changed Alert */}
          {oddsChangedNotice && (
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Odds changed from {oddsChangedNotice.oldOdd.toFixed(2)} to {oddsChangedNotice.newOdd.toFixed(2)}</span>
              </div>
              <button
                onClick={acceptChangedOdds}
                className="w-full py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs"
              >
                Accept New Odds
              </button>
            </div>
          )}

          {currentBet ? (
            <div className="p-4 rounded-2xl bg-[#112232] border border-white/10 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-extrabold text-white">{currentBet.teamName}</div>
                  <div className="text-xs text-gray-400">{currentBet.marketName} · {currentBet.matchTitle}</div>
                </div>
                <span className="font-mono text-sm font-bold text-[#00A3FF]">{currentBet.odd.toFixed(2)}</span>
              </div>

              <div className="flex items-center bg-[#071017] rounded-xl border border-white/10 px-3 py-2.5">
                <span className="text-xs text-gray-500 font-bold mr-1">$</span>
                <input
                  type="number"
                  value={currentBet.stake}
                  onChange={(e) => updateStake(currentBet.id, e.target.value)}
                  className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                />
                <div className="text-right text-xs font-mono text-gray-400 whitespace-nowrap">
                  Returns <span className="text-white font-bold">${currentReturn} ₮</span>
                </div>
              </div>

              <button
                onClick={placeSingleBet}
                className="w-full py-3 rounded-xl bg-[#00A3FF] text-white font-black text-xs uppercase tracking-wider shadow-md"
              >
                Place bet (${currentBet.stake} ₮)
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-6">Your bet slip is empty</p>
          )}

          {/* Test Controls */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={triggerSimulateOddsChange}
              disabled={!currentBet}
              className="w-full py-1.5 rounded-lg bg-[#142636] text-gray-300 text-xs font-medium"
            >
              ⚡ Test: Trigger "Odds changed: player must accept"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
