import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Lock, 
  Clock, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Betslip = () => {
  const {
    isBetslipPanelOpen,
    setIsBetslipPanelOpen,
    activePanelTab,
    setActivePanelTab,
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

  if (!isBetslipPanelOpen) return null;

  const currentBet = singlesInSlip[0];
  const totalStake = currentBet ? currentBet.stake : 0;
  const currentReturn = currentBet ? (currentBet.stake * currentBet.odd).toFixed(2) : '0.00';

  return (
    <aside className="w-80 flex-shrink-0 bg-[#0e1c28] border-l border-white/[0.08] flex flex-col h-full select-none z-30 shadow-2xl">
      {/* Header Tabs: Bet slip 1 | My bets 1 | Chat | ✕ */}
      <div className="p-3 border-b border-white/[0.08] bg-[#0b1620]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {/* Bet slip tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('betslip'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'betslip'
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Bet slip</span>
              {singlesInSlip.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  activePanelTab === 'betslip' ? 'bg-white text-[#00A3FF]' : 'bg-[#00A3FF] text-white'
                }`}>
                  {singlesInSlip.length}
                </span>
              )}
            </button>

            {/* My bets tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('mybets'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'mybets'
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>My bets</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activePanelTab === 'mybets' ? 'bg-white text-[#00A3FF]' : 'bg-white/10 text-gray-300'
              }`}>
                {myBets.open.length}
              </span>
            </button>

            {/* Chat tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('chat'); }}
              className={`px-2 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePanelTab === 'chat' ? 'bg-[#00A3FF] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close Panel Button */}
          <button
            onClick={() => { playClick(); setIsBetslipPanelOpen(false); }}
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {activePanelTab === 'betslip' && (
          <>
            {/* Subheader: Singles · 1 selection | Clear all */}
            <div className="flex items-center justify-between text-xs text-gray-400 px-1">
              <span className="font-semibold text-gray-300">
                Singles · {singlesInSlip.length} selection
              </span>
              {singlesInSlip.length > 0 && (
                <button
                  onClick={clearSlip}
                  className="hover:text-red-400 transition-colors text-[11px]"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Odds Changed Alert Bar (Contest Rule: "Odds changed: player must accept") */}
            {oddsChangedNotice && (
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 space-y-2 animate-pulse">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Odds changed from {oddsChangedNotice.oldOdd.toFixed(2)} to {oddsChangedNotice.newOdd.toFixed(2)}</span>
                </div>
                <button
                  onClick={acceptChangedOdds}
                  className="w-full py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md transition-colors"
                >
                  Accept New Odds ({oddsChangedNotice.newOdd.toFixed(2)})
                </button>
              </div>
            )}

            {/* Bet Placement Feedback Toast (Contest Rule: "Bet placed, bet failed") */}
            {betFeedback && (
              <div className={`p-3 rounded-2xl border text-xs space-y-1 ${
                betFeedback.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/40 text-red-300'
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {betFeedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{betFeedback.type === 'success' ? 'Bet Placed!' : 'Bet Placement Failed'}</span>
                </div>
                <p className="text-[11px] opacity-90">{betFeedback.message}</p>
              </div>
            )}

            {/* Single Selection Card */}
            {singlesInSlip.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-2 text-gray-400">
                <div className="w-12 h-12 rounded-2xl bg-[#112232] border border-white/5 flex items-center justify-center mx-auto text-xl">
                  🎯
                </div>
                <div className="text-xs font-bold text-gray-300">Your bet slip is empty</div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Select match result odds from any match to start betting singles.
                </p>
              </div>
            ) : (
              singlesInSlip.map((bet) => (
                <div
                  key={bet.id}
                  className="p-3.5 rounded-2xl bg-[#112232] border border-white/[0.08] space-y-2.5 shadow-sm relative"
                >
                  {/* Top: Team Name + Odd + Delete */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-extrabold text-white leading-tight">
                        {bet.teamName}
                      </div>
                      <div className="text-[11px] text-gray-400 leading-tight mt-0.5">
                        {bet.marketName} · {bet.matchTitle} · <span className="text-red-400 font-mono">{bet.scoreMinute}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#00A3FF]">
                        {bet.odd.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeSelection(bet.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Suspended Badge if suspended */}
                  {bet.isSuspended && (
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Selection Suspended</span>
                    </div>
                  )}

                  {/* Stake input box from screenshot */}
                  <div className="pt-1">
                    <div className="relative flex items-center bg-[#071017] rounded-xl border border-white/10 px-3 py-2">
                      <span className="text-xs text-gray-500 font-bold mr-1">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={bet.stake}
                        onChange={(e) => updateStake(bet.id, e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                      <div className="text-right whitespace-nowrap text-xs font-mono text-gray-400">
                        Returns <span className="text-white font-bold">${currentReturn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Testing Tools for Contest Judges */}
            <div className="p-3 rounded-2xl bg-[#071017]/60 border border-white/5 space-y-2 text-[11px] text-gray-400">
              <span className="font-bold text-gray-300 block uppercase text-[10px] tracking-wider">
                🧪 Contest Judge Simulation Controls
              </span>
              <button
                onClick={triggerSimulateOddsChange}
                disabled={singlesInSlip.length === 0}
                className="w-full py-1.5 rounded-lg bg-[#142636] hover:bg-[#1a3248] text-gray-200 text-center font-medium transition-colors disabled:opacity-40"
              >
                ⚡ Simulate Odds Changed (1.30 ➔ 1.35)
              </button>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateFailNextBet}
                  onChange={(e) => setSimulateFailNextBet(e.target.checked)}
                  className="rounded border-white/20 text-[#00A3FF]"
                />
                <span>Simulate "Bet failed" on submit</span>
              </label>
            </div>
          </>
        )}

        {/* My Bets Tab: Open & Settled (Contest Rule: "My bets: open, settled, cash out") */}
        {activePanelTab === 'mybets' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-bold text-white uppercase text-[11px]">Open Bets ({myBets.open.length})</span>
              <span className="text-emerald-400 font-mono text-[10px]">USDT Vault Active</span>
            </div>

            {myBets.open.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No open bets</p>
            ) : (
              myBets.open.map((bet) => (
                <div
                  key={bet.id}
                  className="p-3.5 rounded-2xl bg-[#112232] border border-white/10 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white truncate">{bet.match}</span>
                    <span className="text-[#00A3FF] font-mono font-bold">{bet.odds.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Stake: ${bet.stake.toFixed(2)} ₮</span>
                    <span className="text-white font-bold">Returns: ${bet.returns.toFixed(2)} ₮</span>
                  </div>

                  {/* Cash Out Button from Contest Rules */}
                  <button
                    onClick={() => cashOut(bet.id)}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-between px-3 shadow-md transition-all"
                  >
                    <span>Cash Out</span>
                    <span className="font-mono">${bet.cashoutAmount.toFixed(2)} ₮</span>
                  </button>
                </div>
              ))
            )}

            <div className="pt-2 border-t border-white/10">
              <span className="font-bold text-white uppercase text-[11px] block mb-2">
                Recently Settled ({myBets.settled.length})
              </span>
              <div className="space-y-2">
                {myBets.settled.slice(0, 3).map((st) => (
                  <div key={st.id} className="p-2.5 rounded-xl bg-[#0b1620] border border-white/5 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-200">{st.team}</div>
                      <div className="text-[10px] text-gray-400">{st.match}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      st.result === 'Won' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-300'
                    }`}>
                      {st.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activePanelTab === 'chat' && (
          <div className="text-center py-12 text-gray-400 space-y-2 text-xs">
            <MessageSquare className="w-8 h-8 mx-auto text-[#00A3FF]" />
            <div className="font-bold text-white">Housebets Player Chat</div>
            <p className="text-[11px]">Chat with other sports bettors in real-time.</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary from Screenshot */}
      {activePanelTab === 'betslip' && (
        <div className="p-3.5 bg-[#0b1620] border-t border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Total stake</span>
            <span className="text-white font-bold">${totalStake.toFixed(2)} ₮</span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Payout</span>
            <span className="text-[#00A3FF] font-black text-sm">${currentReturn} ₮</span>
          </div>

          {/* Place Bet Action Button */}
          <button
            onClick={placeSingleBet}
            disabled={singlesInSlip.length === 0 || totalStake <= 0 || (currentBet && currentBet.isSuspended)}
            className="w-full py-3 rounded-xl bg-[#00A3FF] hover:bg-[#0092e5] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none text-white font-black text-xs shadow-md transition-all uppercase tracking-wider"
          >
            Place bet
          </button>
        </div>
      )}
    </aside>
  );
};
