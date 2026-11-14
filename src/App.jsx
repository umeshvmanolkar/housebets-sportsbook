import React, { useState } from 'react';
import { SportsbookProvider, useSportsbook } from './context/SportsbookContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Betslip } from './components/Betslip';
import { MobileNavigation } from './components/MobileNavigation';
import { MobileBetslipDrawer } from './components/MobileBetslipDrawer';
import { ContestModal } from './components/ContestModal';

// 5 Core Pages
import { LobbyPage } from './pages/LobbyPage';
import { MatchDetailPage } from './pages/MatchDetailPage';
import { LeaguesPage } from './pages/LeaguesPage';
import { BetslipTerminalPage } from './pages/BetslipTerminalPage';
import { MyBetsProfilePage } from './pages/MyBetsProfilePage';

import { Smartphone, Monitor, Info } from 'lucide-react';

const MainLayout = () => {
  const { currentPage, viewMode, setViewMode } = useSportsbook();
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);

  // Render Current Page
  const renderPage = () => {
    switch (currentPage) {
      case 'match-detail':
        return <MatchDetailPage />;
      case 'leagues':
        return <LeaguesPage />;
      case 'betslip-terminal':
        return <BetslipTerminalPage />;
      case 'my-bets':
        return <MyBetsProfilePage />;
      case 'lobby':
      default:
        return <LobbyPage />;
    }
  };

  // If Mobile Frame Preview is active, wrap in realistic iPhone mockup
  if (viewMode === 'mobile-preview') {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center p-4 selection:bg-[#00E701] selection:text-black">
        {/* Device Switcher Bar on Top of Simulator */}
        <div className="mb-4 flex items-center gap-3 bg-[#0e131d] border border-white/10 px-4 py-2 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#00E701]" />
            <span className="text-xs font-bold text-white">Mobile Viewport Simulation (390 × 844)</span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button
            onClick={() => setViewMode('desktop')}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Switch to Desktop View</span>
          </button>

          <button
            onClick={() => setIsContestModalOpen(true)}
            className="text-xs text-[#00E701] font-semibold hover:underline flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Contest Brief</span>
          </button>
        </div>

        {/* The iPhone Mockup Shell */}
        <div className="iphone-frame bg-[#07090e] border-4 border-[#1c2230] flex flex-col text-white">
          {/* Dynamic Island */}
          <div className="dynamic-island flex items-center justify-between px-3 text-[10px] text-white/70">
            <span className="text-[9px] font-mono">18:00</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[9px]">5G</span>
          </div>

          {/* Mobile Embedded Header */}
          <Header onOpenContestModal={() => setIsContestModalOpen(true)} />

          {/* Scrollable Mobile Body */}
          <main className="flex-1 overflow-y-auto px-3 pt-3 pb-20">
            {renderPage()}
          </main>

          {/* Mobile Bottom Navigation */}
          <MobileNavigation />

          {/* Slide-Up Mobile Betslip Drawer */}
          <MobileBetslipDrawer />
        </div>

        {/* Global Contest Modal */}
        <ContestModal
          isOpen={isContestModalOpen}
          onClose={() => setIsContestModalOpen(false)}
        />
      </div>
    );
  }

  // Standard Desktop / Responsive Layout
  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] flex flex-col">
      {/* Top Main Navigation Header */}
      <Header onOpenContestModal={() => setIsContestModalOpen(true)} />

      {/* Main 3-Column Sportsbook Body */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto overflow-hidden">
        {/* Left Sports Navigation Rail (Desktop) */}
        <Sidebar />

        {/* Center Main Stage (Dynamic Page 1 - 5) */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
          {renderPage()}
        </main>

        {/* Right Betslip Rail (Desktop) */}
        {viewMode !== 'mobile-preview' && (
          <div className="hidden lg:block">
            <Betslip />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar (Visible on smaller screens in responsive mode) */}
      <MobileNavigation />

      {/* Mobile Betslip Bottom Drawer Sheet */}
      <MobileBetslipDrawer />

      {/* Contest Specs & Architecture Presentation Modal */}
      <ContestModal
        isOpen={isContestModalOpen}
        onClose={() => setIsContestModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SportsbookProvider>
      <MainLayout />
    </SportsbookProvider>
  );
}
