import React from 'react';
import { 
  Search, 
  Home, 
  Video, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  X, 
  Check 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MATCHES_DATA } from '../data/mockData';
import { TeamCrest } from '../components/Logos';

export const SportsHome = () => {
  const {
    setCurrentPage,
    setSelectedMatchId,
    searchQuery,
    setSearchQuery,
    favourites,
    toggleFollow,
    singlesInSlip,
    toggleSelection,
    playClick
  } = useSportsbook();

  // Primary matches for "Your matches" (from starter screenshot)
  const yourMatches = [
    MATCHES_DATA[0], // Arsenal vs Brighton (Live 52', 1-0)
    MATCHES_DATA[4], // Liverpool vs Manchester United (16:30 Sun, Oct 18)
    MATCHES_DATA[6], // Arsenal vs Inter (20:00 Tue, Oct 20)
  ];

  // Carousel matches for "Featured matches" (from starter screenshot)
  const featuredMatches = [
    MATCHES_DATA[0], // Premier League: Arsenal vs Brighton (LIVE 52', 1-0)
    MATCHES_DATA[4], // Premier League: Liverpool vs Man Utd (Sun, Oct 18 - 16:30)
    MATCHES_DATA[5], // Champions League: Real Madrid vs Bayern (Tue, Oct 20 - 20:00)
    {
      id: 'match-mci-tot',
      sport: 'soccer',
      league: 'Premier League',
      country: 'England',
      isLive: false,
      date: 'Sun, Oct 18 · 14:00',
      homeTeam: { name: 'Manchester City', shortName: 'MCI', score: null },
      awayTeam: { name: 'Tottenham Hotspur', shortName: 'TOT', score: null },
      matchResult: {
        home: { label: 'Man City', odd: 1.50, id: 'mci-tot-1' },
        draw: { label: 'Draw', odd: 4.50, id: 'mci-tot-x' },
        away: { label: 'Spurs', odd: 5.25, id: 'mci-tot-2' }
      }
    }
  ];

  // Upcoming matches (from starter screenshot)
  const upcomingMatches = [
    {
      id: 'match-nap-mil',
      league: 'Serie A',
      date: '17:00 Sun, Oct 18',
      homeTeam: { name: 'Napoli', shortName: 'NAP' },
      awayTeam: { name: 'AC Milan', shortName: 'MIL' },
      matchResult: {
        home: { label: 'Napoli', odd: 2.15, id: 'nap-mil-1' },
        draw: { label: 'Draw', odd: 3.30, id: 'nap-mil-x' },
        away: { label: 'Milan', odd: 3.40, id: 'nap-mil-2' }
      },
      moreMarketsCount: 88
    }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-16 md:pb-6 max-w-7xl mx-auto">
      {/* 1. Search Bar (Exact Housebets Input matching screenshot) */}
      <div className="relative">
        <div className="flex items-center gap-3 bg-[#0d222e] border border-[#16374a] rounded-2xl px-4 py-3 shadow-sm">
          <Search className="w-4 h-4 text-[#4e6d7e] flex-shrink-0" />
          <input
            id="main-sports-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, players or leagues"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-[#4e6d7e] focus:outline-none"
          />
        </div>
      </div>

      {/* 2. Sports Navigation Pill Bar (Exact Housebets screenshot) */}
      <div className="bg-[#0d222e] border border-[#16374a] rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {/* Home (Active Cyan Pill) */}
        <button
          onClick={() => { playClick(); setCurrentPage('home'); }}
          className="px-3.5 py-1.5 rounded-xl bg-[#08333e] border border-[#00e5ff]/25 text-[#00F5D4] font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {/* Live 13 */}
        <button
          onClick={() => { playClick(); setCurrentPage('live'); }}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <Video className="w-3.5 h-3.5 text-[#ff3366]" />
          <span>Live</span>
          <span className="text-[#ff3366] font-bold font-mono">13</span>
        </button>

        {/* Soccer */}
        <button
          onClick={() => { playClick(); setCurrentPage('football'); }}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>⚽</span>
          <span>Soccer</span>
        </button>

        {/* Tennis */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🎾</span>
          <span>Tennis</span>
        </button>

        {/* Basketball */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🏀</span>
          <span>Basketball</span>
        </button>

        {/* Baseball */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>⚾</span>
          <span>Baseball</span>
        </button>

        {/* American Football */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🏈</span>
          <span>American Football</span>
        </button>

        {/* Esports */}
        <button
          onClick={playClick}
          className="px-3.5 py-1.5 rounded-xl text-[#8aa6b5] hover:text-white hover:bg-white/5 font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>🎮</span>
          <span>Esports</span>
        </button>
      </div>

      {/* 3. Favourites Section (Exact Housebets screenshot) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-bold text-[#8aa6b5] block px-0.5">Favourites</span>
        <div className="flex flex-wrap items-center gap-2">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0d222e] border border-[#16374a] text-xs font-semibold text-white shadow-sm"
            >
              <span className="text-amber-400">★</span>
              {fav.name.toLowerCase().includes('arsenal') ? (
                <TeamCrest teamName="Arsenal" className="w-3.5 h-3.5 inline-block" />
              ) : null}
              <span>{fav.name}</span>
              <button
                onClick={() => toggleFollow(fav)}
                className="text-[#557788] hover:text-white p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Your Matches Section (Exact Housebets screenshot) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-white">Your matches</h2>
            <span className="text-[10px] text-[#557788] font-mono">3 matches</span>
          </div>
          <span className="text-[11px] text-[#8aa6b5] font-medium">Match result</span>
        </div>

        <div className="space-y-2">
          {yourMatches.map((m) => {
            return (
              <div
                key={m.id}
                className="p-3 sm:p-4 rounded-2xl bg-[#0d222e] border border-[#16374a] hover:border-[#1f4a63] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm"
              >
                {/* Match meta + teams */}
                <div 
                  onClick={() => {
                    playClick();
                    setSelectedMatchId(m.id);
                    setCurrentPage('match');
                  }}
                  className="flex-1 cursor-pointer flex items-center justify-between md:justify-start gap-4"
                >
                  <div className="w-16 flex-shrink-0">
                    {m.isLive ? (
                      <div className="space-y-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[10px]">
                          LIVE
                        </span>
                        <div className="text-[11px] text-gray-400 font-mono font-medium">{m.minute}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs font-mono font-bold text-white">{m.date.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-400">{m.date.split(' ').slice(1).join(' ')}</div>
                      </div>
                    )}
                  </div>

                  {/* Teams and Crests */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-white hover:text-[#00F5D4] transition-colors truncate">
                        {m.homeTeam.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-white hover:text-[#00F5D4] transition-colors truncate">
                        {m.awayTeam.name}
                      </span>
                    </div>
                  </div>

                  {/* Live Scores */}
                  {m.isLive && (
                    <div className="flex flex-col items-end justify-center gap-2 pr-3 font-mono text-sm font-black text-white">
                      <span>{m.homeTeam.score}</span>
                      <span>{m.awayTeam.score}</span>
                    </div>
                  )}
                </div>

                {/* Match Result Odds Chips (Single Betting) */}
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-1 md:w-[320px]">
                    {[
                      { label: m.homeTeam.shortName || m.homeTeam.name.split(' ')[0], opt: m.matchResult.home },
                      { label: 'Draw', opt: m.matchResult.draw },
                      { label: m.awayTeam.shortName || m.awayTeam.name.split(' ')[0], opt: m.matchResult.away }
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
                              marketName: 'Match result',
                              selectionName: opt.label,
                              odd: opt.odd,
                              isSuspended: m.isSuspended
                            })
                          }
                          className={`px-3 py-2 rounded-xl text-center transition-all flex flex-col items-center justify-center min-h-[46px] border ${
                            isSelected
                              ? 'bg-[#1475e1] border-[#1475e1] text-white font-extrabold shadow-sm'
                              : 'bg-[#102a38] hover:bg-[#163547] text-white border-[#1b3d4f]'
                          }`}
                        >
                          <span className="text-[10px] text-[#8aa6b5] truncate max-w-full font-medium">
                            {label}
                          </span>
                          <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-[#00F5D4]'}`}>
                            {opt.odd.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* More Markets Link */}
                  <button
                    onClick={() => {
                      playClick();
                      setSelectedMatchId(m.id);
                      setCurrentPage('match');
                    }}
                    className="px-2 py-2 rounded-xl bg-transparent hover:bg-white/5 text-[11px] font-mono text-[#8aa6b5] hover:text-white transition-colors"
                  >
                    +{m.moreMarketsCount} &gt;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Featured Matches Section (Exact Housebets screenshot) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold text-white">Featured matches</h2>
          <div className="flex items-center gap-1 text-[#8aa6b5]">
            <button className="p-1 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuredMatches.map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-2xl bg-[#0d222e] border border-[#16374a] hover:border-[#1f4a63] transition-all space-y-2.5 flex flex-col justify-between shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-[11px] text-[#8aa6b5]">
                <span>{m.league}</span>
                {m.isLive ? (
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-[#f43f5e] font-mono font-bold text-[9px]">
                    LIVE {m.minute}
                  </span>
                ) : (
                  <span className="font-mono text-[10px]">{m.date}</span>
                )}
              </div>

              {/* Match Teams */}
              <div 
                onClick={() => {
                  playClick();
                  setSelectedMatchId(m.id);
                  setCurrentPage('match');
                }}
                className="space-y-1.5 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <TeamCrest teamName={m.homeTeam.name} className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{m.homeTeam.name}</span>
                  </div>
                  {m.isLive && <span className="font-mono">{m.homeTeam.score}</span>}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <TeamCrest teamName={m.awayTeam.name} className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{m.awayTeam.name}</span>
                  </div>
                  {m.isLive && <span className="font-mono">{m.awayTeam.score}</span>}
                </div>
              </div>

              {/* 3 Odds chips */}
              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
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
                          marketName: 'Match result',
                          selectionName: opt.label,
                          odd: opt.odd,
                          isSuspended: m.isSuspended
                        })
                      }
                      className={`p-1.5 rounded-xl text-center text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#1475e1] text-white font-black border-[#1475e1]'
                          : 'bg-[#102a38] text-white border-[#1b3d4f] hover:bg-[#163547]'
                      }`}
                    >
                      <span className="text-[9px] text-[#8aa6b5] block truncate">{label}</span>
                      <strong className={`font-mono text-xs ${isSelected ? 'text-white' : 'text-[#00F5D4]'}`}>
                        {opt.odd.toFixed(2)}
                      </strong>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
