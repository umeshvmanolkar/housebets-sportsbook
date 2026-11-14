// Official Housebets Contest Dataset — Exact Fixtures, Leagues & Markets

export const SPORTS_NAV = [
  { id: 'home', name: 'Home', icon: '🏠', count: null },
  { id: 'live', name: 'Live', icon: '📺', count: 13, hasLiveDot: true },
  { id: 'soccer', name: 'Soccer', icon: '⚽', count: 6 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', count: 3 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', count: 1 },
  { id: 'baseball', name: 'Baseball', icon: '⚾', count: 1 },
  { id: 'american-football', name: 'American Football', icon: '🏈', count: 1 },
  { id: 'esports', name: 'Esports', icon: '🎮', count: 1 },
];

export const INITIAL_FAVOURITES = [
  { id: 'fav-pl', name: 'Premier League', type: 'competition', icon: '⭐' },
  { id: 'fav-ars', name: 'Arsenal', type: 'team', icon: '🔴' }
];

export const MATCHES_DATA = [
  // Match 1: Primary Featured Live Match (Arsenal vs Brighton)
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
    isSuspended: false,
    homeTeam: {
      name: 'Arsenal',
      shortName: 'ARS',
      logo: '🔴',
      score: 1,
      isFollowed: true
    },
    awayTeam: {
      name: 'Brighton & Hove Albion',
      shortName: 'BHA',
      logo: '🔵',
      score: 0,
      isFollowed: false
    },
    matchResult: {
      home: { label: 'Arsenal', odd: 1.30, id: 'ars-bha-1' },
      draw: { label: 'Draw', odd: 4.60, id: 'ars-bha-x' },
      away: { label: 'Brighton', odd: 11.00, id: 'ars-bha-2' }
    },
    moreMarketsCount: 115,
    marketGroups: {
      popular: [
        {
          id: 'grp-match-result',
          name: 'Match result',
          options: [
            { id: 'mr-1', label: 'Arsenal', odd: 1.30 },
            { id: 'mr-x', label: 'Draw', odd: 4.60 },
            { id: 'mr-2', label: 'Brighton & Hove Albion', odd: 11.00 }
          ]
        },
        {
          id: 'grp-double-chance',
          name: 'Double chance',
          options: [
            { id: 'dc-1x', label: 'Arsenal or draw', odd: 1.03 },
            { id: 'dc-12', label: 'Arsenal or Brighton & Hove Albion', odd: 1.18 },
            { id: 'dc-x2', label: 'Draw or Brighton & Hove Albion', odd: 3.30 }
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
          name: 'Total goals (Alternative lines)',
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

  // Match 2: Aston Villa vs Fulham (Live HT 0-0)
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
    isSuspended: false,
    homeTeam: { name: 'Aston Villa', shortName: 'AVL', logo: '🦁', score: 0, isFollowed: false },
    awayTeam: { name: 'Fulham', shortName: 'FUL', logo: '⚪', score: 0, isFollowed: false },
    matchResult: {
      home: { label: 'Aston Villa', odd: 2.25, id: 'avl-ful-1' },
      draw: { label: 'Draw', odd: 2.90, id: 'avl-ful-x' },
      away: { label: 'Fulham', odd: 3.60, id: 'avl-ful-2' }
    },
    moreMarketsCount: 7
  },

  // Match 3: Newcastle United vs Everton (Live 58' 2-1, Suspended)
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
    isSuspended: true,
    homeTeam: { name: 'Newcastle United', shortName: 'NEW', logo: '🦓', score: 2, isFollowed: false },
    awayTeam: { name: 'Everton', shortName: 'EVE', logo: '🔵', score: 1, isFollowed: false },
    matchResult: {
      home: { label: 'Newcastle United', odd: 1.35, id: 'new-eve-1' },
      draw: { label: 'Draw', odd: 4.80, id: 'new-eve-x' },
      away: { label: 'Everton', odd: 8.50, id: 'new-eve-2' }
    },
    moreMarketsCount: 6
  },

  // Match 4: Atlético Madrid vs Sevilla (Live 37' 1-0, Suspended)
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
    isSuspended: true,
    homeTeam: { name: 'Atlético Madrid', shortName: 'ATM', logo: '⚪🔴', score: 1, isFollowed: false },
    awayTeam: { name: 'Sevilla', shortName: 'SEV', logo: '⚪', score: 0, isFollowed: false },
    matchResult: {
      home: { label: 'Atlético Madrid', odd: 1.28, id: 'atm-sev-1' },
      draw: { label: 'Draw', odd: 5.20, id: 'atm-sev-x' },
      away: { label: 'Sevilla', odd: 11.50, id: 'atm-sev-2' }
    },
    moreMarketsCount: 8
  },

  // Match 5: Juventus vs Roma (Live 49' 1-1)
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
    isSuspended: false,
    homeTeam: { name: 'Juventus', shortName: 'JUV', logo: '⚪⚫', score: 1, isFollowed: false },
    awayTeam: { name: 'Roma', shortName: 'ROM', logo: '🟡🔴', score: 1, isFollowed: false },
    matchResult: {
      home: { label: 'Juventus', odd: 2.40, id: 'juv-rom-1' },
      draw: { label: 'Draw', odd: 3.10, id: 'juv-rom-x' },
      away: { label: 'Roma', odd: 3.20, id: 'juv-rom-2' }
    },
    moreMarketsCount: 6
  },

  // Match 6: Liverpool vs Manchester United (Sun, Oct 18 - 16:30)
  {
    id: 'match-liv-mun',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: false,
    minute: null,
    date: 'Sun, Oct 18 · 16:30',
    isSuspended: false,
    homeTeam: { name: 'Liverpool', shortName: 'LIV', logo: '🔴', score: null, isFollowed: true },
    awayTeam: { name: 'Manchester United', shortName: 'MUN', logo: '👹', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Liverpool', odd: 1.65, id: 'liv-mun-1' },
      draw: { label: 'Draw', odd: 4.00, id: 'liv-mun-x' },
      away: { label: 'Man Utd', odd: 4.33, id: 'liv-mun-2' }
    },
    moreMarketsCount: 10
  },

  // Match 7: Arsenal vs Inter (Tue, Oct 20 - 20:00)
  {
    id: 'match-ars-int',
    sport: 'soccer',
    league: 'Champions League',
    country: 'Europe',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: 'Tue, Oct 20 · 20:00',
    isSuspended: false,
    homeTeam: { name: 'Arsenal', shortName: 'ARS', logo: '🔴', score: null, isFollowed: true },
    awayTeam: { name: 'Inter', shortName: 'INT', logo: '🔵⚫', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Arsenal', odd: 1.95, id: 'ars-int-1' },
      draw: { label: 'Draw', odd: 3.50, id: 'ars-int-x' },
      away: { label: 'Inter', odd: 4.00, id: 'ars-int-2' }
    },
    moreMarketsCount: 8
  },

  // Match 8: Real Madrid vs Bayern Munich (Tue, Oct 20 - 20:00)
  {
    id: 'match-rma-bay',
    sport: 'soccer',
    league: 'Champions League',
    country: 'Europe',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: 'Tue, Oct 20 · 20:00',
    isSuspended: false,
    homeTeam: { name: 'Real Madrid', shortName: 'RMA', logo: '⚪', score: null, isFollowed: false },
    awayTeam: { name: 'Bayern Munich', shortName: 'BAY', logo: '🔴', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Real Madrid', odd: 2.20, id: 'rma-bay-1' },
      draw: { label: 'Draw', odd: 3.70, id: 'rma-bay-x' },
      away: { label: 'Bayern', odd: 2.90, id: 'rma-bay-2' }
    },
    moreMarketsCount: 9
  },

  // Match 9: Barcelona vs Paris Saint-Germain (Wed, Oct 21 - 20:00)
  {
    id: 'match-bar-psg',
    sport: 'soccer',
    league: 'Champions League',
    country: 'Europe',
    leagueFlag: '🌍',
    isLive: false,
    minute: null,
    date: 'Wed, Oct 21 · 20:00',
    isSuspended: false,
    homeTeam: { name: 'Barcelona', shortName: 'BAR', logo: '🔴🔵', score: null, isFollowed: false },
    awayTeam: { name: 'Paris Saint-Germain', shortName: 'PSG', logo: '🔵🔴', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Barcelona', odd: 2.05, id: 'bar-psg-1' },
      draw: { label: 'Draw', odd: 3.80, id: 'bar-psg-x' },
      away: { label: 'PSG', odd: 3.30, id: 'bar-psg-2' }
    },
    moreMarketsCount: 8
  },

  // Match 10: Manchester City vs Tottenham Hotspur (Sun, Oct 18 - 14:00)
  {
    id: 'match-mci-tot',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    isLive: false,
    minute: null,
    date: 'Sun, Oct 18 · 14:00',
    isSuspended: false,
    homeTeam: { name: 'Manchester City', shortName: 'MCI', logo: '🔵', score: null, isFollowed: false },
    awayTeam: { name: 'Tottenham Hotspur', shortName: 'TOT', logo: '⚪', score: null, isFollowed: false },
    matchResult: {
      home: { label: 'Man City', odd: 1.50, id: 'mci-tot-1' },
      draw: { label: 'Draw', odd: 4.50, id: 'mci-tot-x' },
      away: { label: 'Spurs', odd: 5.25, id: 'mci-tot-2' }
    },
    moreMarketsCount: 12
  }
];

