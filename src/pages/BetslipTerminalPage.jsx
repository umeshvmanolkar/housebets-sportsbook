import React, { useState } from 'react';
import { 
  Sliders, 
  Trash2, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Coins, 
  HelpCircle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const BetslipTerminalPage = () => {
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
    setCurrentPage,
    userBets,
    cashOutBet,
    playSound
  } = useSportsbook();

  const [oddsPolicy, setOddsPolicy] = useState('higher'); // 'higher' | 'any' | 'never'

  const totalStake = singlesInSlip.reduce((acc, curr) => acc + (parseFloat(curr.stake) || 0), 0);
  const totalReturn = singlesInSlip.reduce((acc, curr) => acc + (parseFloat(curr.stake) || 0) * curr.odd, 0);
  const netProfit = totalReturn - totalStake;
  const activeBets = userBets.filter((b) => b.status === 'IN_PLAY');

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6">
      {/* Terminal Title Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d1622] via-[#0f1d16] to-[#0a121c] border border-[#00E701]/30 p-5 sm:p-7 shadow-glow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/30 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00E701] animate-pulse" />
            <span>PAGE 4: SINGLES-ONLY BETTING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Singles Betslip Terminal</h1>
          <p className="text-xs text-gray-400">
            Strictly singles-focused architecture. Independent stakes, sub-second execution, zero accumulator lag.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#141a26] border border-white/10 font-mono text-right">
            <span className="text-[10px] text-gray-400 block font-sans">Active Wallet Balance</span>
            <span className="text-sm font-bold text-white">
              {activeWallet.balance.toFixed(2)} {selectedCurrency}
            </span>
          </div>

          {singlesInSlip.length > 0 && (
            <button
              onClick={clearSlip}
              className="px-3 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Slip</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Terminal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols): Queued Singles Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <span>Unplaced Singles ({singlesInSlip.length})</span>
            </h3>
            <button
              onClick={() => { playSound('click'); setCurrentPage('lobby'); }}
              className="text-xs text-[#00E701] hover:underline font-semibold"
            >
              + Add More Singles from Lobby
            </button>
          </div>

          {singlesInSlip.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0f141d] border border-white/[0.08] text-center space-y-3">
              <Sliders className="w-10 h-10 text-gray-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Singles Currently in Slip</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Explore the Lobby or Live Tracker and click on any odds chip to populate your single bets.
              </p>
              <button
                onClick={() => { playSound('click'); setCurrentPage('lobby'); }}
                className="px-5 py-2.5 rounded-xl bg-[#00E701] text-black font-extrabold text-xs shadow-glow-green-sm inline-flex items-center gap-2"
              >
                <span>Browse Live Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            singlesInSlip.map((item, idx) => {
              const currentReturn = ((parseFloat(item.stake) || 0) * item.odd).toFixed(2);
              const profit = ((parseFloat(item.stake) || 0) * (item.odd - 1)).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-[#0f141d] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#00E701]/10 text-[#00E701] font-mono font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="text-sm font-extrabold text-white">{item.matchTitle}</div>
                        <div className="text-xs text-gray-400">{item.marketName}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#141a26] text-[#00E701] font-bold border border-white/5">
                        Odds: {formatOdds(item.odd)}
                      </div>
                      <button
                        onClick={() => removeSingleBet(item.id)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pick Banner */}
                  <div className="p-3 rounded-2xl bg-[#141a26] border border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <CheckCircle className="w-4 h-4 text-[#00E701]" />
                      <span>{item.selectionName}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">Straight Single</span>
                  </div>

                  {/* Stake & Return Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1 font-medium">
                        Stake ({selectedCurrency}):
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={item.stake}
                          onChange={(e) => updateSingleStake(item.id, e.target.value)}
                          className="w-full bg-[#141a26] text-white font-mono font-bold text-sm pl-8 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-[#00E701] focus:outline-none"
                        />
                      </div>

                      {/* Quick Chips */}
                      <div className="grid grid-cols-4 gap-1.5 mt-2">
                        {[10, 25, 50, 100].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => {
                              playSound('click');
                              updateSingleStake(item.id, amt);
                            }}
                            className="py-1 rounded-lg bg-[#141a26] hover:bg-[#1f283a] text-xs font-mono text-gray-300 hover:text-white border border-white/5 transition-colors"
                          >
                            +${amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Return summary & Place button */}
                    <div className="p-3 rounded-2xl bg-[#121722] border border-white/5 space-y-3">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Potential Return:</span>
                        <span className="text-[#00E701] font-bold">${currentReturn}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Net Profit:</span>
                        <span className="text-emerald-400 font-bold">+${profit}</span>
                      </div>

                      <button
                        onClick={() => placeSingleBet(item)}
                        className="w-full py-2.5 rounded-xl bg-[#00E701] hover:bg-[#00c801] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-glow-green-sm transition-all"
                      >
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        <span>Place Single (${item.stake})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column (4 cols): Slip Master Summary & Live Cashouts */}
        <div className="lg:col-span-4 space-y-4">
          {/* Slip Terminal Summary Box */}
          <div className="p-5 rounded-3xl bg-[#0f141d] border border-white/[0.08] space-y-4 shadow-glow-card">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Terminal Execution Summary
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-gray-300">
                <span>Total Singles:</span>
                <span className="text-white font-bold">{singlesInSlip.length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Total Wager:</span>
                <span className="text-white font-bold">${totalStake.toFixed(2)} {selectedCurrency}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Returns:</span>
                <span className="text-[#00E701] font-bold">${totalReturn.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300 pt-2 border-t border-white/5">
                <span>Projected Net Gain:</span>
                <span className="text-emerald-400 font-black text-sm">+${netProfit.toFixed(2)}</span>
              </div>
            </div>

            {/* Place All Singles CTA */}
            {singlesInSlip.length > 0 && (
              <button
                onClick={placeAllSingles}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00E701] to-[#00b501] hover:brightness-110 active:scale-[0.99] text-black font-black text-sm flex items-center justify-center gap-2 shadow-glow-green transition-all"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Execute All {singlesInSlip.length} Singles (${totalStake.toFixed(2)})</span>
              </button>
            )}

            {/* Odds Fluctuation Settings */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[11px] text-gray-400 font-semibold block">Odds Change Policy:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'higher', label: 'Higher Only' },
                  { id: 'any', label: 'Any Odds' },
                  { id: 'never', label: 'Reject All' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { playSound('click'); setOddsPolicy(opt.id); }}
                    className={`py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      oddsPolicy === opt.id
                        ? 'bg-[#00E701]/20 text-[#00E701] border border-[#00E701]/40'
                        : 'bg-[#141a26] text-gray-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Live Cashouts in Play */}
          <div className="p-5 rounded-3xl bg-[#0f141d] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#00E701]" />
                <span>Live Active Cashouts ({activeBets.length})</span>
              </h3>
              <span className="text-[10px] text-[#00E701] font-mono font-bold animate-pulse">LIVE</span>
            </div>

            {activeBets.length === 0 ? (
              <p className="text-xs text-gray-400 py-3 text-center">No active single bets right now.</p>
            ) : (
              activeBets.map((bet) => (
                <div
                  key={bet.id}
                  className="p-3.5 rounded-2xl bg-[#141a26] border border-white/[0.06] space-y-2"
                >
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-white truncate">{bet.match}</span>
                    <span className="text-gray-400 font-mono">{bet.progress}'</span>
                  </div>
                  <div className="text-xs text-gray-300">{bet.selection}</div>

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Stake: ${bet.stake}</span>
                    <span className="text-[#00E701]">Win: ${bet.potentialPayout}</span>
                  </div>

                  <button
                    onClick={() => cashOutBet(bet.id)}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-between px-3 transition-colors shadow-md"
                  >
                    <span>Cash Out</span>
                    <span className="font-mono font-bold">${bet.currentCashout.toFixed(2)}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
