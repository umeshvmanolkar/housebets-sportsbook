import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  MATCHES_DATA, 
  INITIAL_FAVOURITES, 
  INITIAL_MY_BETS, 
  FOOTBALL_LEAGUES 
} from '../data/mockData';

const SportsbookContext = createContext();

export const SportsbookProvider = ({ children }) => {
  // The 5 Core Pages:
  // 'home' (Sports home)
  // 'live' (Live now)
  // 'football' (Football competitions)
  // 'match' (Match page: Arsenal v Brighton)
  // 'bets' (Bet slip + My bets shared page/panel)
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMatchId, setSelectedMatchId] = useState('match-ars-bha');
  const [searchQuery, setSearchQuery] = useState('');

  // Device Mode: 'desktop' (1440px) | 'mobile' (390px phone shell) | 'responsive'
  const [viewMode, setViewMode] = useState('responsive');

  // Left Nav Collapsed state on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Right Panel / Betslip open state
  const [isBetslipPanelOpen, setIsBetslipPanelOpen] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState('betslip'); // 'betslip' | 'mybets' | 'chat'

  // Mobile Bottom Drawer Open state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Singles-Only Slip Selection (Rules: "Singles only", "Decimal odds, stakes in USDT")
  // Only 1 or single independent selections
  const [singlesInSlip, setSinglesInSlip] = useState([
    {
      id: 'ars-bha-1',
      matchId: 'match-ars-bha',
      teamName: 'Arsenal',
      matchTitle: 'Arsenal v Brighton & Hove Albion',
      scoreMinute: '1-0 52\'',
      marketName: 'Match result',
      selectionName: 'Arsenal',
      odd: 1.30,
      stake: 20.00,
      isSuspended: false
    }
  ]);

  // Odds Changed Simulation (Rules: "Odds changed: player must accept")
  const [oddsChangedNotice, setOddsChangedNotice] = useState(null); // e.g. { id, oldOdd: 1.30, newOdd: 1.35 }

  // Bet Placed & Bet Failed simulation states (Rules: "Bet placed, bet failed")
  const [betFeedback, setBetFeedback] = useState(null); // { type: 'success' | 'failed', message: string, betId?: string }
  const [simulateFailNextBet, setSimulateFailNextBet] = useState(false);

  // Favourites / Followed teams and leagues (Rules: "Follow a team or competition")
  const [favourites, setFavourites] = useState(INITIAL_FAVOURITES);

  // My Bets (Open & Settled) (Rules: "My bets: open, settled, cash out")
  const [myBets, setMyBets] = useState(INITIAL_MY_BETS);

  // USDT Wallet balance
  const [usdtBalance, setUsdtBalance] = useState(1450.00);

  // Sound effects
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playClick = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  };

  // Toggle selection in Singles Betslip
  const toggleSelection = (item) => {
    playClick();
    setSinglesInSlip((prev) => {
      const exists = prev.find((s) => s.id === item.id);
      if (exists) {
        return prev.filter((s) => s.id !== item.id);
      } else {
        // Auto open desktop side panel or mobile bottom drawer
        setIsBetslipPanelOpen(true);
        setActivePanelTab('betslip');
        return [
          {
            id: item.id,
            matchId: item.matchId,
            teamName: item.selectionName,
            matchTitle: item.matchTitle,
            scoreMinute: item.scoreMinute || '1-0 52\'',
            marketName: item.marketName || 'Match result',
            selectionName: item.selectionName,
            odd: item.odd,
            stake: 20.00,
            isSuspended: item.isSuspended || false
          }
        ];
      }
    });
  };

  const removeSelection = (id) => {
    playClick();
    setSinglesInSlip((prev) => prev.filter((s) => s.id !== id));
  };

  const clearSlip = () => {
    playClick();
    setSinglesInSlip([]);
    setOddsChangedNotice(null);
  };

  const updateStake = (id, stakeValue) => {
    setSinglesInSlip((prev) =>
      prev.map((s) => (s.id === id ? { ...s, stake: Math.max(0, parseFloat(stakeValue) || 0) } : s))
    );
  };

  // Accept changed odds
  const acceptChangedOdds = () => {
    playClick();
    if (!oddsChangedNotice) return;
    setSinglesInSlip((prev) =>
      prev.map((s) => (s.id === oddsChangedNotice.id ? { ...s, odd: oddsChangedNotice.newOdd } : s))
    );
    setOddsChangedNotice(null);
  };

  // Trigger odds change simulation
  const triggerSimulateOddsChange = () => {
    if (singlesInSlip.length === 0) return;
    const first = singlesInSlip[0];
    const newOdd = Number((first.odd + 0.08).toFixed(2));
    setOddsChangedNotice({
      id: first.id,
      oldOdd: first.odd,
      newOdd: newOdd
    });
  };

  // Place Single Bet (Strictly Singles Only)
  const placeSingleBet = () => {
    if (singlesInSlip.length === 0) return;
    const bet = singlesInSlip[0];

    // If simulated to fail (demonstrating "Bet placed, bet failed" from contest rules)
    if (simulateFailNextBet) {
      setBetFeedback({
        type: 'failed',
        message: 'Bet placement failed: Market liquidity update in progress. Please retry.'
      });
      setTimeout(() => setBetFeedback(null), 4000);
      return;
    }

    if (bet.stake <= 0) return;

    // Deduct USDT
    setUsdtBalance((b) => Math.max(0, b - bet.stake));

    // Success confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00A3FF', '#ffffff', '#26d0ce']
    });

    const newBetId = `bet-op-${Date.now().toString().slice(-4)}`;
    const newOpenBet = {
      id: newBetId,
      placedDate: 'Just now',
      team: bet.selectionName,
      match: bet.matchTitle,
      statusNote: bet.scoreMinute,
      isLive: true,
      odds: bet.odd,
      stake: bet.stake,
      returns: Number((bet.stake * bet.odd).toFixed(2)),
      cashoutAmount: Number((bet.stake * 0.95).toFixed(2)),
      result: 'Open'
    };

    setMyBets((prev) => ({
      ...prev,
      open: [newOpenBet, ...prev.open]
    }));

    setBetFeedback({
      type: 'success',
      message: `Bet placed successfully! Single on ${bet.selectionName} @ ${bet.odd.toFixed(2)}`,
      betId: newBetId
    });

    setSinglesInSlip([]);
    setOddsChangedNotice(null);
    setIsMobileDrawerOpen(false);

    setTimeout(() => setBetFeedback(null), 4000);
  };

  // Cash out open bet
  const cashOut = (betId) => {
    playClick();
    setMyBets((prev) => {
      const target = prev.open.find((b) => b.id === betId);
      if (!target) return prev;

      setUsdtBalance((b) => b + target.cashoutAmount);

      return {
        ...prev,
        open: prev.open.filter((b) => b.id !== betId),
        settled: [
          {
            ...target,
            result: `Cashed Out ($${target.cashoutAmount.toFixed(2)})`
          },
          ...prev.settled
        ]
      };
    });

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#00A3FF', '#f59e0b']
    });
  };

  // Toggle Following a Team or Competition
  const toggleFollow = (item) => {
    playClick();
    setFavourites((prev) => {
      const exists = prev.find((f) => f.id === item.id || f.name === item.name);
      if (exists) {
        return prev.filter((f) => f.id !== item.id && f.name !== item.name);
      } else {
        return [...prev, { id: item.id || `fav-${Date.now()}`, name: item.name, type: item.type || 'team', icon: item.icon || '⭐' }];
      }
    });
  };

  const isFollowed = (name) => favourites.some((f) => f.name === name);

  // Background odds fluctuation simulator
  useEffect(() => {
    const timer = setInterval(() => {
      // randomly fluctuate live match result
      const match = MATCHES_DATA[0];
      if (match && match.matchResult) {
        const delta = (Math.random() * 0.04 - 0.02);
        match.matchResult.home.odd = Math.max(1.10, Number((match.matchResult.home.odd + delta).toFixed(2)));
      }
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const selectedMatch = MATCHES_DATA.find((m) => m.id === selectedMatchId) || MATCHES_DATA[0];

  return (
    <SportsbookContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedMatchId,
        setSelectedMatchId,
        selectedMatch,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        isSidebarOpen,
        setIsSidebarOpen,
        isBetslipPanelOpen,
        setIsBetslipPanelOpen,
        activePanelTab,
        setActivePanelTab,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        singlesInSlip,
        toggleSelection,
        removeSelection,
        clearSlip,
        updateStake,
        oddsChangedNotice,
        acceptChangedOdds,
        triggerSimulateOddsChange,
        betFeedback,
        simulateFailNextBet,
        setSimulateFailNextBet,
        placeSingleBet,
        favourites,
        toggleFollow,
        isFollowed,
        myBets,
        cashOut,
        usdtBalance,
        playClick
      }}
    >
      {children}
    </SportsbookContext.Provider>
  );
};

export const useSportsbook = () => useContext(SportsbookContext);
