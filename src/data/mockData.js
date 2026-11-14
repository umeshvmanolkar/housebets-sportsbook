export const SPORTS_CATEGORIES = [
  { id: 'soccer', name: 'Soccer', icon: '⚽', activeCount: 84 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', activeCount: 42 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', activeCount: 29 },
  { id: 'esports', name: 'Esports', icon: '🎮', activeCount: 37 },
  { id: 'mma', name: 'MMA / UFC', icon: '🥊', activeCount: 14 },
  { id: 'american-football', name: 'Football', icon: '🏈', activeCount: 19 },
  { id: 'baseball', name: 'Baseball', icon: '⚾', activeCount: 11 },
  { id: 'ice-hockey', name: 'Ice Hockey', icon: '🏒', activeCount: 23 },
];

export const CRYPTO_WALLETS = [
  { symbol: 'USDT', name: 'Tether USD', balance: 4820.50, icon: '💵', rate: 1.0 },
  { symbol: 'SOL', name: 'Solana', balance: 34.82, icon: '🟣', rate: 145.20 },
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.145, icon: '₿', rate: 91400.0 },
  { symbol: 'ETH', name: 'Ethereum', balance: 1.84, icon: '🔷', rate: 3120.0 },
];

export const LIVE_MATCHES = [
  {
    id: 'match-1',
    sport: 'soccer',
    league: 'Premier League',
    country: 'England',
    isLive: true,
    minute: "72'",
    period: '2nd Half',
    homeTeam: {
      name: 'Arsenal',
      shortName: 'ARS',
      logo: '🔴',
      score: 2,
      rank: '1st',
      form: ['W', 'W', 'W', 'D', 'W']
    },
    awayTeam: {
      name: 'Manchester City',
      shortName: 'MCI',
      logo: '🔵',
      score: 1,
      rank: '2nd',
      form: ['W', 'L', 'W', 'W', 'D']
    },
    stats: {
      possession: [54, 46],
      shotsOnTarget: [7, 5],
      totalShots: [14, 11],
      corners: [6, 4],
      yellowCards: [2, 3],
      dangerousAttacks: [48, 41]
    },
    liveEvent: 'Arsenal attacking down the right flank — Saka cuts inside!',
    radarCoords: { x: 74, y: 38, action: 'Dangerous Attack', team: 'home' },
    markets: {
      matchWinner: [
        { id: 'mw-1-1', label: 'Arsenal', odd: 1.48, trend: 'up' },
        { id: 'mw-1-x', label: 'Draw', odd: 3.85, trend: 'down' },
        { id: 'mw-1-2', label: 'Man City', odd: 6.20, trend: 'down' }
      ],
      btts: [
        { id: 'btts-1-y', label: 'Yes', odd: 1.32, trend: 'none' },
        { id: 'btts-1-n', label: 'No', odd: 3.10, trend: 'up' }
      ],
      totalGoals: [
        { id: 'tg-1-o35', label: 'Over 3.5', odd: 1.82, trend: 'up' },
        { id: 'tg-1-u35', label: 'Under 3.5', odd: 1.95, trend: 'down' }
      ],
      nextGoal: [
        { id: 'ng-1-1', label: 'Arsenal', odd: 2.10, trend: 'up' },
        { id: 'ng-1-none', label: 'No More Goals', odd: 2.80, trend: 'none' },
        { id: 'ng-1-2', label: 'Man City', odd: 2.65, trend: 'down' }
      ],
      handicap: [
        { id: 'ah-1-1', label: 'Arsenal (-0.5)', odd: 1.52, trend: 'up' },
        { id: 'ah-1-2', label: 'Man City (+0.5)', odd: 2.44, trend: 'down' }
      ]
    }
  },
  {
    id: 'match-2',
    sport: 'soccer',
    league: 'UEFA Champions League',
    country: 'Europe',
    isLive: true,
    minute: "38'",
    period: '1st Half',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: '⚪',
      score: 1,
      rank: 'Group A',
      form: ['W', 'W', 'W', 'W', 'W']
    },
    awayTeam: {
      name: 'Bayern Munich',
      shortName: 'BAY',
      logo: '🔴',
      score: 1,
      rank: 'Group A',
      form: ['W', 'W', 'D', 'W', 'W']
    },
    stats: {
      possession: [51, 49],
      shotsOnTarget: [4, 4],
      totalShots: [9, 8],
      corners: [3, 5],
      yellowCards: [1, 1],
      dangerousAttacks: [36, 39]
    },
    liveEvent: 'Kane header hits the crossbar!',
    radarCoords: { x: 88, y: 52, action: 'Shot on Target', team: 'away' },
    markets: {
      matchWinner: [
        { id: 'mw-2-1', label: 'Real Madrid', odd: 2.15, trend: 'down' },
        { id: 'mw-2-x', label: 'Draw', odd: 3.25, trend: 'none' },
        { id: 'mw-2-2', label: 'Bayern', odd: 3.40, trend: 'up' }
      ],
      btts: [
        { id: 'btts-2-y', label: 'Yes', odd: 1.15, trend: 'none' },
        { id: 'btts-2-n', label: 'No', odd: 4.80, trend: 'down' }
      ],
      totalGoals: [
        { id: 'tg-2-o25', label: 'Over 2.5', odd: 1.44, trend: 'up' },
        { id: 'tg-2-u25', label: 'Under 2.5', odd: 2.65, trend: 'down' }
      ],
      nextGoal: [
        { id: 'ng-2-1', label: 'Real Madrid', odd: 1.95, trend: 'none' },
        { id: 'ng-2-none', label: 'No More Goals', odd: 7.50, trend: 'down' },
        { id: 'ng-2-2', label: 'Bayern', odd: 2.25, trend: 'up' }
      ],
      handicap: [
        { id: 'ah-2-1', label: 'Real Madrid (0.0)', odd: 1.70, trend: 'none' },
        { id: 'ah-2-2', label: 'Bayern (0.0)', odd: 2.10, trend: 'none' }
      ]
    }
  },
  {
    id: 'match-3',
    sport: 'basketball',
    league: 'NBA',
    country: 'USA',
    isLive: true,
    minute: "Q3 04:12",
    period: 'Quarter 3',
    homeTeam: {
      name: 'Boston Celtics',
      shortName: 'BOS',
      logo: '🍀',
      score: 78,
      rank: '1st East',
      form: ['W', 'W', 'W', 'L', 'W']
    },
    awayTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: '👑',
      score: 72,
      rank: '4th West',
      form: ['L', 'W', 'W', 'W', 'L']
    },
    stats: {
      possession: [50, 50],
      shotsOnTarget: [32, 29],
      totalShots: [64, 58],
      corners: [0, 0],
      yellowCards: [0, 0],
      dangerousAttacks: [55, 52]
    },
    liveEvent: 'Tatum step-back three-pointer is GOOD!',
    radarCoords: { x: 75, y: 50, action: '3-Point Field Goal', team: 'home' },
    markets: {
      matchWinner: [
        { id: 'mw-3-1', label: 'Celtics', odd: 1.36, trend: 'up' },
        { id: 'mw-3-2', label: 'Lakers', odd: 3.15, trend: 'down' }
      ],
      totalGoals: [
        { id: 'tg-3-o218', label: 'Over 218.5', odd: 1.88, trend: 'down' },
        { id: 'tg-3-u218', label: 'Under 218.5', odd: 1.92, trend: 'up' }
      ],
      handicap: [
        { id: 'ah-3-1', label: 'Celtics (-5.5)', odd: 1.90, trend: 'none' },
        { id: 'ah-3-2', label: 'Lakers (+5.5)', odd: 1.90, trend: 'none' }
      ]
    }
  },
  {
    id: 'match-4',
    sport: 'esports',
    league: 'Blast Premier CS2',
    country: 'Global',
    isLive: true,
    minute: "Map 2 (11-9)",
    period: 'Mirage',
    homeTeam: {
      name: 'Natus Vincere',
      shortName: 'NAVI',
      logo: '🟡',
      score: 1,
      rank: '#1 World',
      form: ['W', 'W', 'W', 'W', 'W']
    },
    awayTeam: {
      name: 'FaZe Clan',
      shortName: 'FAZE',
      logo: '🔴',
      score: 0,
      rank: '#3 World',
      form: ['W', 'L', 'W', 'W', 'L']
    },
    stats: {
      possession: [55, 45],
      shotsOnTarget: [42, 38],
      totalShots: [75, 68],
      corners: [0, 0],
      yellowCards: [0, 0],
      dangerousAttacks: [24, 21]
    },
    liveEvent: 'b1t clutches a 1v2 on A site retake!',
    radarCoords: { x: 80, y: 45, action: 'Bomb Plant Defused', team: 'home' },
    markets: {
      matchWinner: [
        { id: 'mw-4-1', label: 'NAVI', odd: 1.25, trend: 'up' },
        { id: 'mw-4-2', label: 'FaZe', odd: 3.75, trend: 'down' }
      ],
      totalGoals: [
        { id: 'tg-4-o26', label: 'Over 26.5 Rounds', odd: 1.75, trend: 'up' },
        { id: 'tg-4-u26', label: 'Under 26.5 Rounds', odd: 2.05, trend: 'down' }
      ]
    }
  }
];

