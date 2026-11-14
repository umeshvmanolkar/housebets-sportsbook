// Enhanced Housebets & Stake-Inspired Sportsbook Dataset

export const PROMO_CARDS = [
  {
    id: 'promo-1',
    title: 'Premier League 2-Up Payout',
    subtitle: 'Paid out early if team leads by 2 goals',
    badge: 'New',
    accent: 'from-[#0e4480] via-[#163056] to-[#1a2c38]',
    border: 'border-[#225796]/40',
    type: 'soccer',
    icon: '⚽'
  },
  {
    id: 'promo-2',
    title: 'NBA 16+ Lead Early Payout',
    subtitle: 'Paid as winner if team leads by 16+ pts',
    badge: 'Promotion',
    accent: 'from-[#1a3a78] via-[#16294d] to-[#1a2c38]',
    border: 'border-[#2c529e]/40',
    type: 'basketball',
    icon: '🏀'
  },
  {
    id: 'promo-3',
    title: 'RO-KO Special - Odds Boost',
    subtitle: '50% Odds Boost on Kohli or Rohit',
    badge: 'Promotion',
    accent: 'from-[#124b91] via-[#133560] to-[#1a2c38]',
    border: 'border-[#2162b3]/40',
    type: 'cricket',
    icon: '🏏'
  }
];

export const SPORTS_NAV = [
  { id: 'home', name: 'Sports Home', icon: '🏠', count: null },
  { id: 'live', name: 'Live Betting', icon: '🔴', count: 77, hasLiveDot: true },
  { id: 'trending', name: 'Trending', icon: '🔥', count: 18 },
  { id: 'soccer', name: 'Soccer', icon: '⚽', count: 42 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', count: 14 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', count: 19 },
  { id: 'mma', name: 'MMA', icon: '🥊', count: 8 },
  { id: 'cricket', name: 'Cricket', icon: '🏏', count: 6 },
  { id: 'esports', name: 'CS2', icon: '🎮', count: 11 },
];

export const INITIAL_FAVOURITES = [
  { id: 'fav-pl', name: 'Premier League', type: 'competition', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'fav-ars', name: 'Arsenal', type: 'team', icon: '🔴' },
  { id: 'fav-ucl', name: 'Champions League', type: 'competition', icon: '🌍' }
];

