import React, { useState } from 'react';
import { MapPin, Star, Info, X, Loader2, Sparkles } from 'lucide-react';
import { Attraction } from '../types';
import { askAIAboutAttraction } from '../services/geminiService';

interface AttractionCardProps {
  attraction: Attraction;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const [showAiInfo, setShowAiInfo] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (aiContent) {
        setShowAiInfo(true);
        return;
    }
    setLoading(true);
    setShowAiInfo(true);
    const result = await askAIAboutAttraction(attraction.name, attraction.city);
    setAiContent(result);
    setLoading(false);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          {attraction.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
           <h3 className="text-white font-bold text-xl font-kanit leading-tight">{attraction.name}</h3>
           <p className="text-slate-300 text-sm font-kanit">{attraction.thaiName}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start gap-2 mb-3 text-slate-500 text-sm">
            <MapPin size={16} className="mt-0.5 shrink-0 text-amber-500" />
            <span className="line-clamp-1">{attraction.location}</span>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
            {attraction.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
            {attraction.highlights.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md border border-slate-200">
                    {tag}
                </span>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
            <button 
                onClick={handleAskAI}
                className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
                <Sparkles size={16} />
                AI 揭秘隐藏玩法
            </button>
        </div>
      </div>

      {/* AI Modal/Overlay */}
      {showAiInfo && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-6 flex flex-col animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-500" />
                    AI 旅行情报
                </h4>
                <button onClick={() => setShowAiInfo(false)} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                    <X size={20} />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                        <Loader2 size={32} className="animate-spin text-indigo-500" />
                        <p className="text-sm">正在咨询旅行之神...</p>
                    </div>
                ) : (
                    <div className="prose prose-sm prose-indigo text-slate-700">
                        {aiContent?.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};