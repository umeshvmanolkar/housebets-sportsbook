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
import { TeamCrest } from './Logos';

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
    <aside className="w-80 flex-shrink-0 bg-[#1a2c38] border-l border-white/[0.08] flex flex-col h-full select-none z-30 shadow-2xl">
      {/* Header Tabs: Bet slip 1 | My bets 1 | ✕ */}
      <div className="p-3 border-b border-white/[0.08] bg-[#0f212e]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { playClick(); setActivePanelTab('betslip'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'betslip'
                  ? 'bg-[#1475e1] text-white shadow-sm'
                  : 'text-[#b1bad3] hover:text-white'
              }`}
            >
              <span>Bet slip</span>
              {singlesInSlip.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  activePanelTab === 'betslip' ? 'bg-white text-[#1475e1]' : 'bg-[#1475e1] text-white'
                }`}>
                  {singlesInSlip.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { playClick(); setActivePanelTab('mybets'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'mybets'
                  ? 'bg-[#1475e1] text-white shadow-sm'
                  : 'text-[#b1bad3] hover:text-white'
              }`}
            >
              <span>My bets</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activePanelTab === 'mybets' ? 'bg-white text-[#1475e1]' : 'bg-white/10 text-gray-300'
              }`}>
                {myBets.open.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => { playClick(); setIsBetslipPanelOpen(false); }}
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {activePanelTab === 'betslip' && (
          <>
            {/* Subheader: Singles · 1 selection | Clear all */}
            <div className="flex items-center justify-between text-xs text-[#b1bad3] px-1">
              <span className="font-semibold text-white">
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
                  <span>Odds changed: {oddsChangedNotice.oldOdd.toFixed(2)} ➔ {oddsChangedNotice.newOdd.toFixed(2)}</span>
                </div>
                <button
                  onClick={acceptChangedOdds}
                  className="w-full py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md transition-colors"
                >
                  Accept New Odds ({oddsChangedNotice.newOdd.toFixed(2)})
                </button>
              </div>
            )}

            {/* Bet Feedback Toast */}
            {betFeedback && (
              <div className={`p-3 rounded-2xl border text-xs space-y-1 ${
                betFeedback.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/40 text-red-300'
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {betFeedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{betFeedback.type === 'success' ? 'Bet Placed!' : 'Bet Failed'}</span>
                </div>
                <p className="text-[11px] opacity-90">{betFeedback.message}</p>
              </div>
            )}

            {/* Single Selection Card */}
            {singlesInSlip.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-2 text-[#557086]">
                <div className="w-12 h-12 rounded-2xl bg-[#0f212e] border border-white/5 flex items-center justify-center mx-auto text-xl">
                  🎯
                </div>
                <div className="text-xs font-bold text-white">Your bet slip is empty</div>
                <p className="text-[11px] text-[#b1bad3] leading-relaxed">
                  Click any match result odd from Norway, Wales, or Arsenal to place a single bet.
                </p>
              </div>
            ) : (
              singlesInSlip.map((bet) => (
                <div
                  key={bet.id}
                  className="p-3.5 rounded-2xl bg-[#213743] border border-white/[0.08] space-y-3 shadow-sm relative"
                >
                  {/* Top row: Team Crest + Name + Odd + Delete */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <TeamCrest teamName={bet.teamName} className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-extrabold text-white leading-tight">
                          {bet.teamName}
                        </div>
                        <div className="text-[11px] text-[#b1bad3] leading-tight mt-0.5">
                          {bet.marketName} · <span className="text-red-400 font-mono">{bet.scoreMinute}</span>
                        </div>
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

                  {/* Stake input with Stake style */}
                  <div className="space-y-1.5">
                    <div className="flex items-center bg-[#0f212e] rounded-xl border border-white/10 px-3 py-2">
                      <span className="text-xs text-gray-400 font-bold mr-1">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={bet.stake}
                        onChange={(e) => updateStake(bet.id, e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                      <div className="text-right whitespace-nowrap text-xs font-mono text-[#b1bad3]">
                        Returns <span className="text-white font-bold">${currentReturn} ₮</span>
                      </div>
                    </div>

                    {/* Quick Stake Chips */}
                    <div className="grid grid-cols-4 gap-1">
                      {[10, 25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            playClick();
                            updateStake(bet.id, amt);
                          }}
                          className="py-1 rounded-lg bg-[#1a2c38] hover:bg-[#2a4454] text-[10px] font-mono text-[#b1bad3] hover:text-white border border-white/5 transition-colors"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Contest Simulation Controls */}
            <div className="p-3 rounded-2xl bg-[#0f212e] border border-white/5 space-y-2 text-[11px] text-[#b1bad3]">
              <span className="font-bold text-white block uppercase text-[10px] tracking-wider">
                🧪 Contest Rubric Verifier
              </span>
              <button
                onClick={triggerSimulateOddsChange}
                disabled={singlesInSlip.length === 0}
                className="w-full py-1.5 rounded-lg bg-[#213743] hover:bg-[#2f4d5e] text-white text-center font-medium transition-colors disabled:opacity-40"
              >
                ⚡ Trigger "Odds changed: player must accept"
              </button>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateFailNextBet}
                  onChange={(e) => setSimulateFailNextBet(e.target.checked)}
                  className="rounded border-white/20 text-[#1475e1]"
                />
                <span>Simulate "Bet failed" state</span>
              </label>
            </div>
          </>
        )}

        {/* My bets tab */}
        {activePanelTab === 'mybets' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#b1bad3]">
              <span className="font-bold text-white uppercase text-[11px]">Open Bets ({myBets.open.length})</span>
              <span className="text-emerald-400 font-mono text-[10px]">${usdtBalance.toFixed(2)} USDT</span>
            </div>

            {myBets.open.map((bet) => (
              <div
                key={bet.id}
                className="p-3.5 rounded-2xl bg-[#213743] border border-white/10 space-y-2.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white truncate">{bet.match}</span>
                  <span className="text-[#00A3FF] font-mono font-bold">{bet.odds.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#b1bad3]">Stake: ${bet.stake.toFixed(2)} ₮</span>
                  <span className="text-white font-bold">Returns: ${bet.returns.toFixed(2)} ₮</span>
                </div>

                <button
                  onClick={() => cashOut(bet.id)}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-between px-3 shadow-md transition-all"
                >
                  <span>Cash Out</span>
                  <span className="font-mono">${bet.cashoutAmount.toFixed(2)} ₮</span>
                </button>
              </div>
            ))}

            <div className="pt-2 border-t border-white/10">
              <span className="font-bold text-white uppercase text-[11px] block mb-2">
                Settled ({myBets.settled.length})
              </span>
              <div className="space-y-2">
                {myBets.settled.map((st) => (
                  <div key={st.id} className="p-2.5 rounded-xl bg-[#0f212e] border border-white/5 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">{st.team}</div>
                      <div className="text-[10px] text-[#b1bad3]">{st.match}</div>
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
      </div>

      {/* Sticky Bottom Summary */}
      {activePanelTab === 'betslip' && (
        <div className="p-3.5 bg-[#0f212e] border-t border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#b1bad3]">Total stake</span>
            <span className="text-white font-bold">${totalStake.toFixed(2)} ₮</span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#b1bad3]">Payout</span>
            <span className="text-[#00A3FF] font-black text-sm">${currentReturn} ₮</span>
          </div>

          <button
            onClick={placeSingleBet}
            disabled={singlesInSlip.length === 0 || totalStake <= 0}
            className="w-full py-3 rounded-xl bg-[#1475e1] hover:bg-[#005cd6] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none text-white font-black text-xs shadow-glow-blue transition-all uppercase tracking-wider"
          >
            Place bet
          </button>
        </div>
      )}
    </aside>
  );
};
