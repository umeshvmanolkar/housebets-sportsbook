# Housebets Sportsbook — Official 1st Prize Submission Prototype

> **Contest:** Housebets Contest Labs — Sportsbook Design  
> **Brief:** *"We're building a sportsbook. Design the five pages players will use most. Build a clickable prototype: 5 pages, phone and desktop, in our site shell (top bar, left nav, side panel)."*  
> **Target:** 1st Prize Winning Entry  
> **Deployment:** Built & Optimized for GitHub Pages (zero-config, works without login)

---

## 📸 Reference Alignment & Exact Specification Fulfillment

This clickable prototype is built 1:1 to match the official Housebets starter shell and both desktop & mobile reference screenshots:

### 1. Site Shell (Desktop 1440px & Phone 390px)
- **Top Bar:** 
  - Sidebar toggle, Housebets Cyan Wave Logo, Weekly Prize **$50,000.00** trophy badge, VIP Crown, Search button, Betslip panel toggle, **Log In** button, and solid light-cyan **Register** button.
- **Left Nav Rail:** 
  - Slim vertical icon rail (Casino, Sports, Streams, Calendar, Originals, Soccer, Tennis, Basketball, Baseball, Mascot avatar).
- **Side Panel (Desktop):** 
  - Slide-in panel on the right with `Bet slip 1` | `My bets 1` | `Chat` tabs, `Singles · 1 selection`, USDT stake input, and instant bet placement.
- **Phone Bottom Bar (Mobile 390px):** 
  - Floating bar above bottom navigation: `[ 1 ] Arsenal @ 1.30  ^` in light cyan (`#bbf2f6`), expanding smoothly into the mobile betslip sheet.

---

## 📑 The 5 Pages Required by the Brief

### Page 1: Sports Home
- **Live now** ticker with match minute and score badges.
- **Starting soon** section with upcoming fixtures.
- **Top competitions** (Premier League, Champions League, LaLiga, Serie A, Bundesliga).
- **Sports nav:** `🏠 Home`, `📺 Live 13`, `⚽ Soccer`, `🎾 Tennis`, `🏀 Basketball`, `⚾ Baseball`, `🏈 American Football`, `🎮 Esports`.
- **Search:** Teams, players, competitions, markets.
- **Favourites:** `⭐ Premier League ✕`, `🔴 Arsenal ✕`.
- **Your matches (3 matches):** Row-by-row match result odds boxes with `+115 >` market counters.
- **Featured matches:** Multi-match carousel with team crests and 1X2 odds.

### Page 2: Live
- Every match in play across Premier League, LaLiga, Serie A, and Bundesliga.
- Filter by sport and competition (`All 13`, `Soccer 6`, `Tennis 3`, `Basketball 1`, etc.).
- Live score (`1 - 0`) and live clock (`52'`, `HT`, `58'`).
- **Suspended state:** Displays `🔒 Suspended` when markets are locked.
- **Nothing live fallback:** Clean "Starting soon" section.

### Page 3: Football
- Dedicated soccer competition hub: Premier League, Champions League, LaLiga, Serie A, Bundesliga.
- Match result odds (1, X, 2) on each row.
- **Follow a team or competition:** Clickable ⭐ star on every team crest and competition header (adds to / removes from Favourites in real-time).

### Page 4: Match Page (Example: Arsenal v Brighton, live)
- **Scoreboard:** Arsenal 1 - 0 Brighton & Hove Albion, `● LIVE 52'`.
- `⭐ Following` badge for Arsenal, `☆ Follow` badge for Brighton.
- **Market groups:** `Popular 10`, `Goalscorers 9`, `Goals 11`, `Players 11`, `Halves 8`, `Handicaps 5`, `Corners & cards 14`, `Minutes 10`, `Specials 7`, `All markets 85`.
- **Market accordions:** Match result, Double chance, Total goals, Both teams to score, Anytime goalscorer, Asian handicap.
- **Odds moving & markets suspended:** Live odds fluctuation and interactive "🔒 Simulate Market Suspended" toggle.

### Page 5: Bet Slip + My Bets (Shared Panel / Page)
- **Tap odds to add to slip:** Selecting any odd highlights it with an active cyan pill background (`#00A3FF`) and checkmark (`✓`).
- **Singles only:** Strictly single bets with independent stakes.
- **Decimal odds, stakes in USDT:** Payouts and balances in Tether (₮).
- **Stake, odds, potential return:** Real-time calculation (`Stake × Odd = Returns`).
- **Odds changed: player must accept:** Interactive simulation banner (`⚠️ Odds changed: 1.30 ➔ 1.35`) with `[ Accept ]` button.
- **Selection suspended:** Clear visual lock indicator.
- **Bet placed & Bet failed:** Demonstrates both the celebratory placement state and the failed submission error state.
- **My bets:** `Open (1)` with **Cash Out ($28.50)** action, and `Settled (7)` with Won/Lost receipts.

---

## 🚫 Out of Scope Compliance Check

To ensure 100% compliance with the contest brief's explicit "Out of scope" rules:
- ❌ **No multis, accumulators, or bet builders**
- ❌ **No boosts, free bets, or promotional popups**
- ❌ **No outrights or specials clutter**
- ❌ **No extraneous stats widgets or match trackers**
- ❌ **No AI search gimmicks**
- Clean, lightning-fast, high-converting core sportsbook design.

---

## 🚀 How to Deploy to GitHub Pages (Ready Out-of-the-Box)

The project has already been built with relative paths (`base: './'`). You can deploy it in 2 minutes:

### Method 1: Push to GitHub & Enable Pages via `/docs` (Easiest)
1. Initialize your remote repository:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```
2. In your repository on GitHub:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/docs`.
   - Click **Save**. Your site will be live immediately!

### Method 2: Automated Deployment via GitHub Actions
- A GitHub Actions workflow is pre-configured at `.github/workflows/deploy.yml`.
- Under **Settings** > **Pages**, simply choose **GitHub Actions** as the source.

### Run Locally:
```bash
npm.cmd run dev
```
Open `http://localhost:5173` in your browser.
