# Housebets Sportsbook — Next-Gen Web3 Betting Experience
> **Contest Submission:** Housebets Contest Labs — Sportsbook Design  
> **Brief:** *"Housebets Sportsbook is coming. Design it. A clickable prototype: 5 pages, singles only."*  
> **Target:** First-Prize Winning Architecture & Design Implementation  
> **Supported Platforms:** 🖥️ Full Desktop (3-Column Layout) + 📱 Mobile (Native iPhone Shell & Responsive)

---

## 🏆 Project Overview

This project is an ultra-premium, production-grade interactive prototype designed to win **1st Prize** in the Housebets Sportsbook Design Challenge. 

While legacy sportsbooks are burdened by cumbersome accumulators, clunky betslips, and latency, this prototype implements the **Singles-Only** mandate with the speed and elegance of high-frequency Web3/DeFi trading terminals.

### Live Demo & GitHub Pages Deployment
- **Deployment Status:** Pre-configured for GitHub Pages with relative paths (`./`) and zero-configuration asset loading.
- **Automated Workflow:** Continuous deployment via `.github/workflows/deploy.yml`.

---

## 📱 Desktop & Mobile Dual-Experience

Contest judges can review and interact with the prototype in two distinct modes via the **Device Switcher** in the header:

1. **🖥️ Desktop Mode (Full 3-Column Sportsbook):**
   - **Left Rail:** Comprehensive Sports Navigation, Live Match Count Badges, Top Competitions, and Zero-Margin Specials.
   - **Center Stage:** Dynamic 5-Page navigation (Lobby, 2D Radar Live Tracker, League Tables, Betslip Terminal, Player Vault).
   - **Right Rail:** Real-time Singles-Only Betslip Terminal with individual stake presets, live potential return calculations, and active in-play cashout sliders.

2. **📱 Mobile Mode (Interactive Native iPhone Bezel):**
   - Realistic iPhone device frame with Dynamic Island, simulated 5G status bar, and thumb-friendly ergonomic controls.
   - Fixed bottom navigation bar with 5 tactile quick tabs.
   - Slide-up Mobile Betslip Drawer with tactile swipe-to-dismiss and instant 1-tap single bet placement.

---

## 📑 The 5 Core Pages (Singles Only Architecture)

Every page was meticulously crafted to satisfy the contest prompt while exceeding real-world sportsbook benchmarks:

### 1. 🏟️ Sportsbook Lobby & Discovery Hub (`/lobby`)
- **Hero Marquee:** Housebets Zero-Margin Specials, Solana sub-second settlement badges.
- **Live In-Play Grid:** Real-time matches across Soccer, Basketball, and Esports with pulsing match minute indicators (`72'`).
- **Single-Odds Flash Engine:** Live odds fluctuate dynamically with emerald green (odds up) and crimson red (odds down) animations.
- **1-Click Wagering:** Click any odd (1, X, 2, Over/Under) to instantly route straight into the singles slip.

### 2. ⚡ Live Tracker & In-Play Match Visualizer (`/match-detail`)
- **2D Match Pitch Radar:** Interactive soccer pitch / court graphic with animated attack coordinates and live dangerous play tracking.
- **Live Match Statistics:** Real-time possession bars (e.g. Arsenal 54% vs 46% Man City), shots on target, corners, and yellow cards.
- **Deep Single Markets:** Match Winner 1X2, Next Goal, Over/Under Totals, Asian Handicap, Both Teams to Score (BTTS).
- **Hubie AI Sharp Assistant:** Embedded AI mascot giving data-driven momentum insights and tactical edge percentages.

### 3. 🏆 Leagues, Competitions & Fixtures (`/leagues`)
- **Competition Standings Table:** Points, Goal Difference, Form guide (last 5 matches: W W D L W).
- **Fixtures Schedule:** Grouped by matchday and date with direct 1X2 single odds.
- **Multi-League Switcher:** Premier League, UEFA Champions League, NBA, La Liga, and CS2 Blast Premier.

### 4. 🎯 Singles-Only Betslip Terminal (`/betslip-terminal`)
- **Strictly Singles-Only:** Eliminates accumulator clutter. Every bet is an autonomous single with dedicated stake management.
- **Tactile Quick Chips:** `+$10`, `+$25`, `+$50`, `+$100` and `MAX`.
- **Crypto Multi-Currency Engine:** Instant switching between USDT, SOL, BTC, and ETH balances.
- **Odds Policy Switcher:** Auto-accept higher odds, any odds, or reject fluctuations.
- **Celebration Effects:** Confetti explosions and synthesized Web Audio sound effects on successful bet executions.

### 5. 👤 Player Vault, Analytics & On-Chain Bets History (`/my-bets`)
- **Interactive PnL Curve:** SVG cumulative profit and loss growth trajectory (+284.5% ROI).
- **Audit-Ready Bet Receipts:** Unique Bet IDs (`#HB-90812`), Solana transaction hash simulation with one-click copy, and provably fair timestamps.
- **Live Cashout Sliders:** Real-time cashout of active in-play single bets directly back to the player's wallet balance.
- **VIP Rewards Tier:** Diamond VIP progression bar with instant rakeback benefits.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18 + Vite 6
- **Styling:** Tailwind CSS with custom Housebets dark-mode theme (`#07090e`, `#0f141d`, `#00E701`)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **Audio:** Native Web Audio API Synthesizer (Zero external audio asset latency)
- **Deployment:** GitHub Pages ready (`base: './'`)

---

## 🚀 How to Deploy to GitHub Pages

### Option 1: Automated Deployment via GitHub Actions (Recommended)
1. Create a new repository on GitHub (e.g. `housebets-sportsbook-prototype`).
2. Push this project to your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - The included `.github/workflows/deploy.yml` workflow will automatically build and publish the site.

### Option 2: Deploy using `gh-pages` CLI
```bash
npm run deploy
```
*(This builds the project and pushes the `dist` bundle directly to your `gh-pages` branch).*

### Option 3: Local Development & Preview
```bash
# Run local dev server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Brand & Design System

- **Background:** `#07090e` (Obsidian Base), `#0f141d` (Glass Card)
- **Primary Accent:** `#00E701` (Housebets Electric Emerald Green)
- **Glow Effects:** `box-shadow: 0 0 20px rgba(0, 231, 1, 0.25)`
- **Typography:** Inter (Sans-serif UI) + JetBrains Mono (Odds & Balances)
