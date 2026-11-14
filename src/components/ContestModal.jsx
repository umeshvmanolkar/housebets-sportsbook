import React from 'react';
import { 
  X, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  ExternalLink,
  Code2
} from 'lucide-react';

export const ContestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0c1017] border border-[#00E701]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,231,1,0.2)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0d1c13] to-[#0f1422]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00E701] flex items-center justify-center text-black font-black text-xl shadow-glow-green-sm">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Housebets Sportsbook Design</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E701]/20 text-[#00E701] border border-[#00E701]/40">
                  1ST PRIZE ENTRY
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">Contest Brief: Clickable Prototype • 5 Pages • Singles Only</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-gray-300 leading-relaxed">
          {/* Key Deliverable Highlights */}
          <div className="p-4 rounded-2xl bg-[#121926] border border-white/10 space-y-2">
            <span className="text-[11px] font-bold text-[#00E701] uppercase tracking-wider block">
              Contest Alignment & Core Pillars
            </span>
            <p>
              Designed and built specifically for the Housebets Contest Labs Sportsbook brief. Engineered with a dark-mode Web3 aesthetic, neon emerald green accents (<code className="text-[#00E701] font-mono">#00E701</code>), and ultra-fast single bet wagering flows.
            </p>
          </div>

          {/* 5 Pages Architecture Breakdown */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00E701]" />
              <span>The 5 Core Interactive Pages (Singles Only)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#141a24] border border-white/5 space-y-1">
                <strong className="text-white block font-bold">1. Lobby / Discovery Hub</strong>
                <p className="text-gray-400 text-[11px]">
                  Live in-play matches ticker, marquee specials, quick sport filters, and instant 1-click single odds.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#141a24] border border-white/5 space-y-1">
                <strong className="text-white block font-bold">2. Live Tracker & In-Play Match</strong>
                <p className="text-gray-400 text-[11px]">
                  2D pitch radar, live possession bars, in-game stats, attack tracker, and deep singles markets.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#141a24] border border-white/5 space-y-1">
                <strong className="text-white block font-bold">3. Leagues & Competitions</strong>
                <p className="text-gray-400 text-[11px]">
                  Full standings table, matchday fixtures schedule, team form badges, and direct singles placement.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#141a24] border border-white/5 space-y-1">
                <strong className="text-white block font-bold">4. Singles Betslip Terminal</strong>
                <p className="text-gray-400 text-[11px]">
                  Dedicated single bets terminal, individual stake inputs, quick chips, live potential payout calculation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#141a24] border border-white/5 space-y-1 sm:col-span-2">
                <strong className="text-white block font-bold">5. Player Analytics & My Bets Vault</strong>
                <p className="text-gray-400 text-[11px]">
                  PnL growth chart, live cashout controls, win/loss audit receipts, and Solana on-chain tx proofs.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop & Mobile Mode */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#00E701]" />
              <span>Desktop & Mobile Dual-Experience</span>
            </h4>
            <p>
              You can toggle between <strong>Desktop 3-Column</strong> view and <strong>Mobile Phone Bezel</strong> mode in the header at any time. Mobile mode features a native iPhone frame, dynamic island, thumb navigation bar, and slide-up betslip drawer.
            </p>
          </div>

          {/* GitHub Pages Ready */}
          <div className="p-4 rounded-2xl bg-[#09150d] border border-[#00E701]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#00E701] font-bold">
              <Zap className="w-4 h-4 fill-[#00E701]" />
              <span>Ready for 1-Click GitHub Pages Deployment</span>
            </div>
            <p className="text-gray-300 text-[11px]">
              Vite is pre-configured with relative assets (<code className="text-[#00E701] font-mono">base: './'</code>) and an automated GitHub Actions deployment workflow at <code className="text-[#00E701] font-mono">.github/workflows/deploy.yml</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a0d14] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#00E701] text-black font-extrabold text-xs shadow-glow-green-sm hover:bg-[#00c801] transition-all"
          >
            Explore Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
