import React from 'react';
import { MapPin, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navClass = (view: string) => `
    px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer font-medium
    ${currentView === view 
      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
      : 'text-slate-600 hover:bg-amber-100 hover:text-amber-700'}
  `;

  return (
    <nav className="sticky top-4 z-50 w-full max-w-3xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl rounded-full p-2 flex justify-between items-center">
        <div 
          className="pl-4 font-kanit text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 cursor-pointer hidden sm:block"
          onClick={() => setView('home')}
        >
          ThaiVoyage
        </div>

        <div className="flex space-x-1 w-full sm:w-auto justify-center">
          <button onClick={() => setView('bangkok')} className={navClass('bangkok')}>
            <span className="hidden md:inline">曼谷</span>
            <span className="md:hidden">曼谷</span>
          </button>
          <button onClick={() => setView('pattaya')} className={navClass('pattaya')}>
             <span className="hidden md:inline">芭提雅</span>
             <span className="md:hidden">芭提雅</span>
          </button>
          <button onClick={() => setView('planner')} className={navClass('planner')}>
            <Sparkles size={18} />
            <span className="hidden md:inline">AI 规划师</span>
            <span className="md:hidden">AI</span>
          </button>
        </div>
      </div>
    </nav>
  );
};