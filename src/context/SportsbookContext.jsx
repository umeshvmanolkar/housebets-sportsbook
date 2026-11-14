import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LIVE_MATCHES, UPCOMING_FIXTURES, CRYPTO_WALLETS, INITIAL_USER_BETS } from '../data/mockData';

const SportsbookContext = createContext();

export const SportsbookProvider = ({ children }) => {
  // Navigation & Core Pages (5 Pages)
  // 'lobby' | 'match-detail' | 'leagues' | 'betslip-terminal' | 'my-bets'
  const [currentPage, setCurrentPage] = useState('lobby');
  const [selectedMatchId, setSelectedMatchId] = useState('match-1');
  const [selectedSport, setSelectedSport] = useState('soccer');
  const [selectedLeague, setSelectedLeague] = useState('Premier League');

  // Device Layout Preview Mode: 'desktop' | 'mobile-preview' | 'responsive'
  const [viewMode, setViewMode] = useState('responsive');

  // Odds Format: 'decimal' | 'american' | 'fractional' | 'implied'
  const [oddsFormat, setOddsFormat] = useState('decimal');

  // Currency & Wallet
  const [wallets, setWallets] = useState(CRYPTO_WALLETS);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');

  // Live Matches State (allows live updates)
  const [liveMatches, setLiveMatches] = useState(LIVE_MATCHES);

  // Singles-Only Betslip
  // In a singles-only sportsbook, each bet is an independent single with its own stake
  const [singlesInSlip, setSinglesInSlip] = useState([
    {
      id: 'sel-initial-1',
      matchId: 'match-1',
      matchTitle: 'Arsenal vs Man City',
      marketName: 'Match Winner',
      selectionName: 'Arsenal',
      odd: 1.48,
      stake: 50.0,
      trend: 'up'
    }
  ]);

  const [isMobileBetslipOpen, setIsMobileBetslipOpen] = useState(false);
  const [quickBetMode, setQuickBetMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active & Settled User Bets
  const [userBets, setUserBets] = useState(INITIAL_USER_BETS);

  // Web Audio Synth for Haptic/Sound Effects
  const playSound = (type = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'odds-up') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext policy fallback
    }
  };

  // Convert Odds Formats
  const formatOdds = (decimal) => {
    if (!decimal || isNaN(decimal)) return '-';
    const d = parseFloat(decimal);
    switch (oddsFormat) {
      case 'american': {
        if (d >= 2.0) {
          const am = Math.round((d - 1) * 100);
          return `+${am}`;
        } else {
          const am = Math.round(-100 / (d - 1));
          return `${am}`;
        }
      }
      case 'fractional': {
        // Approximate to common fractions
        const tolerance = 1.0E-3;
        let num = 1;
        let den = 1;
        const val = d - 1;
        for (let i = 1; i <= 20; i++) {
          const candidateNum = Math.round(val * i);
          if (Math.abs(val - candidateNum / i) < tolerance) {
            num = candidateNum;
            den = i;
            break;
          }
        }
        return `${num}/${den}`;
      }
      case 'implied': {
        const pct = (100 / d).toFixed(1);
        return `${pct}%`;
      }
      case 'decimal':
      default:
        return d.toFixed(2);
    }
  };

  // Add / Toggle a Single Bet in Slip
  const toggleSingleBet = (item) => {
    playSound('click');
    setSinglesInSlip((prev) => {
      const exists = prev.find((s) => s.id === item.id);
      if (exists) {
        return prev.filter((s) => s.id !== item.id);
      } else {
        const newBet = {
          ...item,
          stake: item.stake || 25.0
        };
        // Auto open mobile betslip drawer if in mobile
        setIsMobileBetslipOpen(true);
        return [...prev, newBet];
      }
    });
  };

  // Update stake for a single bet
  const updateSingleStake = (id, newStake) => {
    setSinglesInSlip((prev) =>
      prev.map((s) => (s.id === id ? { ...s, stake: Math.max(1, parseFloat(newStake) || 0) } : s))
    );
  };

  // Remove single bet
  const removeSingleBet = (id) => {
    playSound('click');
    setSinglesInSlip((prev) => prev.filter((s) => s.id !== id));
  };

  // Clear all bets
  const clearSlip = () => {
    playSound('click');
    setSinglesInSlip([]);
  };

  // Place Single Bet (Singles Only Architecture)
  const placeSingleBet = (singleItem) => {
    playSound('win');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00E701', '#ffffff', '#00ff85']
    });

    const currentWallet = wallets.find((w) => w.symbol === selectedCurrency);
    const stakeAmount = singleItem.stake;

    // Deduct balance
    setWallets((prev) =>
      prev.map((w) =>
        w.symbol === selectedCurrency ? { ...w, balance: Math.max(0, w.balance - stakeAmount) } : w
      )
    );

    const newPlacedBet = {
      id: `HB-${Math.floor(10000 + Math.random() * 90000)}`,
      sport: 'soccer',
      match: singleItem.matchTitle,
      selection: `${singleItem.selectionName} (${formatOdds(singleItem.odd)})`,
      market: singleItem.marketName,
      stake: stakeAmount,
      currency: selectedCurrency,
      odds: singleItem.odd,
      potentialPayout: Number((stakeAmount * singleItem.odd).toFixed(2)),
      status: 'IN_PLAY',
      currentCashout: Number((stakeAmount * 0.95).toFixed(2)),
      txHash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)} (Solana)`,
      placedAt: 'Just now',
      progress: 74
    };

    setUserBets((prev) => [newPlacedBet, ...prev]);
    // remove from slip
    removeSingleBet(singleItem.id);
  };

  // Place All Singles in Slip
  const placeAllSingles = () => {
    if (singlesInSlip.length === 0) return;
    playSound('win');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E701', '#ffffff', '#f59e0b']
    });

    const totalStake = singlesInSlip.reduce((acc, curr) => acc + (curr.stake || 0), 0);
    setWallets((prev) =>
      prev.map((w) =>
        w.symbol === selectedCurrency ? { ...w, balance: Math.max(0, w.balance - totalStake) } : w
      )
    );

    const newBets = singlesInSlip.map((item) => ({
      id: `HB-${Math.floor(10000 + Math.random() * 90000)}`,
      sport: 'soccer',
      match: item.matchTitle,
      selection: `${item.selectionName} (${formatOdds(item.odd)})`,
      market: item.marketName,
      stake: item.stake,
      currency: selectedCurrency,
      odds: item.odd,
      potentialPayout: Number((item.stake * item.odd).toFixed(2)),
      status: 'IN_PLAY',
      currentCashout: Number((item.stake * 0.96).toFixed(2)),
      txHash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)} (Solana)`,
      placedAt: 'Just now',
      progress: 74
    }));

    setUserBets((prev) => [...newBets, ...prev]);
    setSinglesInSlip([]);
    setIsMobileBetslipOpen(false);
  };

  // Cash out a bet
  const cashOutBet = (betId) => {
    playSound('win');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#00E701', '#3b82f6']
    });

    setUserBets((prev) =>
      prev.map((bet) => {
        if (bet.id === betId) {
          // add cashout value to wallet
          setWallets((wList) =>
            wList.map((w) =>
              w.symbol === bet.currency ? { ...w, balance: w.balance + (bet.currentCashout || 0) } : w
            )
          );
          return {
            ...bet,
            status: 'CASHED_OUT',
            payout: bet.currentCashout,
            settledAt: 'Just now'
          };
        }
        return bet;
      })
    );
  };

  // Live Odds Fluctuation Engine (Simulates real-time sportsbook market movement)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches((prevMatches) =>
        prevMatches.map((m) => {
          if (!m.isLive) return m;
          // Randomly fluctuate one market
          const shouldFluctuate = Math.random() > 0.4;
          if (!shouldFluctuate) return m;

          const updatedMarkets = { ...m.markets };
          const keys = Object.keys(updatedMarkets);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const marketArr = updatedMarkets[randomKey];

          if (marketArr && marketArr.length > 0) {
            const randomIndex = Math.floor(Math.random() * marketArr.length);
            const item = marketArr[randomIndex];
            const delta = (Math.random() * 0.1 - 0.05).toFixed(2);
            const newOdd = Math.max(1.05, Number((item.odd + parseFloat(delta)).toFixed(2)));
            const trend = newOdd > item.odd ? 'up' : newOdd < item.odd ? 'down' : 'none';

            updatedMarkets[randomKey] = marketArr.map((opt, idx) =>
              idx === randomIndex ? { ...opt, odd: newOdd, trend } : opt
            );
          }

          return {
            ...m,
            markets: updatedMarkets
          };
        })
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const activeWallet = wallets.find((w) => w.symbol === selectedCurrency) || wallets[0];
  const selectedMatch = liveMatches.find((m) => m.id === selectedMatchId) || liveMatches[0];

  return (
    <SportsbookContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedMatchId,
        setSelectedMatchId,
        selectedSport,
        setSelectedSport,
        selectedLeague,
        setSelectedLeague,
        viewMode,
        setViewMode,
        oddsFormat,
        setOddsFormat,
        formatOdds,
        wallets,
        selectedCurrency,
        setSelectedCurrency,
        activeWallet,
        liveMatches,
        selectedMatch,
        singlesInSlip,
        toggleSingleBet,
        updateSingleStake,
        removeSingleBet,
        clearSlip,
        placeSingleBet,
        placeAllSingles,
        userBets,
        cashOutBet,
        isMobileBetslipOpen,
        setIsMobileBetslipOpen,
        quickBetMode,
        setQuickBetMode,
        soundEnabled,
        setSoundEnabled,
        playSound
      }}
    >
      {children}
    </SportsbookContext.Provider>
  );
};

export const useSportsbook = () => useContext(SportsbookContext);