export const INITIAL_MY_BETS = {
  open: [
    {
      id: 'bet-op-1',
      placedDate: 'Oct 17 14:58',
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
      placedDate: 'Oct 16 19:30',
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
      placedDate: 'Oct 15 20:00',
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
      placedDate: 'Oct 14 18:45',
      team: 'Inter',
      match: 'Young Boys v Inter',
      statusNote: 'FT 0-1',
      isLive: false,
      odds: 1.45,
      stake: 40.00,
      returns: 58.00,
      result: 'Won'
    },
    {
      id: 'bet-st-4',
      placedDate: 'Oct 12 16:30',
      team: 'Aston Villa',
      match: 'Aston Villa v Man Utd',
      statusNote: 'FT 0-0',
      isLive: false,
      odds: 2.30,
      stake: 20.00,
      returns: 0.00,
      result: 'Lost'
    },
    {
      id: 'bet-st-5',
      placedDate: 'Oct 10 19:45',
      team: 'Bayern Munich',
      match: 'Frankfurt v Bayern Munich',
      statusNote: 'FT 3-3',
      isLive: false,
      odds: 1.55,
      stake: 35.00,
      returns: 0.00,
      result: 'Lost'
    },
    {
      id: 'bet-st-6',
      placedDate: 'Oct 08 20:00',
      team: 'Barcelona',
      match: 'Alaves v Barcelona',
      statusNote: 'FT 0-3',
      isLive: false,
      odds: 1.60,
      stake: 60.00,
      returns: 96.00,
      result: 'Won'
    },
    {
      id: 'bet-st-7',
      placedDate: 'Oct 05 17:30',
      team: 'Arsenal',
      match: 'Arsenal v Southampton',
      statusNote: 'FT 3-1',
      isLive: false,
      odds: 1.25,
      stake: 100.00,
      returns: 125.00,
      result: 'Won'
    }
  ]
};

export const FOOTBALL_LEAGUES = [
  { id: 'Premier League', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 10, isFollowed: true },
  { id: 'Champions League', name: 'Champions League', flag: '🌍', count: 4, isFollowed: false },
  { id: 'LaLiga', name: 'LaLiga', flag: '🇪🇸', count: 4, isFollowed: false },
  { id: 'Serie A', name: 'Serie A', flag: '🇮🇹', count: 3, isFollowed: false },
  { id: 'Bundesliga', name: 'Bundesliga', flag: '🇩🇪', count: 3, isFollowed: false },
];