export const UPCOMING_FIXTURES = [
  {
    id: 'up-1',
    sport: 'soccer',
    league: 'Premier League',
    date: 'Today, 20:45',
    homeTeam: { name: 'Liverpool', shortName: 'LIV', logo: '🔴' },
    awayTeam: { name: 'Chelsea', shortName: 'CHE', logo: '🔵' },
    odds: { home: 1.62, draw: 4.10, away: 5.25 }
  },
  {
    id: 'up-2',
    sport: 'soccer',
    league: 'La Liga',
    date: 'Tomorrow, 21:00',
    homeTeam: { name: 'Barcelona', shortName: 'BAR', logo: '🔴🔵' },
    awayTeam: { name: 'Atletico Madrid', shortName: 'ATM', logo: '⚪🔴' },
    odds: { home: 1.95, draw: 3.45, away: 3.80 }
  },
  {
    id: 'up-3',
    sport: 'mma',
    league: 'UFC 312',
    date: 'Saturday, 23:00',
    homeTeam: { name: 'Islam Makhachev', shortName: 'MAK', logo: '🥋' },
    awayTeam: { name: 'Arman Tsarukyan', shortName: 'TSA', logo: '🥊' },
    odds: { home: 1.35, draw: 35.0, away: 3.20 }
  },
  {
    id: 'up-4',
    sport: 'tennis',
    league: 'ATP Finals',
    date: 'Sunday, 15:30',
    homeTeam: { name: 'Carlos Alcaraz', shortName: 'ALC', logo: '🇪🇸' },
    awayTeam: { name: 'Jannik Sinner', shortName: 'SIN', logo: '🇮🇹' },
    odds: { home: 2.05, draw: null, away: 1.78 }
  }
];