export const MATCHES_DATA = [
  // Match 1: Arsenal vs Brighton (Primary Live Match)
  {
    id: 'match-ars-bha',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: true,
    minute: "52'",
    period: '2nd Half',
    date: 'Live Now',
    bettorVolume: '29,555',
    bettorSentiment: '97% of 1x2 bets on Arsenal',
    isSuspended: false,
    homeTeam: {
      name: 'Arsenal',
      shortName: 'ARS',
      score: 1,
      isFollowed: true
    },
    awayTeam: {
      name: 'Brighton & Hove Albion',
      shortName: 'BHA',
      score: 0,
      isFollowed: false
    },
    matchResult: {
      home: { label: 'Arsenal', odd: 1.30, id: 'ars-bha-1' },
      draw: { label: 'Draw', odd: 4.60, id: 'ars-bha-x' },
      away: { label: 'Brighton', odd: 11.00, id: 'ars-bha-2' }
    },
    winProbability: { home: 76, draw: 14, away: 10 },
    moreMarketsCount: 115,
    marketGroups: {
      popular: [
        {
          id: 'grp-match-result',
          name: '1x2 (Full Time)',
          options: [
            { id: 'mr-1', label: 'Arsenal', odd: 1.30 },
            { id: 'mr-x', label: 'Draw', odd: 4.60 },
            { id: 'mr-2', label: 'Brighton & Hove Albion', odd: 11.00 }
          ]
        },
        {
          id: 'grp-draw-no-bet',
          name: 'Draw No Bet',
          options: [
            { id: 'dnb-1', label: 'Arsenal', odd: 1.09 },
            { id: 'dnb-2', label: 'Brighton', odd: 6.00 }
          ]
        },
        {
          id: 'grp-double-chance',
          name: 'Double chance',
          options: [
            { id: 'dc-1x', label: 'Arsenal or draw', odd: 1.03 },
            { id: 'dc-12', label: 'Arsenal or Brighton', odd: 1.18 },
            { id: 'dc-x2', label: 'Draw or Brighton', odd: 3.30 }
          ]
        },
        {
          id: 'grp-total-goals',
          name: 'Total goals',
          options: [
            { id: 'tg-o25', label: 'Over 2.5', odd: 2.73 },
            { id: 'tg-u25', label: 'Under 2.5', odd: 1.44 }
          ]
        },
        {
          id: 'grp-btts',
          name: 'Both teams to score',
          options: [
            { id: 'btts-y', label: 'Yes', odd: 2.10 },
            { id: 'btts-n', label: 'No', odd: 1.68 }
          ]
        }
      ],
      goals: [
        {
          id: 'grp-next-goal',
          name: 'Next goal (Goal 2)',
          options: [
            { id: 'ng-1', label: 'Arsenal', odd: 1.75 },
            { id: 'ng-none', label: 'No goal', odd: 2.85 },
            { id: 'ng-2', label: 'Brighton', odd: 4.50 }
          ]
        },
        {
          id: 'grp-total-goals-alt',
          name: 'Alternative total goals',
          options: [
            { id: 'tg-o15', label: 'Over 1.5', odd: 1.40 },
            { id: 'tg-u15', label: 'Under 1.5', odd: 2.75 },
            { id: 'tg-o35', label: 'Over 3.5', odd: 5.20 },
            { id: 'tg-u35', label: 'Under 3.5', odd: 1.12 }
          ]
        }
      ],
      halves: [
        {
          id: 'grp-2nd-half-result',
          name: '2nd half result',
          options: [
            { id: '2h-1', label: 'Arsenal', odd: 1.85 },
            { id: '2h-x', label: 'Draw', odd: 2.60 },
            { id: '2h-2', label: 'Brighton', odd: 6.00 }
          ]
        }
      ],
      handicaps: [
        {
          id: 'grp-asian-handicap',
          name: 'Asian handicap',
          options: [
            { id: 'ah-1', label: 'Arsenal (-1.5)', odd: 2.05 },
            { id: 'ah-2', label: 'Brighton (+1.5)', odd: 1.75 }
          ]
        }
      ],
      goalscorers: [
        {
          id: 'grp-anytime-goalscorer',
          name: 'Anytime goalscorer',
          options: [
            { id: 'gs-saka', label: 'Bukayo Saka', odd: 2.30 },
            { id: 'gs-havertz', label: 'Kai Havertz', odd: 2.65 },
            { id: 'gs-pedro', label: 'Joao Pedro', odd: 4.80 }
          ]
        }
      ],
      cornersCards: [
        {
          id: 'grp-total-corners',
          name: 'Total corners',
          options: [
            { id: 'corn-o85', label: 'Over 8.5', odd: 1.90 },
            { id: 'corn-u85', label: 'Under 8.5', odd: 1.90 }
          ]
        }
      ]
    }
  },

  // Match 2: Norway vs Wales (Direct from Stake Reference Screenshot!)
  {
    id: 'match-nor-wal',
    sport: 'soccer',
    league: 'UEFA Nations League',
    country: 'International',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: '14 Nov | 22:30',
    kickoffBadge: '2h',
    bettorVolume: '31,022',
    bettorSentiment: '97% of 1x2 bets on Norway',
    isSuspended: false,
    homeTeam: { name: 'Norway', shortName: 'NOR', score: null, isFollowed: true },
    awayTeam: { name: 'Wales', shortName: 'WAL', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Norway', odd: 1.27, id: 'nor-wal-1' },
      draw: { label: 'Draw', odd: 6.20, id: 'nor-wal-x' },
      away: { label: 'Wales', odd: 8.40, id: 'nor-wal-2' }
    },
    winProbability: { home: 76, draw: 14, away: 10 },
    moreMarketsCount: 88
  },

  // Match 3: Portugal vs Denmark (From Stake Reference Screenshot!)
  {
    id: 'match-por-den',
    sport: 'soccer',
    league: 'UEFA Nations League',
    country: 'International',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: '14 Nov | 22:30',
    kickoffBadge: '5h',
    bettorVolume: '28,094',
    bettorSentiment: '97% of 1x2 bets on Portugal',
    isSuspended: false,
    homeTeam: { name: 'Portugal', shortName: 'POR', score: null, isFollowed: false },
    awayTeam: { name: 'Denmark', shortName: 'DEN', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Portugal', odd: 1.57, id: 'por-den-1' },
      draw: { label: 'Draw', odd: 4.30, id: 'por-den-x' },
      away: { label: 'Denmark', odd: 4.90, id: 'por-den-2' }
    },
    winProbability: { home: 65, draw: 22, away: 13 },
    moreMarketsCount: 64
  },

  // Match 4: Sweden vs Bosnia and Herzegovina (From Stake Reference Screenshot!)
  {
    id: 'match-swe-bih',
    sport: 'soccer',
    league: 'UEFA Nations League',
    country: 'International',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: '14 Nov | 22:30',
    kickoffBadge: '5h',
    bettorVolume: '24,152',
    bettorSentiment: '95% of 1x2 bets on Sweden',
    isSuspended: false,
    homeTeam: { name: 'Sweden', shortName: 'SWE', score: null, isFollowed: false },
    awayTeam: { name: 'Bosnia and Herzegovina', shortName: 'BIH', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Sweden', odd: 1.39, id: 'swe-bih-1' },
      draw: { label: 'Draw', odd: 4.50, id: 'swe-bih-x' },
      away: { label: 'Bosnia and ...', odd: 6.80, id: 'swe-bih-2' }
    },
    winProbability: { home: 71, draw: 19, away: 10 },
    moreMarketsCount: 52
  },

  // Match 5: Liverpool vs Manchester United
  {
    id: 'match-liv-mun',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: false,
    minute: null,
    date: 'Sun, Oct 18 | 16:30',
    bettorVolume: '41,200',
    bettorSentiment: '88% of 1x2 bets on Liverpool',
    isSuspended: false,
    homeTeam: { name: 'Liverpool', shortName: 'LIV', score: null, isFollowed: true },
    awayTeam: { name: 'Manchester United', shortName: 'MUN', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Liverpool', odd: 1.65, id: 'liv-mun-1' },
      draw: { label: 'Draw', odd: 4.00, id: 'liv-mun-x' },
      away: { label: 'Man Utd', odd: 4.33, id: 'liv-mun-2' }
    },
    winProbability: { home: 58, draw: 24, away: 18 },
    moreMarketsCount: 94
  },

  // Match 6: Real Madrid vs Bayern Munich
  {
    id: 'match-rma-bay',
    sport: 'soccer',
    league: 'Champions League',
    country: 'Europe',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: 'Tue, Oct 20 | 20:00',
    bettorVolume: '38,150',
    bettorSentiment: '54% of 1x2 bets on Real Madrid',
    isSuspended: false,
    homeTeam: { name: 'Real Madrid', shortName: 'RMA', score: null, isFollowed: false },
    awayTeam: { name: 'Bayern Munich', shortName: 'BAY', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Real Madrid', odd: 2.20, id: 'rma-bay-1' },
      draw: { label: 'Draw', odd: 3.70, id: 'rma-bay-x' },
      away: { label: 'Bayern', odd: 2.90, id: 'rma-bay-2' }
    },
    winProbability: { home: 44, draw: 27, away: 29 },
    moreMarketsCount: 104
  },

  // Match 7: Manchester City vs Tottenham Hotspur
  {
    id: 'match-mci-tot',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: false,
    minute: null,
    date: 'Sun, Oct 18 | 14:00',
    bettorVolume: '33,900',
    bettorSentiment: '91% of 1x2 bets on Man City',
    isSuspended: false,
    homeTeam: { name: 'Manchester City', shortName: 'MCI', score: null, isFollowed: false },
    awayTeam: { name: 'Tottenham Hotspur', shortName: 'TOT', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Man City', odd: 1.50, id: 'mci-tot-1' },
      draw: { label: 'Draw', odd: 4.50, id: 'mci-tot-x' },
      away: { label: 'Spurs', odd: 5.25, id: 'mci-tot-2' }
    },
    winProbability: { home: 64, draw: 22, away: 14 },
    moreMarketsCount: 78
  },

  // Match 8: Aston Villa vs Fulham (Live HT 0-0)
  {
    id: 'match-avl-ful',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: true,
    minute: 'HT',
    period: 'Half Time',
    date: 'Live Now',
    bettorVolume: '14,200',
    bettorSentiment: '62% of 1x2 bets on Aston Villa',
    isSuspended: false,
    homeTeam: { name: 'Aston Villa', shortName: 'AVL', score: 0, isFollowed: false },
    awayTeam: { name: 'Fulham', shortName: 'FUL', score: 0, isFollowed: false },
    matchResult: {
      home: { label: 'Aston Villa', odd: 2.25, id: 'avl-ful-1' },
      draw: { label: 'Draw', odd: 2.90, id: 'avl-ful-x' },
      away: { label: 'Fulham', odd: 3.60, id: 'avl-ful-2' }
    },
    winProbability: { home: 42, draw: 35, away: 23 },
    moreMarketsCount: 42
  },

  // Match 9: Newcastle United vs Everton (Live 58' 2-1, Suspended)
  {
    id: 'match-new-eve',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: true,
    minute: "58'",
    period: '2nd Half',
    date: 'Live Now',
    bettorVolume: '18,700',
    bettorSentiment: '84% of 1x2 bets on Newcastle',
    isSuspended: true,
    homeTeam: { name: 'Newcastle United', shortName: 'NEW', score: 2, isFollowed: false },
    awayTeam: { name: 'Everton', shortName: 'EVE', score: 1, isFollowed: false },
    matchResult: {
      home: { label: 'Newcastle United', odd: 1.35, id: 'new-eve-1' },
      draw: { label: 'Draw', odd: 4.80, id: 'new-eve-x' },
      away: { label: 'Everton', odd: 8.50, id: 'new-eve-2' }
    },
    winProbability: { home: 78, draw: 15, away: 7 },
    moreMarketsCount: 36
  },

  // Match 10: Atlético Madrid vs Sevilla (LaLiga, Live 37' 1-0, Suspended - matching screenshot)
  {
    id: 'match-atm-sev',
    sport: 'soccer',
    league: 'LaLiga',
    country: 'Spain',
    leagueFlag: '🇪🇸',
    isLive: true,
    minute: "37'",
    period: '1st Half',
    date: 'Live Now',
    bettorVolume: '22,400',
    bettorSentiment: '78% of 1x2 bets on Atlético',
    isSuspended: true,
    homeTeam: { name: 'Atlético Madrid', shortName: 'ATM', score: 1, isFollowed: false },
    awayTeam: { name: 'Sevilla', shortName: 'SEV', score: 0, isFollowed: false },
    matchResult: {
      home: { label: 'Atlético Madrid', odd: 1.45, id: 'atm-sev-1' },
      draw: { label: 'Draw', odd: 4.10, id: 'atm-sev-x' },
      away: { label: 'Sevilla', odd: 7.50, id: 'atm-sev-2' }
    },
    winProbability: { home: 72, draw: 18, away: 10 },
    moreMarketsCount: 8
  },

  // Match 11: Juventus vs Roma (Serie A, Live 49' 1-1, 2.40 / 3.10 / 3.20 - matching screenshot)
  {
    id: 'match-juv-rom',
    sport: 'soccer',
    league: 'Serie A',
    country: 'Italy',
    leagueFlag: '🇮🇹',
    isLive: true,
    minute: "49'",
    period: '2nd Half',
    date: 'Live Now',
    bettorVolume: '19,800',
    bettorSentiment: '65% of 1x2 bets on Juventus',
    isSuspended: false,
    homeTeam: { name: 'Juventus', shortName: 'JUV', score: 1, isFollowed: false },
    awayTeam: { name: 'Roma', shortName: 'ROM', score: 1, isFollowed: false },
    matchResult: {
      home: { label: 'Juventus', odd: 2.40, id: 'juv-rom-1' },
      draw: { label: 'Draw', odd: 3.10, id: 'juv-rom-x' },
      away: { label: 'Roma', odd: 3.20, id: 'juv-rom-2' }
    },
    winProbability: { home: 44, draw: 32, away: 24 },
    moreMarketsCount: 6
  },

  // Match 12: Bayer Leverkusen vs Borussia Dortmund (Bundesliga, Live 64' 2-1 - matching screenshot)
  {
    id: 'match-b04-bvb',
    sport: 'soccer',
    league: 'Bundesliga',
    country: 'Germany',
    leagueFlag: '🇩🇪',
    isLive: true,
    minute: "64'",
    period: '2nd Half',
    date: 'Live Now',
    bettorVolume: '26,100',
    bettorSentiment: '71% of 1x2 bets on Leverkusen',
    isSuspended: false,
    homeTeam: { name: 'Bayer Leverkusen', shortName: 'B04', score: 2, isFollowed: false },
    awayTeam: { name: 'Borussia Dortmund', shortName: 'BVB', score: 1, isFollowed: false },
    matchResult: {
      home: { label: 'Leverkusen', odd: 1.85, id: 'b04-bvb-1' },
      draw: { label: 'Draw', odd: 3.70, id: 'b04-bvb-x' },
      away: { label: 'Dortmund', odd: 4.10, id: 'b04-bvb-2' }
    },
    winProbability: { home: 60, draw: 24, away: 16 },
    moreMarketsCount: 9
  }
];

