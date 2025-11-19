import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CityGuide } from './components/CityGuide';
import { AIPlanner } from './components/AIPlanner';
import { ArrowRight, MapPin } from 'lucide-react';

function App() {
  const [currentView, setView] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'bangkok':
        return <CityGuide city="Bangkok" />;
      case 'pattaya':
        return <CityGuide city="Pattaya" />;
      case 'planner':
        return <AIPlanner />;
      default:
        return (
          <div className="relative min-h-screen flex flex-col">
            {/* Hero Video/Image Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src="https://picsum.photos/id/408/1920/1080" 
                className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-0" // Preload hack
                style={{ display: 'none' }}
                alt="preload"
              />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2592&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat animate-[subtle-zoom_20s_infinite_alternate]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-900"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
              <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-semibold mb-6 backdrop-blur-md">
                  探索神奇的泰国
                </span>
                <h1 className="text-6xl md:text-8xl font-bold text-white font-kanit mb-6 tracking-tight shadow-black drop-shadow-lg">
                  ThaiVoyage
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  您的终极旅游指南，带您领略<span className="text-amber-400 font-medium">曼谷</span>的繁华街头与<span className="text-cyan-400 font-medium">芭提雅</span>的海滨天堂。
                </p>
              </div>

              {/* Cards Selection */}
              <div className={`grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                {/* Bangkok Card */}
                <div 
                  onClick={() => setView('bangkok')}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl hover:shadow-amber-500/20 transition-all hover:-translate-y-2"
                >
                  <img src="https://picsum.photos/id/408/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Bangkok" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-left w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl font-bold text-white font-kanit mb-2">曼谷 (Bangkok)</h2>
                        <p className="text-slate-300 text-sm">寺庙，市场，不夜城</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur p-2 rounded-full text-white group-hover:bg-amber-500 transition-colors">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pattaya Card */}
                <div 
                  onClick={() => setView('pattaya')}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-2"
                >
                  <img src="https://picsum.photos/id/382/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pattaya" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-left w-full">
                     <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl font-bold text-white font-kanit mb-2">芭提雅 (Pattaya)</h2>
                        <p className="text-slate-300 text-sm">海滩，岛屿，乐园</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur p-2 rounded-full text-white group-hover:bg-cyan-500 transition-colors">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className={`mt-12 transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                 <button 
                    onClick={() => setView('planner')}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 transition-all"
                 >
                    <MapPin size={18} className="text-amber-400" />
                    <span>AI 智能行程规划</span>
                 </button>
              </div>
            </div>
            
            <footer className="relative z-10 py-6 text-center text-slate-500 text-sm bg-slate-900 border-t border-slate-800">
              © 2024 ThaiVoyage. 专为旅行者打造。
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar currentView={currentView} setView={setView} />
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;