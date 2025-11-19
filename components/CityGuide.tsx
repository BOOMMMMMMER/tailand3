import React, { useState, useMemo } from 'react';
import { ATTRACTIONS } from '../constants';
import { AttractionCard } from './AttractionCard';
import { City, Category } from '../types';
import { Filter } from 'lucide-react';

interface CityGuideProps {
  city: City;
}

const CATEGORIES: Category[] = ['Temple', 'Shopping', 'Nature', 'Nightlife', 'Culture', 'Food', 'Family'];

const CATEGORY_NAMES: Record<Category | 'All', string> = {
  'All': '全部',
  'Temple': '寺庙',
  'Shopping': '购物',
  'Nature': '自然风光',
  'Nightlife': '夜生活',
  'Culture': '文化艺术',
  'Food': '美食',
  'Family': '亲子游'
};

export const CityGuide: React.FC<CityGuideProps> = ({ city }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS.filter(a => a.city === city && (selectedCategory === 'All' || a.category === selectedCategory));
  }, [city, selectedCategory]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className={`relative h-[40vh] flex items-end pb-12 px-6 sm:px-12 ${city === 'Bangkok' ? 'bg-amber-900' : 'bg-cyan-900'}`}>
        <img 
          src={city === 'Bangkok' ? "https://picsum.photos/id/408/1600/900" : "https://picsum.photos/id/382/1600/900"}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt={city}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
            <h1 className="text-5xl md:text-7xl font-kanit font-bold text-white mb-4 tracking-tight">
                {city === 'Bangkok' ? '曼谷 (Bangkok)' : '芭提雅 (Pattaya)'}
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl font-light">
                {city === 'Bangkok' 
                    ? '天使之城。金碧辉煌的寺庙、霓虹闪烁的街道和世界级的街头美食带来的感官盛宴。' 
                    : '一座不夜海滨之城。迷人的岛屿、狂野的夜生活和丰富的家庭冒险活动等你来探索。'}
            </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400 pr-4 border-r border-slate-200">
                <Filter size={18} />
                <span className="text-sm font-medium">筛选</span>
            </div>
            <button 
                onClick={() => setSelectedCategory('All')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedCategory === 'All' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
            >
                {CATEGORY_NAMES['All']}
            </button>
            {CATEGORIES.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedCategory === cat ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                >
                    {CATEGORY_NAMES[cat]}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAttractions.map(attraction => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
        
        {filteredAttractions.length === 0 && (
            <div className="text-center py-20">
                <p className="text-slate-400 text-lg">该分类下暂无景点。</p>
                <button onClick={() => setSelectedCategory('All')} className="mt-4 text-amber-600 hover:underline">清除筛选</button>
            </div>
        )}
      </div>
    </div>
  );
};