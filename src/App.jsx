import React, { useState } from 'react';
import { SportsbookProvider, useSportsbook } from './context/SportsbookContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Betslip } from './components/Betslip';
import { MobileNavigation } from './components/MobileNavigation';
import { MobileBetslipDrawer } from './components/MobileBetslipDrawer';
import { ContestModal } from './components/ContestModal';

// The 5 Exact Pages from Contest Brief
import { SportsHome } from './pages/SportsHome';
import { LivePage } from './pages/LivePage';
import { FootballPage } from './pages/FootballPage';
import { MatchPage } from './pages/MatchPage';
import { BetSlipMyBetsPage } from './pages/BetSlipMyBetsPage';

import { Smartphone, Monitor, Info } from 'lucide-react';

const MainLayout = () => {
  const { currentPage, viewMode, setViewMode } = useSportsbook();
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);

  // Render the exact 5 linked pages
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'live':
        return <LivePage />;
      case 'football':
        return <FootballPage />;
      case 'match':
        return <MatchPage />;
      case 'bets':
        return <BetSlipMyBetsPage />;
      case 'home':
      default:
        return <SportsHome />;
    }
  };

  // 1. Mobile Phone Mode (390px iPhone Device Shell)
  if (viewMode === 'mobile') {
    return (
      <div className="min-h-screen bg-[#04090e] flex flex-col items-center justify-center p-3 selection:bg-[#00A3FF] selection:text-white">
        {/* Device Switcher Bar above phone */}
        <div className="mb-3 flex items-center gap-3 bg-[#0a141e] border border-white/10 px-4 py-2 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#00A3FF]" />
            <span className="text-xs font-bold text-white">iPhone Viewport Simulation (390px)</span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button
            onClick={() => setViewMode('desktop')}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Switch to 1440px Desktop</span>
          </button>

          <button
            onClick={() => setIsContestModalOpen(true)}
            className="text-xs text-[#00A3FF] font-semibold hover:underline flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Contest Brief</span>
          </button>
        </div>

        {/* iPhone Frame */}
        <div className="iphone-frame flex flex-col text-white">
          {/* Embedded Header */}
          <Header onOpenContestModal={() => setIsContestModalOpen(true)} />

          {/* Scrollable Page Body */}
          <main className="flex-1 overflow-y-auto px-3 pt-3 pb-24">
            {renderCurrentPage()}
          </main>

          {/* Floating bar and Mobile Nav Bar inside iPhone frame */}
          <MobileNavigation isInsideFrame={true} />

          {/* Mobile Bottom Drawer inside iPhone frame */}
          <MobileBetslipDrawer isInsideFrame={true} />
        </div>

        {/* Contest Modal */}
        <ContestModal
          isOpen={isContestModalOpen}
          onClose={() => setIsContestModalOpen(false)}
        />
      </div>
    );
  }

  // 2. Desktop Mode (1440px) & Responsive Layout
  return (
    <div className="min-h-screen bg-[#0f212e] text-[#e2e8f0] flex flex-col">
      {/* Top Main Navigation Header */}
      <Header onOpenContestModal={() => setIsContestModalOpen(true)} />

      {/* Main Site Shell (Left nav, Center content, Right side panel) */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto overflow-hidden">
        {/* Left Nav (Slim Icon Rail) */}
        <Sidebar />

        {/* Center Main Stage (Dynamic 5 Pages) */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">
          {renderCurrentPage()}
        </main>

        {/* Right Side Panel (Betslip + My bets) */}
        <Betslip />
      </div>

      {/* Mobile Bottom Floating bar & Navigation for smaller screens in responsive mode */}
      <MobileNavigation />

      {/* Mobile Slide-Up Drawer for responsive mode */}
      <MobileBetslipDrawer />

      {/* Floating Testing Controls Dock for Contest Judges */}
      <div className="fixed bottom-4 left-4 z-50 hidden sm:flex items-center gap-1.5 bg-[#0b1d28]/95 backdrop-blur-md border border-white/10 rounded-2xl px-2.5 py-1.5 shadow-2xl">
        <button
          onClick={() => setViewMode('desktop')}
          className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
            viewMode === 'desktop' ? 'bg-[#00F5D4]/20 text-[#00F5D4] font-bold border border-[#00F5D4]/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>1440px Desktop</span>
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
            viewMode === 'mobile' ? 'bg-[#00F5D4]/20 text-[#00F5D4] font-bold border border-[#00F5D4]/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>390px Phone</span>
        </button>
        <div className="h-3.5 w-px bg-white/10 mx-0.5" />
        <button
          onClick={() => setIsContestModalOpen(true)}
          className="px-2 py-1 rounded-xl text-xs text-[#00A3FF] hover:text-white flex items-center gap-1 font-semibold"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Contest Brief</span>
        </button>
      </div>

      {/* Contest Specs & Rubric Verification Modal */}
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
