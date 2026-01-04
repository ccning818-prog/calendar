
import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getMonthName, getHoliday } from '../utils/dateUtils';

interface MonthViewProps {
  date: Date;
  isCurrent?: boolean;
}

const MonthView: React.FC<MonthViewProps> = ({ date, isCurrent }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // 0 (Sun) to 6 (Sat)
  
  const today = new Date();
  const isToday = (day: number) => 
    today.getDate() === day && 
    today.getMonth() === month && 
    today.getFullYear() === year;

  // 计算周一为起始日所需的填充空格
  // ISO格式: 一(1) -> 0, 二(2) -> 1, ..., 六(6) -> 5, 日(0) -> 6
  const paddingCount = (firstDay + 6) % 7;

  const days = [];
  // 填充月初空格
  for (let i = 0; i < paddingCount; i++) {
    days.push(<div key={`empty-${i}`} className="h-14 w-full"></div>);
  }
  
  // 填充日期
  for (let d = 1; d <= daysInMonth; d++) {
    const holiday = getHoliday(year, month, d);
    const isSpringFestival = holiday === '春节' || holiday === '除夕';
    
    days.push(
      <div 
        key={d} 
        className={`h-14 w-full flex flex-col items-center justify-center rounded-xl transition-all cursor-default relative overflow-hidden group
          ${isToday(d) ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-300 ring-offset-2' : 
            isSpringFestival ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md' :
            'hover:bg-slate-100 text-slate-700'}`}
      >
        <span className={`text-sm font-bold z-10 ${isToday(d) || isSpringFestival ? 'text-white' : 'text-slate-800'}`}>
          {d}
        </span>
        {holiday && (
          <span className={`text-[10px] mt-0.5 font-black truncate max-w-full px-1 z-10
            ${isToday(d) || isSpringFestival ? 'text-white/90' : 'text-red-500'}`}>
            {holiday}
          </span>
        )}
        {isSpringFestival && (
          <div className="absolute -right-1 -bottom-1 opacity-20 transform rotate-12 group-hover:scale-125 transition-transform">
            <span className="text-2xl">🧧</span>
          </div>
        )}
      </div>
    );
  }

  // 周一排第一列，周日排最后一列
  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className={`p-5 rounded-3xl bg-white shadow-sm border transition-all duration-300 ${isCurrent ? 'border-indigo-200 ring-8 ring-indigo-50/50 shadow-xl' : 'border-slate-100'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className={`text-2xl font-black tracking-tight ${isCurrent ? 'text-indigo-900' : 'text-slate-800'}`}>
            {year}年 <span className={isCurrent ? 'text-indigo-600' : 'text-slate-500'}>{getMonthName(month)}</span>
          </h3>
        </div>
        {isCurrent && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">
              本月焦点
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {weekDays.map((day, idx) => (
          <div key={day} className={`h-8 flex items-center justify-center text-xs font-black
            ${idx >= 5 ? 'text-red-400' : 'text-slate-300'}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days}
      </div>
    </div>
  );
};

export default MonthView;