export const LEAGUE_STANDINGS = [
  { pos: 1, team: 'Arsenal', p: 27, w: 20, d: 4, l: 3, gd: '+38', pts: 64, form: ['W', 'W', 'W', 'D', 'W'] },
  { pos: 2, team: 'Manchester City', p: 27, w: 19, d: 5, l: 3, gd: '+35', pts: 62, form: ['W', 'L', 'W', 'W', 'D'] },
  { pos: 3, team: 'Liverpool', p: 26, w: 18, d: 6, l: 2, gd: '+33', pts: 60, form: ['W', 'W', 'W', 'W', 'D'] },
  { pos: 4, team: 'Aston Villa', p: 27, w: 16, d: 4, l: 7, gd: '+18', pts: 52, form: ['L', 'W', 'W', 'L', 'W'] },
  { pos: 5, team: 'Tottenham', p: 26, w: 15, d: 5, l: 6, gd: '+15', pts: 50, form: ['W', 'L', 'D', 'W', 'L'] },
];

export const INITIAL_USER_BETS = [
  {
    id: 'HB-90812',
    sport: 'soccer',
    match: 'Arsenal vs Manchester City',
    selection: 'Arsenal to Win (1X2)',
    market: 'Match Winner',
    stake: 150.00,
    currency: 'USDT',
    odds: 1.55,
    potentialPayout: 232.50,
    status: 'IN_PLAY',
    currentCashout: 198.40,
    txHash: '5xYz...9Q2a (Solana)',
    placedAt: '14 Nov 2026, 17:15',
    progress: 72 // minute
  },
  {
    id: 'HB-88419',
    sport: 'basketball',
    match: 'Boston Celtics vs Los Angeles Lakers',
    selection: 'Over 218.5 Total Points',
    market: 'Total Points Over/Under',
    stake: 100.00,
    currency: 'USDT',
    odds: 1.92,
    potentialPayout: 192.00,
    status: 'IN_PLAY',
    currentCashout: 94.20,
    txHash: '3pLk...1B7m (Solana)',
    placedAt: '14 Nov 2026, 17:30',
    progress: 65
  },
  {
    id: 'HB-77124',
    sport: 'soccer',
    match: 'Inter Milan vs Juventus',
    selection: 'Inter Milan (-0.5)',
    market: 'Asian Handicap',
    stake: 200.00,
    currency: 'USDT',
    odds: 2.10,
    potentialPayout: 420.00,
    status: 'WON',
    txHash: '7vRt...4C9x (Solana)',
    placedAt: '13 Nov 2026, 20:00',
    settledAt: '13 Nov 2026, 21:55'
  },
  {
    id: 'HB-74901',
    sport: 'tennis',
    match: 'Novak Djokovic vs Daniil Medvedev',
    selection: 'Novak Djokovic 2-0 Sets',
    market: 'Correct Set Score',
    stake: 80.00,
    currency: 'USDT',
    odds: 2.45,
    potentialPayout: 196.00,
    status: 'WON',
    txHash: '2wXq...8F5j (Solana)',
    placedAt: '12 Nov 2026, 14:10',
    settledAt: '12 Nov 2026, 16:30'
  },
  {
    id: 'HB-69812',
    sport: 'esports',
    match: 'G2 Esports vs Team Vitality',
    selection: 'Team Vitality Map 1 Winner',
    market: 'Map 1 Winner',
    stake: 50.00,
    currency: 'USDT',
    odds: 1.85,
    potentialPayout: 92.50,
    status: 'LOST',
    txHash: '9mKz...3P1w (Solana)',
    placedAt: '11 Nov 2026, 19:00',
    settledAt: '11 Nov 2026, 20:15'
  }
];

export const HUBIE_INSIGHTS = [
  {
    matchId: 'match-1',
    title: 'Hubie Sharp Alert',
    tip: 'Arsenal has scored in the 70-90th minute in 6 out of their last 7 home matches. Their current momentum score is 84/100.',
    confidence: '88%'
  },
  {
    matchId: 'match-2',
    title: 'Tactical Edge',
    tip: 'Real Madrid has conceded an average of 1.6 goals per game when trailing or tied at halftime against Bundesliga opposition.',
    confidence: '79%'
  },
  {
    matchId: 'match-3',
    title: 'High Volume Trend',
    tip: '74% of community single bets in the last 15 minutes are backing Celtics on the Moneyline.',
    confidence: '92%'
  }
];
