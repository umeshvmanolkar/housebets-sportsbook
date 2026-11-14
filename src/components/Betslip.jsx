import React, { useState } from 'react';
import { 
  Trash2, 
  Zap, 
  ArrowRight, 
  DollarSign, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  Lock, 
  Sparkles,
  Sliders,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const Betslip = () => {
  const {
    singlesInSlip,
    updateSingleStake,
    removeSingleBet,
    clearSlip,
    placeSingleBet,
    placeAllSingles,
    formatOdds,
    selectedCurrency,
    activeWallet,
    quickBetMode,
    setQuickBetMode,
    userBets,
    cashOutBet,
    playSound
  } = useSportsbook();

  const [activeSlipTab, setActiveSlipTab] = useState('slip'); // 'slip' | 'active-bets'
  const [oddsAcceptPolicy, setOddsAcceptPolicy] = useState('higher'); // 'higher' | 'any' | 'none'

  const activeInPlayBets = userBets.filter((b) => b.status === 'IN_PLAY');
  const totalStake = singlesInSlip.reduce((acc, curr) => acc + (parseFloat(curr.stake) || 0), 0);
  const totalPotentialPayout = singlesInSlip.reduce(
    (acc, curr) => acc + (parseFloat(curr.stake) || 0) * curr.odd,
    0
  );

  return (
    <div className="w-80 flex-shrink-0 bg-[#0a0d14] border-l border-white/[0.07] flex flex-col h-full select-none">
      {/* Betslip Header */}
      <div className="p-3 border-b border-white/[0.07]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white uppercase tracking-wider">Betslip</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/30">
              SINGLES ONLY
            </span>
          </div>

          {singlesInSlip.length > 0 && activeSlipTab === 'slip' && (
            <button
              onClick={clearSlip}
              className="text-gray-400 hover:text-red-400 text-xs transition-colors p-1"
              title="Clear Slip"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tab switch between New Slip and Active Live Bets */}
        <div className="grid grid-cols-2 gap-1 bg-[#121722] p-1 rounded-xl border border-white/[0.05]">
          <button
            onClick={() => { playSound('click'); setActiveSlipTab('slip'); }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeSlipTab === 'slip'
                ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Singles</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeSlipTab === 'slip' ? 'bg-black text-[#00E701]' : 'bg-white/10 text-gray-300'
            }`}>
              {singlesInSlip.length}
            </span>
          </button>

          <button
            onClick={() => { playSound('click'); setActiveSlipTab('active-bets'); }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeSlipTab === 'active-bets'
                ? 'bg-[#00E701] text-black shadow-glow-green-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Active</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeSlipTab === 'active-bets' ? 'bg-black text-[#00E701]' : 'bg-white/10 text-gray-300'
            }`}>
              {activeInPlayBets.length}
            </span>
          </button>
        </div>
      </div>

      {/* Betslip Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {activeSlipTab === 'slip' ? (
          singlesInSlip.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#121722] border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                <Sliders className="w-6 h-6 text-[#00E701]" />
              </div>
              <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Your Singles Slip is Empty</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Click any odd across Soccer, Basketball, or Esports to add a high-speed single bet.
              </p>
              <div className="p-2.5 rounded-xl bg-[#00E701]/5 border border-[#00E701]/20 text-[10px] text-[#00E701] font-medium text-left">
                ⚡ <span className="font-bold">Contest Feature:</span> Built strictly for single bets. No accumulator friction, instant one-tap crypto executions.
              </div>
            </div>
          ) : (
            singlesInSlip.map((bet) => {
              const currentReturn = ((parseFloat(bet.stake) || 0) * bet.odd).toFixed(2);
              return (
                <div
                  key={bet.id}
                  className="p-3 rounded-2xl bg-[#0f141d] border border-white/[0.08] hover:border-white/20 transition-all space-y-2.5 shadow-sm group"
                >
                  {/* Top Bar: Event & Delete */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        {bet.marketName}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{bet.matchTitle}</h4>
                    </div>
                    <button
                      onClick={() => removeSingleBet(bet.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pick & Odd */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141a26] border border-white/[0.05]">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00E701]" />
                      <span>{bet.selectionName}</span>
                    </div>
                    <div className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                      bet.trend === 'up'
                        ? 'bg-[#00E701]/15 text-[#00E701] border border-[#00E701]/30'
                        : bet.trend === 'down'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : 'bg-white/10 text-white'
                    }`}>
                      {bet.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                      {bet.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                      <span>{formatOdds(bet.odd)}</span>
                    </div>
                  </div>

                  {/* Stake Input */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-gray-400 font-medium">Stake ({selectedCurrency}):</span>
                      <span className="text-gray-300 font-mono text-[10px]">
                        Return: <strong className="text-[#00E701] font-bold">${currentReturn}</strong>
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={bet.stake}
                        onChange={(e) => updateSingleStake(bet.id, e.target.value)}
                        className="w-full bg-[#141a26] text-white font-mono font-bold text-xs pl-7 pr-3 py-2 rounded-xl border border-white/10 focus:border-[#00E701] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Quick Stake Chips */}
                    <div className="grid grid-cols-4 gap-1 mt-1.5">
                      {[10, 25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            playSound('click');
                            updateSingleStake(bet.id, amt);
                          }}
                          className="py-1 rounded-lg bg-[#141a26] hover:bg-[#1a2233] text-[10px] font-mono text-gray-300 hover:text-white border border-white/[0.05] transition-colors"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Place Single Button */}
                  <button
                    onClick={() => placeSingleBet(bet)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00E701] to-[#00c801] hover:brightness-110 active:scale-[0.99] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-glow-green-sm transition-all"
                  >
                    <span>Place Single</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )
        ) : (
          /* Active Bets Tab */
          activeInPlayBets.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-2">
              <Clock className="w-8 h-8 text-gray-500 mx-auto" />
              <div className="text-xs font-bold text-gray-300">No Active In-Play Bets</div>
              <p className="text-[11px] text-gray-400">Place a single bet to unlock real-time live cashout sliders.</p>
            </div>
          ) : (
            activeInPlayBets.map((bet) => (
              <div
                key={bet.id}
                className="p-3 rounded-2xl bg-[#0f141d] border border-emerald-500/30 space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#00E701] bg-[#00E701]/10 px-2 py-0.5 rounded border border-[#00E701]/20">
                    LIVE {bet.progress}'
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{bet.id}</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-white truncate">{bet.match}</div>
                  <div className="text-[11px] text-gray-300 font-medium">{bet.selection}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono p-2 rounded-xl bg-[#141a26]">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Stake</span>
                    <span className="text-white font-bold">${bet.stake.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-[10px] block">Potential Win</span>
                    <span className="text-[#00E701] font-bold">${bet.potentialPayout.toFixed(2)}</span>
                  </div>
                </div>

                {/* Instant Cashout Button */}
                <button
                  onClick={() => cashOutBet(bet.id)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 active:scale-[0.99] text-black font-extrabold text-xs flex items-center justify-between px-3 shadow-md transition-all"
                >
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-black" />
                    Cash Out Now
                  </span>
                  <span className="font-mono">${bet.currentCashout.toFixed(2)}</span>
                </button>
              </div>
            ))
          )
        )}
      </div>

      {/* Bottom Sticky Action Footer (When slip has items) */}
      {activeSlipTab === 'slip' && singlesInSlip.length > 0 && (
        <div className="p-3 bg-[#0c1017] border-t border-white/[0.08] space-y-2.5">
          {/* Summary Row */}
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Singles Placed:</span>
              <span className="text-white font-bold">{singlesInSlip.length}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Total Stakes:</span>
              <span className="text-white font-bold">${totalStake.toFixed(2)} {selectedCurrency}</span>
            </div>
            <div className="flex justify-between text-white font-semibold pt-1 border-t border-white/5">
              <span>Potential Return:</span>
              <span className="text-[#00E701] font-extrabold text-sm">${totalPotentialPayout.toFixed(2)}</span>
            </div>
          </div>

          {/* Place All Singles Button */}
          {singlesInSlip.length > 1 && (
            <button
              onClick={placeAllSingles}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00E701] to-[#00b501] hover:brightness-110 active:scale-[0.99] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-glow-green transition-all"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Place All {singlesInSlip.length} Singles (${totalStake.toFixed(2)})</span>
            </button>
          )}

          {/* Quick Bet & Odds Changes Toggles */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
            <button
              onClick={() => {
                playSound('click');
                setOddsAcceptPolicy(
                  oddsAcceptPolicy === 'higher' ? 'any' : oddsAcceptPolicy === 'any' ? 'none' : 'higher'
                );
              }}
              className="hover:text-white transition-colors"
            >
              Odds: <span className="text-[#00E701] font-semibold">{oddsAcceptPolicy.toUpperCase()}</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setQuickBetMode(!quickBetMode);
              }}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>1-Tap Mode:</span>
              <span className={`font-bold ${quickBetMode ? 'text-[#00E701]' : 'text-gray-500'}`}>
                {quickBetMode ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
