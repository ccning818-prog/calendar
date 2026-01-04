
import React, { useState, useEffect, useCallback } from 'react';
import MonthView from './components/MonthView';
import { getNeighboringMonths, getMonthName } from './utils/dateUtils';
import { getMonthlyInsights } from './services/geminiService';
import { MonthlyInsight } from './types';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [insight, setInsight] = useState<MonthlyInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const months = getNeighboringMonths(baseDate);

  const fetchInsight = useCallback(async () => {
    setIsLoadingInsight(true);
    const monthName = getMonthName(baseDate.getMonth());
    const year = baseDate.getFullYear();
    const result = await getMonthlyInsights(monthName, year);
    setInsight(result);
    setIsLoadingInsight(false);
  }, [baseDate]);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight]);

  const handlePrev = () => {
    setBaseDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setBaseDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setBaseDate(new Date());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Calendar size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">
              三月日历
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">TripleView Pro</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleToday}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            回到今天
          </button>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              onClick={handlePrev}
              className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-600 active:scale-95"
              title="上个月"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
            <button 
              onClick={handleNext}
              className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-600 active:scale-95"
              title="下个月"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10">
        {/* Monthly Insight Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12">
            <Sparkles size={160} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-indigo-400 mb-6 uppercase tracking-[0.2em] text-xs font-black">
                <Sparkles size={16} className="text-indigo-400" />
                <span>AI 月度灵感 · {getMonthName(baseDate.getMonth())}</span>
              </div>
              {isLoadingInsight ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-white/5 rounded-2xl w-full"></div>
                  <div className="h-6 bg-white/5 rounded-2xl w-2/3"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-light italic mb-8 leading-tight text-indigo-50">
                    「 {insight?.quote} 」
                  </h2>
                  <div className="inline-flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-3xl">
                    <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 ring-1 ring-indigo-500/30">
                      <RefreshCw size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-indigo-400 mb-1 uppercase tracking-wider">高效建议</p>
                      <p className="text-slate-300 text-base leading-relaxed">{insight?.advice}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3-Month View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {months.map((date, idx) => (
            <div key={date.getTime()} className={`transform transition-all duration-500 ${idx === 1 ? 'md:scale-105 z-10' : 'opacity-90 grayscale-[20%] hover:grayscale-0'}`}>
              <MonthView 
                date={date} 
                isCurrent={idx === 1} 
              />
            </div>
          ))}
        </div>

        {/* Legend / Footer */}
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-6 font-medium">
          <p>© 2024 TripleView Calendar. 助力高效生活与工作。</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200"></span> 今日
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-100"></span> 节假日
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-indigo-200 bg-white"></span> 焦点月
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
