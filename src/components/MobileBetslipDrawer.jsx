import React from 'react';
import { X, Sliders, Trash2, Zap, CheckCircle, TrendingUp, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const MobileBetslipDrawer = () => {
  const {
    isMobileBetslipOpen,
    setIsMobileBetslipOpen,
    singlesInSlip,
    updateSingleStake,
    removeSingleBet,
    clearSlip,
    placeSingleBet,
    placeAllSingles,
    formatOdds,
    selectedCurrency,
    userBets,
    cashOutBet,
    playSound
  } = useSportsbook();

  if (!isMobileBetslipOpen) return null;

  const totalStake = singlesInSlip.reduce((acc, curr) => acc + (parseFloat(curr.stake) || 0), 0);
  const totalPotentialPayout = singlesInSlip.reduce(
    (acc, curr) => acc + (parseFloat(curr.stake) || 0) * curr.odd,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm md:hidden animate-fade-in">
      {/* Backdrop tap to close */}
      <div 
        className="flex-1"
        onClick={() => setIsMobileBetslipOpen(false)}
      />

      {/* Drawer Surface */}
      <div className="bg-[#0c1017] border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-2.5" />

        {/* Drawer Header */}
        <div className="px-4 py-2 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00E701]" />
            <h3 className="font-extrabold text-sm text-white">Singles Slip</h3>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/30">
              SINGLES ONLY
            </span>
          </div>

          <div className="flex items-center gap-2">
            {singlesInSlip.length > 0 && (
              <button
                onClick={clearSlip}
                className="text-gray-400 hover:text-red-400 text-xs p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsMobileBetslipOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slip items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {singlesInSlip.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Sliders className="w-8 h-8 text-gray-500 mx-auto" />
              <p className="text-xs text-gray-400">No active singles selected</p>
            </div>
          ) : (
            singlesInSlip.map((bet) => {
              const currentReturn = ((parseFloat(bet.stake) || 0) * bet.odd).toFixed(2);
              return (
                <div
                  key={bet.id}
                  className="p-3 rounded-2xl bg-[#121722] border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">{bet.marketName}</div>
                      <div className="text-xs font-bold text-white">{bet.matchTitle}</div>
                    </div>
                    <button
                      onClick={() => removeSingleBet(bet.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#0a0d14]">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00E701]" />
                      <span>{bet.selectionName}</span>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#00E701]">
                      {formatOdds(bet.odd)}
                    </div>
                  </div>

                  {/* Stake input */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-400">Stake:</span>
                      <span className="text-gray-200 font-mono text-[10px]">
                        Return: <strong className="text-[#00E701]">${currentReturn}</strong>
                      </span>
                    </div>
                    <input
                      type="number"
                      value={bet.stake}
                      onChange={(e) => updateSingleStake(bet.id, e.target.value)}
                      className="w-full bg-[#0a0d14] text-white font-mono text-xs font-bold px-3 py-2 rounded-xl border border-white/10"
                    />

                    <div className="grid grid-cols-4 gap-1 mt-1.5">
                      {[10, 25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            playSound('click');
                            updateSingleStake(bet.id, amt);
                          }}
                          className="py-1 rounded bg-white/5 text-[10px] font-mono text-gray-300"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => placeSingleBet(bet)}
                    className="w-full py-2 rounded-xl bg-[#00E701] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-glow-green-sm"
                  >
                    <span>Place Single (${bet.stake})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {singlesInSlip.length > 0 && (
          <div className="p-4 bg-[#0a0d14] border-t border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Total Stake:</span>
              <span className="text-white font-bold">${totalStake.toFixed(2)} {selectedCurrency}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Total Payout:</span>
              <span className="text-[#00E701] font-bold">${totalPotentialPayout.toFixed(2)}</span>
            </div>

            {singlesInSlip.length > 1 && (
              <button
                onClick={placeAllSingles}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E701] to-[#00b501] text-black font-extrabold text-sm shadow-glow-green flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Place All {singlesInSlip.length} Singles</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
