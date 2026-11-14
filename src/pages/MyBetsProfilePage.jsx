import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Share2, 
  Copy, 
  ShieldCheck, 
  Award, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const MyBetsProfilePage = () => {
  const {
    userBets,
    cashOutBet,
    formatOdds,
    activeWallet,
    playSound
  } = useSportsbook();

  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'in-play' | 'won' | 'cashed'
  const [copiedId, setCopiedId] = useState(null);

  const filteredBets = userBets.filter((bet) => {
    if (filterTab === 'in-play') return bet.status === 'IN_PLAY';
    if (filterTab === 'won') return bet.status === 'WON';
    if (filterTab === 'cashed') return bet.status === 'CASHED_OUT';
    return true;
  });

  const wonBets = userBets.filter((b) => b.status === 'WON');
  const winRate = ((wonBets.length / Math.max(1, userBets.length - 1)) * 100).toFixed(1);

  const copyTx = (id, tx) => {
    playSound('click');
    setCopiedId(id);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tx);
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6">
      {/* Player Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d1622] via-[#101b2b] to-[#0c121e] border border-white/[0.08] p-5 sm:p-7 shadow-glow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E701] to-[#008f01] flex items-center justify-center text-3xl font-black text-black shadow-glow-green">
            🦥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">HubieWhale.sol</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                💎 DIAMOND VIP II
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">Wallet: 0x7a3...4e89 (Solana Verified)</p>
            <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
              <span>Rakeback: <strong className="text-[#00E701]">0.8% Instant</strong></span>
              <span>• Total Volume: <strong>$84,520 USDT</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Balance & Net Profit */}
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#141a26] border border-white/10 text-right font-mono">
            <span className="text-[10px] text-gray-400 block font-sans">All-Time Net Profit</span>
            <span className="text-base font-extrabold text-[#00E701]">+$3,480.20 USDT</span>
            <span className="text-[10px] text-gray-400 block font-sans">Win Rate: {winRate}%</span>
          </div>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08]">
          <div className="text-[11px] text-gray-400 uppercase font-semibold">Total Singles</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {userBets.length + 42}
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">Single-Wager Focus</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08]">
          <div className="text-[11px] text-gray-400 uppercase font-semibold">Win Ratio</div>
          <div className="text-xl sm:text-2xl font-black text-[#00E701] font-mono mt-1">
            {winRate}%
          </div>
          <div className="text-[10px] text-gray-400">Above Platform Avg (54%)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08]">
          <div className="text-[11px] text-gray-400 uppercase font-semibold">Average Odds</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            2.14
          </div>
          <div className="text-[10px] text-gray-400">Decimal Format</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.08]">
          <div className="text-[11px] text-gray-400 uppercase font-semibold">VIP Level</div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            Tier 2
          </div>
          <div className="text-[10px] text-gray-400">Next: Tier 3 (85%)</div>
        </div>
      </div>

      {/* Performance Graph (SVG Sparkline) */}
      <div className="p-5 rounded-3xl bg-[#0f141d] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00E701]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Cumulative Single Bets PnL Curve
            </h3>
          </div>
          <span className="text-xs font-mono text-[#00E701] font-bold">+284.5% ROI</span>
        </div>

        {/* SVG Mini Chart */}
        <div className="h-28 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pnlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00E701" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00E701" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 Q50,75 100,60 T200,45 T300,55 T400,20 T500,10 L500,100 L0,100 Z"
              fill="url(#pnlGrad)"
            />
            <path
              d="M0,80 Q50,75 100,60 T200,45 T300,55 T400,20 T500,10"
              fill="none"
              stroke="#00E701"
              strokeWidth="3"
            />
            {/* Dots */}
            <circle cx="100" cy="60" r="4" fill="#00E701" />
            <circle cx="200" cy="45" r="4" fill="#00E701" />
            <circle cx="300" cy="55" r="4" fill="#00E701" />
            <circle cx="400" cy="20" r="4" fill="#00E701" />
            <circle cx="500" cy="10" r="5" fill="#ffffff" stroke="#00E701" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Bets History Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-1.5 bg-[#121722] p-1 rounded-xl border border-white/5">
          {[
            { id: 'all', label: `All Bets (${userBets.length})` },
            { id: 'in-play', label: '🔥 In-Play' },
            { id: 'won', label: '✅ Won' },
            { id: 'cashed', label: '⚡ Cashed Out' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playSound('click'); setFilterTab(tab.id); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTab === tab.id ? 'bg-[#00E701] text-black shadow-glow-green-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-500 font-mono hidden sm:inline">
          On-Chain Proof Enabled
        </span>
      </div>

      {/* Bets History Cards */}
      <div className="space-y-3">
        {filteredBets.map((bet) => (
          <div
            key={bet.id}
            className={`p-4 rounded-2xl bg-[#0f141d] border transition-all space-y-3 ${
              bet.status === 'WON'
                ? 'border-emerald-500/30'
                : bet.status === 'IN_PLAY'
                ? 'border-amber-500/30'
                : bet.status === 'CASHED_OUT'
                ? 'border-blue-500/30'
                : 'border-white/[0.08]'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">{bet.id}</span>
                <span className="text-xs text-gray-500">• {bet.placedAt}</span>
              </div>

              {/* Status Badge */}
              <div>
                {bet.status === 'IN_PLAY' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold font-mono">
                    <Clock className="w-3 h-3 animate-spin" />
                    IN-PLAY ({bet.progress}')
                  </span>
                )}
                {bet.status === 'WON' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00E701] border border-[#00E701]/30 text-[10px] font-bold font-mono">
                    <CheckCircle className="w-3 h-3" />
                    WON (+${(bet.potentialPayout - bet.stake).toFixed(2)})
                  </span>
                )}
                {bet.status === 'LOST' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold font-mono">
                    <XCircle className="w-3 h-3" />
                    LOST
                  </span>
                )}
                {bet.status === 'CASHED_OUT' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold font-mono">
                    <Zap className="w-3 h-3" />
                    CASHED OUT (${bet.currentCashout || bet.stake})
                  </span>
                )}
              </div>
            </div>

            {/* Match & Pick */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-y border-white/[0.04] py-2.5">
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase">{bet.market}</span>
                <h4 className="text-sm font-black text-white">{bet.match}</h4>
                <div className="text-xs text-[#00E701] font-bold">{bet.selection}</div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">Stake</span>
                  <span className="font-bold text-white">${bet.stake.toFixed(2)} {bet.currency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Odds</span>
                  <span className="font-bold text-gray-200">{formatOdds(bet.odds)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Payout</span>
                  <span className={`font-bold ${bet.status === 'WON' ? 'text-[#00E701]' : 'text-white'}`}>
                    ${bet.potentialPayout.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Cashout / Tx Hash proof */}
            <div className="flex items-center justify-between text-xs">
              <button
                onClick={() => copyTx(bet.id, bet.txHash)}
                className="text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors font-mono text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E701]" />
                <span>Tx: {bet.txHash}</span>
                <span className="text-[10px] text-[#00E701]">
                  {copiedId === bet.id ? 'Copied!' : '(Copy)'}
                </span>
              </button>

              {bet.status === 'IN_PLAY' && (
                <button
                  onClick={() => cashOutBet(bet.id)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>Cash Out ${bet.currentCashout.toFixed(2)}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
