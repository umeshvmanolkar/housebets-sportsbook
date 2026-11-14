import React from 'react';
import { X, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const MobileBetslipDrawer = ({ isInsideFrame = false }) => {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    singlesInSlip,
    removeSelection,
    clearSlip,
    updateStake,
    oddsChangedNotice,
    acceptChangedOdds,
    placeSingleBet,
    betFeedback,
    myBets,
    cashOut,
    activePanelTab,
    setActivePanelTab,
    playClick
  } = useSportsbook();

  if (!isMobileDrawerOpen) return null;

  const currentBet = singlesInSlip[0];
  const totalStake = currentBet ? currentBet.stake : 0;
  const currentReturn = currentBet ? (currentBet.stake * currentBet.odd).toFixed(2) : '0.00';

  const posContainer = isInsideFrame
    ? 'absolute inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs animate-fade-in'
    : 'fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs md:hidden animate-fade-in';

  return (
    <div className={posContainer}>
      {/* Backdrop */}
      <div 
        className="flex-1"
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Drawer Surface matching Screenshot 6 */}
      <div className="bg-[#0b1620] border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden mb-[52px]">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto my-2" />

        {/* Header Tabs: Bet slip 1 | My bets 1 | Chat | ✕ */}
        <div className="px-4 py-2 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { playClick(); setActivePanelTab('betslip'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'betslip'
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              <span>Bet slip</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activePanelTab === 'betslip' ? 'bg-white text-[#00A3FF]' : 'bg-[#00A3FF] text-white'
              }`}>
                {singlesInSlip.length}
              </span>
            </button>

            <button
              onClick={() => { playClick(); setActivePanelTab('mybets'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'mybets'
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              <span>My bets</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activePanelTab === 'mybets' ? 'bg-white text-[#00A3FF]' : 'bg-white/10 text-gray-300'
              }`}>
                {myBets.open.length}
              </span>
            </button>

            <button
              onClick={() => { playClick(); setActivePanelTab('chat'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activePanelTab === 'chat' ? 'bg-[#00A3FF] text-white' : 'text-gray-400'
              }`}
            >
              Chat
            </button>
          </div>

          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activePanelTab === 'betslip' ? (
            <>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-gray-300">
                  Singles · {singlesInSlip.length} selection
                </span>
                {singlesInSlip.length > 0 && (
                  <button onClick={clearSlip} className="text-gray-400 hover:text-white">
                    Clear all
                  </button>
                )}
              </div>

              {/* Odds Changed Alert Bar */}
              {oddsChangedNotice && (
                <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Odds changed to {oddsChangedNotice.newOdd.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={acceptChangedOdds}
                    className="w-full py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs"
                  >
                    Accept New Odds
                  </button>
                </div>
              )}

              {/* Single Bet Card */}
              {currentBet ? (
                <div className="p-3 rounded-2xl bg-[#112232] border border-white/10 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-white">{currentBet.teamName}</div>
                      <div className="text-[11px] text-gray-400">
                        {currentBet.marketName} · {currentBet.matchTitle} · <span className="text-red-400 font-mono">{currentBet.scoreMinute}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#00A3FF] font-mono">{currentBet.odd.toFixed(2)}</span>
                      <button onClick={() => removeSelection(currentBet.id)} className="text-gray-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stake input */}
                  <div className="flex items-center bg-[#071017] rounded-xl border border-white/10 px-3 py-2">
                    <span className="text-xs text-gray-500 font-bold mr-1">$</span>
                    <input
                      type="number"
                      value={currentBet.stake}
                      onChange={(e) => updateStake(currentBet.id, e.target.value)}
                      className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                    />
                    <div className="text-right text-xs font-mono text-gray-400 whitespace-nowrap">
                      Returns <span className="text-white font-bold">${currentReturn}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-8">Your bet slip is empty</p>
              )}
            </>
          ) : (
            /* My bets tab */
            <div className="space-y-3">
              <span className="text-xs font-bold text-white block">Open Bets</span>
              {myBets.open.map((bet) => (
                <div key={bet.id} className="p-3 rounded-2xl bg-[#112232] border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white">{bet.match}</span>
                    <span className="text-[#00A3FF] font-mono font-bold">{bet.odds.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Stake: ${bet.stake.toFixed(2)} ₮</span>
                    <span className="text-white">Returns: ${bet.returns.toFixed(2)} ₮</span>
                  </div>
                  <button
                    onClick={() => cashOut(bet.id)}
                    className="w-full py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex justify-between px-3"
                  >
                    <span>Cash Out</span>
                    <span>${bet.cashoutAmount.toFixed(2)} ₮</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {activePanelTab === 'betslip' && currentBet && (
          <div className="p-3 bg-[#071017] border-t border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Total stake</span>
              <span className="text-white font-bold">${totalStake.toFixed(2)} ₮</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Payout</span>
              <span className="text-[#00A3FF] font-black text-sm">${currentReturn} ₮</span>
            </div>

            <button
              onClick={placeSingleBet}
              className="w-full py-3 rounded-xl bg-[#00A3FF] text-white font-black text-xs uppercase tracking-wider shadow-md"
            >
              Place bet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
