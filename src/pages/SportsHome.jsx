import React from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Clock, 
  Star, 
  Check, 
  TrendingUp,
  Users,
  Pin
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { PROMO_CARDS, SPORTS_NAV, MATCHES_DATA } from '../data/mockData';
import { TeamCrest } from '../components/Logos';

export const SportsHome = () => {
  const {
    setCurrentPage,
    setSelectedMatchId,
    searchQuery,
    setSearchQuery,
    singlesInSlip,
    toggleSelection,
    favourites,
    toggleFollow,
    playClick
  } = useSportsbook();

  const topMatches = [
    MATCHES_DATA[0], // Arsenal vs Brighton
    MATCHES_DATA[1], // Norway vs Wales (from Stake screenshot)
    MATCHES_DATA[2], // Portugal vs Denmark (from Stake screenshot)
    MATCHES_DATA[3], // Sweden vs Bosnia (from Stake screenshot)
    MATCHES_DATA[4], // Liverpool vs Man Utd
    MATCHES_DATA[5]  // Real Madrid vs Bayern
  ];

  return (
    <div className="space-y-5 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto">
      {/* 1. Sports Betting Promos & Offers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {PROMO_CARDS.map((promo) => (
          <div
            key={promo.id}
            onClick={() => {
              playClick();
              setCurrentPage('football');
            }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${promo.bgGradient} border ${promo.border} relative overflow-hidden shadow-card-elevated flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all`}
          >
            <div className="space-y-1 z-10">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] font-extrabold uppercase tracking-wider">
                {promo.badge}
              </span>
              <h3 className="text-sm font-extrabold text-white group-hover:text-[#00A3FF] transition-colors">
                {promo.title}
              </h3>
              <p className="text-xs text-[#b1bad3] leading-snug">
                {promo.subtitle}
              </p>
            </div>
            <span className="text-4xl transform group-hover:scale-110 transition-transform">
              {promo.icon}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Stake-Style Search Bar with Ctrl + K badge */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#557086] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search teams, players or leagues"
          className="w-full bg-[#1a2c38] text-xs text-white pl-10 pr-20 py-3 rounded-xl border border-white/[0.08] focus:border-[#1475e1] focus:outline-none placeholder:text-[#557086] transition-colors"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-[#0f212e] border border-white/10 text-[10px] font-mono text-[#557086]">
          Ctrl + K
        </div>
      </div>

      {/* 3. Subnav Pills: Sports Home | Live Betting | Trending | My Bets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'home', label: 'Sports Home', icon: '⚽', active: true },
          { id: 'live', label: 'Live Betting', icon: '🔴', active: false },
          { id: 'trending', label: 'Trending', icon: '🔥', active: false },
          { id: 'mybets', label: 'My Bets', icon: '🎫', active: false }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playClick();
              if (tab.id === 'live') setCurrentPage('live');
              else if (tab.id === 'mybets') setCurrentPage('bets');
              else setCurrentPage('home');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              tab.active
                ? 'bg-[#1a2c38] text-white border border-white/10 shadow-sm'
                : 'bg-transparent text-[#b1bad3] hover:bg-[#1a2c38]/60 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Top Matches Grid (Exact Match to Stake Reference Screenshot 1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-base">⚽</span>
            <h2 className="text-sm font-extrabold text-white tracking-wide">Top Matches</h2>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <button className="p-1.5 rounded-lg bg-[#1a2c38] hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-lg bg-[#1a2c38] hover:text-white"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {topMatches.map((m) => {
            return (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-[#1a2c38] border border-white/[0.08] hover:border-white/20 transition-all space-y-3 shadow-card-elevated flex flex-col justify-between group"
              >
                {/* Meta Row: Time, Volume, Star */}
                <div className="flex items-center justify-between text-xs text-[#557086] border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-2">
                    {m.isLive ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-mono text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        LIVE {m.minute}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-[#b1bad3]">{m.date}</span>
                    )}
                    <span className="text-gray-500">• {m.league}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#b1bad3]">
                      <Users className="w-3.5 h-3.5 text-[#557086]" />
                      <span>{m.bettorVolume}</span>
                    </span>
                    <button
                      onClick={() => toggleFollow({ name: m.homeTeam.name, type: 'team' })}
                      className="p-0.5 text-[#557086] hover:text-amber-400 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Match Teams & Crests (Click navigates to Match Page) */}
                <div
                  onClick={() => {
                    playClick();
                    setSelectedMatchId(m.id);
                    setCurrentPage('match');
                  }}
                  className="space-y-2 cursor-pointer py-1"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-white">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest teamName={m.homeTeam.name} className="w-6 h-6 flex-shrink-0" />
                      <span className="group-hover:text-[#00A3FF] transition-colors">{m.homeTeam.name}</span>
                    </div>
                    {m.isLive && <span className="font-mono text-base font-black">{m.homeTeam.score}</span>}
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-white">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest teamName={m.awayTeam.name} className="w-6 h-6 flex-shrink-0" />
                      <span className="group-hover:text-[#00A3FF] transition-colors">{m.awayTeam.name}</span>
                    </div>
                    {m.isLive && <span className="font-mono text-base font-black">{m.awayTeam.score}</span>}
                  </div>
                </div>

                {/* Fire Bettor Sentiment Indicator (from Stake screenshot: "🔥 97% of 1x2 bets on Norway") */}
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  <span>🔥</span>
                  <span>{m.bettorSentiment}</span>
                </div>

                {/* Stake-Style High-Contrast Odds Row */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[
                    { label: m.homeTeam.shortName || '1', opt: m.matchResult.home },
                    { label: 'Draw', opt: m.matchResult.draw },
                    { label: m.awayTeam.shortName || '2', opt: m.matchResult.away }
                  ].map(({ label, opt }) => {
                    const isSelected = singlesInSlip.some((s) => s.id === opt.id);

                    return (
                      <button
                        key={opt.id}
                        onClick={() =>
                          toggleSelection({
                            id: opt.id,
                            matchId: m.id,
                            matchTitle: `${m.homeTeam.name} v ${m.awayTeam.name}`,
                            scoreMinute: m.isLive ? `${m.homeTeam.score}-${m.awayTeam.score} ${m.minute}` : m.date,
                            marketName: '1x2',
                            selectionName: opt.label,
                            odd: opt.odd,
                            isSuspended: m.isSuspended
                          })
                        }
                        className={`p-2 rounded-xl text-center transition-all flex flex-col justify-between min-h-[50px] ${
                          isSelected
                            ? 'bg-[#1475e1] text-white font-extrabold shadow-glow-blue'
                            : 'bg-[#213743] hover:bg-[#2a4454] text-white border border-white/5'
                        }`}
                      >
                        <span className={`text-[11px] truncate font-medium ${isSelected ? 'text-white' : 'text-[#b1bad3]'}`}>
                          {label}
                        </span>
                        <div className="flex items-center justify-center gap-1">
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-white group-hover:text-[#00A3FF]'}`}>
                            {opt.odd.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
