import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  Sliders, 
  Wallet 
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const MobileNavigation = () => {
  const {
    currentPage,
    setCurrentPage,
    singlesInSlip,
    isMobileBetslipOpen,
    setIsMobileBetslipOpen,
    playSound
  } = useSportsbook();

  const navItems = [
    { id: 'lobby', label: 'Lobby', icon: Flame },
    { id: 'match-detail', label: 'Live', icon: Sparkles },
    { id: 'leagues', label: 'Leagues', icon: Trophy },
    { 
      id: 'betslip-drawer', 
      label: 'Singles', 
      icon: Sliders,
      badge: singlesInSlip.length,
      isDrawer: true
    },
    { id: 'my-bets', label: 'My Bets', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0d14]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.isDrawer ? isMobileBetslipOpen : currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              playSound('click');
              if (item.isDrawer) {
                setIsMobileBetslipOpen(!isMobileBetslipOpen);
              } else {
                setCurrentPage(item.id);
                setIsMobileBetslipOpen(false);
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-[#00E701]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,231,1,0.5)]' : ''}`} />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#00E701] text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-glow-green-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
