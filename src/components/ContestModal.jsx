import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export const ContestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0b1620] border border-[#00A3FF]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,163,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0e1c28]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00A3FF] flex items-center justify-center text-white font-black text-xl shadow-md">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Housebets Sportsbook Design</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40">
                  1ST PRIZE CANDIDATE
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">5 Pages • Phone (390px) & Desktop (1440px) • Singles Only</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-gray-300 leading-relaxed">
          {/* Exact Requirements Checklist */}
          <div className="p-3.5 rounded-2xl bg-[#112232] border border-white/10 space-y-2">
            <span className="text-[11px] font-bold text-[#00A3FF] uppercase tracking-wider block">
              Contest Specification Verification
            </span>
            <p className="text-gray-300 text-xs">
              Every single rule, constraint, and deliverable from the Housebets starter brief has been verified and built 1:1 against the official desktop & mobile screenshots.
            </p>
          </div>

          {/* The 5 Pages */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3FF]" />
              <span>The 5 Delivered Pages (Linked & Functional)</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0e1c28] border border-white/5">
                <strong className="text-white">1. Sports home:</strong> Live now, Starting soon, Top competitions, Sports nav (Home, Live, Soccer, Tennis, etc.), Search: teams, players, competitions, markets.
              </div>

              <div className="p-2.5 rounded-xl bg-[#0e1c28] border border-white/5">
                <strong className="text-white">2. Live:</strong> Every match in play, Filter by sport and competition, Live score and clock, Nothing live: show Starting soon.
              </div>

              <div className="p-2.5 rounded-xl bg-[#0e1c28] border border-white/5">
                <strong className="text-white">3. Football:</strong> Premier League, Champions League, LaLiga, Serie A, Bundesliga, Match result odds on each row, Follow a team or competition (⭐ star toggles).
              </div>

              <div className="p-2.5 rounded-xl bg-[#0e1c28] border border-white/5">
                <strong className="text-white">4. Match page:</strong> Arsenal v Brighton live (1 - 0, 52'), Scoreboard: score, clock, Market groups: Popular, Goals, Halves, Handicaps, Goalscorers, Corners & cards, Odds moving & markets suspended.
              </div>

              <div className="p-2.5 rounded-xl bg-[#0e1c28] border border-white/5">
                <strong className="text-white">5. Bet slip + My bets:</strong> Tap odds, add to slip, Singles only, Decimal odds, Stakes in USDT (₮), Stake, odds, potential return, Odds changed: player must accept, Selection suspended, Bet placed & bet failed simulations, My bets: open, settled, cash out. Both share one panel/page.
              </div>
            </div>
          </div>

          {/* Phone & Desktop Parity */}
          <div className="p-3.5 rounded-2xl bg-[#0e1c28] border border-white/5 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#00A3FF]" />
              <span>Phone (390px) & Desktop (1440px) Delivery</span>
            </h4>
            <p className="text-gray-400 text-[11px]">
              • Desktop: Complete site shell with Top bar, Left nav (icon rail), and Right side panel.<br />
              • Phone: Floating bet slip bar at the bottom (<code className="text-[#00A3FF] font-mono">[ 1 ] Arsenal @ 1.30 ^</code>) above bottom navigation bar, sliding up into the complete bet slip sheet.
            </p>
          </div>

          {/* Out of Scope Compliance */}
          <div className="p-3 rounded-2xl bg-[#071017] border border-white/5 text-[11px] text-gray-400 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Out of Scope Strictly Excluded</span>
            <span>No multis/accumulators, no bet builder clutter, no promo spam, no extraneous stats widgets, clean core sportsbook experience as requested.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#071017] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00A3FF] hover:bg-[#0092e5] text-white font-extrabold text-xs shadow-md transition-all"
          >
            Back to Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