export const INITIAL_MY_BETS = {
  open: [
    {
      id: 'bet-op-1',
      placedDate: '14 Nov 14:58',
      team: 'Arsenal',
      match: 'Arsenal v Brighton & Hove Albion',
      statusNote: '52\' 1-0',
      isLive: true,
      odds: 1.80,
      stake: 20.00,
      returns: 36.00,
      cashoutAmount: 28.50,
      result: 'Open'
    }
  ],
  settled: [
    {
      id: 'bet-st-1',
      placedDate: '13 Nov 19:30',
      team: 'Liverpool',
      match: 'Liverpool v Chelsea',
      statusNote: 'FT 2-1',
      isLive: false,
      odds: 1.70,
      stake: 50.00,
      returns: 85.00,
      result: 'Won'
    },
    {
      id: 'bet-st-2',
      placedDate: '12 Nov 20:00',
      team: 'Real Madrid',
      match: 'Real Madrid v Dortmund',
      statusNote: 'FT 3-1',
      isLive: false,
      odds: 1.95,
      stake: 25.00,
      returns: 48.75,
      result: 'Won'
    },
    {
      id: 'bet-st-3',
      placedDate: '11 Nov 16:30',
      team: 'Aston Villa',
      match: 'Aston Villa v Man Utd',
      statusNote: 'FT 0-0',
      isLive: false,
      odds: 2.30,
      stake: 20.00,
      returns: 0.00,
      result: 'Lost'
    }
  ]
};

export const FOOTBALL_LEAGUES = [
  { id: 'Premier League', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 10, isFollowed: true },
  { id: 'Champions League', name: 'Champions League', flag: '🌍', count: 6, isFollowed: true },
  { id: 'UEFA Nations League', name: 'UEFA Nations League', flag: '🌍', count: 8, isFollowed: false },
  { id: 'LaLiga', name: 'LaLiga', flag: '🇪🇸', count: 4, isFollowed: false },
  { id: 'Serie A', name: 'Serie A', flag: '🇮🇹', count: 3, isFollowed: false },
  { id: 'Bundesliga', name: 'Bundesliga', flag: '🇩🇪', count: 3, isFollowed: false }
];
