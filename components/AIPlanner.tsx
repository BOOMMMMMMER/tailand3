import React, { useState } from 'react';
import { ItineraryRequest } from '../types';
import { generateTravelItinerary } from '../services/geminiService';
import { Loader2, Sparkles, Calendar, Users, Map as MapIcon, CheckCircle } from 'lucide-react';

export const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItineraryRequest>({
    city: 'Both',
    days: 3,
    travelerType: 'Couple',
    interests: [],
  });

  // Use English keys for logic, but will display translated in UI if I mapped them, 
  // but here I'll just use Chinese keys for simplicity in the UI list.
  // Actually, better to use English for API consistency but display Chinese.
  const interestsList = [
    { id: 'Temples', label: '寺庙文化' },
    { id: 'Street Food', label: '街头美食' },
    { id: 'Luxury Shopping', label: '豪华购物' },
    { id: 'Nightlife', label: '夜生活' },
    { id: 'Beaches', label: '海滩岛屿' },
    { id: 'History', label: '历史古迹' },
    { id: 'Adventure', label: '户外探险' },
    { id: 'Relaxation', label: '休闲按摩' }
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
        ...prev,
        interests: prev.interests.includes(interest)
            ? prev.interests.filter(i => i !== interest)
            : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const itinerary = await generateTravelItinerary(formData);
    setResult(itinerary);
    setLoading(false);
  };

  const cityOptions = [
      { val: 'Bangkok', label: '曼谷' },
      { val: 'Pattaya', label: '芭提雅' },
      { val: 'Both', label: '双城游' }
  ];

  const travelerOptions = [
      { val: 'Solo', label: '独自旅行' },
      { val: 'Couple', label: '情侣/夫妻' },
      { val: 'Family', label: '家庭亲子' },
      { val: 'Friends', label: '朋友结伴' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-kanit font-bold text-slate-900 mb-4 flex justify-center items-center gap-3">
                <span className="bg-amber-100 p-2 rounded-2xl text-amber-600"><Sparkles size={32} /></span>
                AI 智能行程规划师
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto">
                告诉我们您的偏好，AI 将为您定制完美的泰国逐日行程。
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 sticky top-24">
                    <div className="space-y-6">
                        {/* Destination */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <MapIcon size={16} className="text-amber-500" /> 目的地
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {cityOptions.map(opt => (
                                    <button
                                        key={opt.val}
                                        type="button"
                                        onClick={() => setFormData({...formData, city: opt.val as any})}
                                        className={`py-2 rounded-xl text-sm font-medium transition-all ${formData.city === opt.val ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Days */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Calendar size={16} className="text-amber-500" /> 行程天数: {formData.days} 天
                            </label>
                            <input 
                                type="range" 
                                min="1" 
                                max="14" 
                                value={formData.days}
                                onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>1 天</span>
                                <span>14 天</span>
                            </div>
                        </div>

                        {/* Traveler Type */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Users size={16} className="text-amber-500" /> 旅行者类型
                            </label>
                            <select 
                                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-amber-500 outline-none"
                                value={formData.travelerType}
                                onChange={(e) => setFormData({...formData, travelerType: e.target.value as any})}
                            >
                                {travelerOptions.map(t => (
                                    <option key={t.val} value={t.val}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Interests */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">兴趣偏好</label>
                            <div className="flex flex-wrap gap-2">
                                {interestsList.map(interest => (
                                    <button
                                        key={interest.id}
                                        type="button"
                                        onClick={() => toggleInterest(interest.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formData.interests.includes(interest.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                    >
                                        {interest.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            生成定制行程
                        </button>
                    </div>
                </form>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-2">
                {result ? (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                            <CheckCircle className="text-green-500" />
                            <h3 className="text-xl font-bold text-slate-800">您的专属行程单</h3>
                        </div>
                        <div className="prose prose-slate max-w-none prose-headings:font-kanit prose-a:text-amber-600">
                            <div dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                        </div>
                        <button 
                            onClick={() => setResult(null)}
                            className="mt-8 text-sm text-slate-500 hover:text-slate-800 underline"
                        >
                            重新规划
                        </button>
                    </div>
                ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 p-8 text-center">
                        {loading ? (
                            <>
                                <Loader2 size={48} className="animate-spin text-amber-500 mb-4" />
                                <p className="text-lg font-medium text-slate-600">正在为您规划完美旅程...</p>
                                <p className="text-sm">分析景点、优化路线、寻找隐藏的宝藏。</p>
                            </>
                        ) : (
                            <>
                                <div className="bg-slate-100 p-4 rounded-full mb-4">
                                    <MapIcon size={32} className="text-slate-300" />
                                </div>
                                <p>您的行程将显示在这里。</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};