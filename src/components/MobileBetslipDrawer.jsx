import React from 'react';
import { X, Trash2, AlertTriangle, CheckCircle, XCircle, Zap, Lock } from 'lucide-react';
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
    triggerSimulateOddsChange,
    toggleSimulateSuspended,
    placeSingleBet,
    betFeedback,
    myBets,
    cashOut,
    activePanelTab,
    setActivePanelTab,
    setCurrentPage,
    usdtBalance,
    playClick
  } = useSportsbook();

  if (!isMobileDrawerOpen) return null;

  const currentBet = singlesInSlip[0];
  const totalStake = currentBet ? currentBet.stake : 0;
  const currentReturn = currentBet ? (currentBet.stake * currentBet.odd).toFixed(2) : '0.00';

  const posContainer = isInsideFrame
    ? 'absolute inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-xs animate-fade-in'
    : 'fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-xs md:hidden animate-fade-in';

  return (
    <div className={posContainer}>
      {/* Backdrop */}
      <div 
        className="flex-1"
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Drawer Surface matching Housebets Mobile Reference */}
      <div className="bg-[#0f212e] border-t border-[#213743] rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden mb-[52px]">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-2 mb-1" />

        {/* 1. Header Tabs Row: [ Bet slip (1) ]  My bets (1)  Chat  ✕ */}
        <div className="px-4 py-2 border-b border-[#213743] flex items-center justify-between bg-[#1a2c38]">
          <div className="flex items-center gap-2">
            {/* Bet slip tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('betslip'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'betslip'
                  ? 'bg-[#213743] text-white shadow-sm'
                  : 'text-[#b1bad3] hover:text-white'
              }`}
            >
              <span>Bet slip</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activePanelTab === 'betslip' ? 'bg-[#00A3FF] text-[#071017]' : 'bg-[#213743] text-gray-300'
              }`}>
                {singlesInSlip.length}
              </span>
            </button>

            {/* My bets tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('mybets'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activePanelTab === 'mybets'
                  ? 'bg-[#213743] text-white shadow-sm font-bold'
                  : 'text-[#b1bad3] hover:text-white'
              }`}
            >
              <span>My bets</span>
              <span className="w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center bg-[#a0f0ea] text-[#071017]">
                {myBets.open.length}
              </span>
            </button>

            {/* Chat tab */}
            <button
              onClick={() => { playClick(); setActivePanelTab('chat'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePanelTab === 'chat'
                  ? 'bg-[#213743] text-white shadow-sm font-bold'
                  : 'text-[#b1bad3] hover:text-white'
              }`}
            >
              Chat
            </button>
          </div>

          {/* Close button (plain X matching reference) */}
          <button
            onClick={() => { playClick(); setIsMobileDrawerOpen(false); }}
            className="text-[#b1bad3] hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
          {/* TAB 1: BET SLIP */}
          {activePanelTab === 'betslip' && (
            <>
              {/* Singles subheader & Clear all */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Singles · {singlesInSlip.length} selection
                </span>
                {singlesInSlip.length > 0 && (
                  <button 
                    onClick={clearSlip} 
                    className="text-[#557086] hover:text-red-400 font-medium transition-colors"
                  >
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

              {/* Single Bet Card matching Reference */}
              {currentBet ? (
                <div className="p-3.5 rounded-2xl bg-[#1a2c38] border border-[#213743] space-y-2.5 shadow-sm">
                  {/* Row 1: Selection Name + Odds + Remove X */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <span className="text-sm font-bold text-white truncate">
                        {currentBet.selectionName || currentBet.teamName}
                      </span>
                      {currentBet.isSuspended && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[9px] flex items-center gap-0.5 flex-shrink-0">
                          <Lock className="w-2.5 h-2.5" /> Suspended
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-sm font-mono font-bold ${
                        currentBet.isSuspended ? 'text-amber-400' : 'text-[#00A3FF]'
                      }`}>
                        {currentBet.isSuspended ? '🔒 Susp.' : currentBet.odd.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeSelection(currentBet.id)} 
                        className="text-[#557086] hover:text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Match info and live score minute */}
                  <div className="text-xs text-[#557086] flex items-center justify-between flex-wrap gap-1">
                    <span className="truncate max-w-[200px]">
                      {currentBet.marketName || 'Match result'} · {currentBet.matchTitle}
                    </span>
                    {currentBet.scoreMinute && (
                      <span className="text-[#ff3366] font-mono text-[11px] font-medium flex-shrink-0">
                        {currentBet.scoreMinute}
                      </span>
                    )}
                  </div>

                  {/* Row 3: Stake Input & Returns */}
                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    {/* Stake Input Box */}
                    <div className="flex items-center bg-[#0f212e] rounded-xl border border-[#213743] px-3.5 py-2 flex-1 focus-within:border-[#00A3FF]">
                      <span className="text-xs text-[#557086] font-mono font-bold mr-1.5">$</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={currentBet.stake || ''}
                        onChange={(e) => updateStake(currentBet.id, e.target.value)}
                        className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none placeholder-[#557086]"
                      />
                    </div>

                    {/* Returns */}
                    <div className="text-right flex-shrink-0 pl-1">
                      <div className="text-[10px] text-[#557086] font-semibold">Returns</div>
                      <div className="text-xs font-mono font-bold text-white">
                        {currentBet.stake > 0 ? `$${currentReturn} ₮` : '—'}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stake Pills */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          playClick();
                          updateStake(currentBet.id, amt);
                        }}
                        className={`py-1 rounded-lg text-[11px] font-mono font-bold transition-all border ${
                          currentBet.stake === amt
                            ? 'bg-[#1475e1] border-[#1475e1] text-white shadow-sm'
                            : 'bg-[#0f212e] border-[#213743] text-[#b1bad3] hover:text-white hover:bg-[#213743]'
                        }`}
                      >
                        +${amt}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        playClick();
                        updateStake(currentBet.id, 250);
                      }}
                      className="py-1 rounded-lg text-[11px] font-mono font-bold bg-[#0f212e] border border-[#213743] text-amber-400 hover:bg-[#213743] transition-all"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-2">
                  <p className="text-xs text-[#557086]">Your bet slip is empty</p>
                  <p className="text-[11px] text-[#557086]">Select odds from any live or upcoming match</p>
                </div>
              )}
            </>
          )}

          {/* TAB 2: MY BETS */}
          {activePanelTab === 'mybets' && (
            <div className="space-y-3">
              {/* Subheader matching Singles header on Betslip */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Open · {myBets.open.length} {myBets.open.length === 1 ? 'bet' : 'bets'}
                </span>
                <button
                  onClick={() => {
                    playClick();
                    setCurrentPage('bets');
                    setIsMobileDrawerOpen(false);
                  }}
                  className="text-[11px] text-[#00A3FF] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View all ({myBets.settled.length} settled)</span>
                  <span>→</span>
                </button>
              </div>

              {myBets.open.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-xs text-[#557086]">No open bets</p>
                  <p className="text-[11px] text-[#557086]">Your placed bets will appear here with live cash out</p>
                </div>
              ) : (
                myBets.open.map((bet) => (
                  <div key={bet.id} className="p-3.5 rounded-2xl bg-[#1a2c38] border border-[#213743] space-y-2.5 shadow-sm">
                    {/* Row 1: Selection Name + Odds (Exact Bet Slip Card styling) */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white truncate pr-2">
                        {bet.team || 'Arsenal'}
                      </div>
                      <span className="text-sm font-mono font-bold text-[#00A3FF] flex-shrink-0">
                        {bet.odds.toFixed(2)}
                      </span>
                    </div>

                    {/* Row 2: Market, Match & Live Info */}
                    <div className="text-xs text-[#557086] flex items-center justify-between flex-wrap gap-1">
                      <span className="truncate max-w-[200px]">
                        {bet.market || 'Match result'} · {bet.match}
                      </span>
                      {bet.scoreMinute && (
                        <span className="text-[#ff3366] font-mono text-[11px] font-medium flex-shrink-0">
                          {bet.scoreMinute}
                        </span>
                      )}
                    </div>

                    {/* Row 3: Inset Box for Stake & Returns matching Bet Slip Input styling */}
                    <div className="flex items-center justify-between bg-[#0f212e] rounded-xl border border-[#213743] px-3.5 py-2">
                      <div>
                        <div className="text-[10px] text-[#557086] font-semibold">Stake</div>
                        <div className="text-xs font-mono font-bold text-white">
                          ${bet.stake.toFixed(2)} <span className="text-[#00F5D4] font-bold">₮</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-[#557086] font-semibold">Returns</div>
                        <div className="text-xs font-mono font-bold text-white">
                          ${bet.returns.toFixed(2)} <span className="text-[#00F5D4] font-bold">₮</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Cash Out CTA Button */}
                    <button
                      onClick={() => cashOut(bet.id)}
                      className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs flex items-center justify-between px-4 shadow-md active:scale-95 transition-all"
                    >
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        <span>Cash Out</span>
                      </div>
                      <span className="font-mono font-black text-sm">
                        ${(bet.cashoutAmount || bet.stake * 1.42).toFixed(2)} ₮
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: CHAT */}
          {activePanelTab === 'chat' && (
            <div className="space-y-2.5 py-1">
              <div className="p-3 rounded-xl bg-[#1a2c38] border border-[#213743] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00A3FF]">SportsBettor_99</span>
                  <span className="text-[10px] text-[#557086]">1m ago</span>
                </div>
                <p className="text-white text-xs">Arsenal looking strong in the 2nd half! 2-0 incoming!</p>
              </div>

              <div className="p-3 rounded-xl bg-[#1a2c38] border border-[#213743] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">CryptoWhale_7</span>
                  <span className="text-[10px] text-[#557086]">3m ago</span>
                </div>
                <p className="text-white text-xs">Cashed out my Brighton bet, taking profit before 70'.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0f212e] border border-[#213743] text-xs text-[#557086] text-center">
                💬 Live chat active with 1,420 community members
              </div>
            </div>
          )}
        </div>

        {/* 3. Bottom Pinned Summary & Place Bet Button matching Reference */}
        {activePanelTab === 'betslip' && (
          <div className="p-3.5 bg-[#0f212e] border-t border-[#213743] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#557086]">
                Total stake <span className="font-bold text-white ml-1">${totalStake.toFixed(2)}</span>
                <span className="text-[#00F5D4] ml-1 font-bold">₮</span>
              </span>
              <span className="text-[#557086]">
                Payout <span className="font-bold text-white ml-1">${currentReturn}</span>
                <span className="text-[#00F5D4] ml-1 font-bold">₮</span>
              </span>
            </div>

            <button
              onClick={placeSingleBet}
              disabled={!currentBet || totalStake <= 0 || currentBet?.isSuspended}
              className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 ${
                currentBet?.isSuspended
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-not-allowed opacity-90'
                  : currentBet && totalStake > 0
                  ? 'bg-[#1475e1] hover:bg-[#0092e6] text-white shadow-glow-blue active:scale-95'
                  : 'bg-[#172b38] text-[#557086] cursor-not-allowed'
              }`}
            >
              {currentBet?.isSuspended ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Selection Suspended</span>
                </>
              ) : (
                <span>Place bet {totalStake > 0 ? `($${totalStake.toFixed(2)} ₮)` : ''}</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
