
export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const getMonthName = (monthIndex: number) => {
  const months = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];
  return months[monthIndex];
};

export const getNeighboringMonths = (baseDate: Date) => {
  const prev = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
  const curr = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const next = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
  return [prev, curr, next];
};

export const getHoliday = (year: number, month: number, day: number): string | null => {
  const dateStr = `${month + 1}-${day}`;
  
  // 阳历固定节日
  const fixedHolidays: Record<string, string> = {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '3-12': '植树节',
    '5-1': '劳动节',
    '5-4': '青年节',
    '6-1': '儿童节',
    '8-1': '建军节',
    '9-10': '教师节',
    '10-1': '国庆节',
    '12-24': '平安夜',
    '12-25': '圣诞节',
  };

  if (fixedHolidays[dateStr]) return fixedHolidays[dateStr];

  // 农历节日 (2024-2026 手动映射)
  const lunarHolidays: Record<string, string> = {
    // 2024
    '2024-1-18': '腊八节',
    '2024-2-2': '小年',
    '2024-2-9': '除夕',
    '2024-2-10': '春节',
    '2024-2-24': '元宵节',
    '2024-4-4': '清明节',
    '2024-6-10': '端午节',
    '2024-8-10': '七夕',
    '2024-9-17': '中秋节',
    '2024-10-11': '重阳节',
    '2024-12-30': '腊八节',
    // 2025
    '2025-1-22': '小年',
    '2025-1-28': '除夕',
    '2025-1-29': '春节',
    '2025-2-12': '元宵节',
    '2025-4-4': '清明节',
    '2025-5-31': '端午节',
    '2025-8-29': '七夕',
    '2025-10-6': '中秋节',
    '2025-10-29': '重阳节',
    // 2026
    '2026-1-20': '腊八节',
    '2026-2-10': '小年',
    '2026-2-16': '除夕',
    '2026-2-17': '春节',
    '2026-3-3': '元宵节',
    '2026-4-5': '清明节',
    '2026-6-19': '端午节',
    '2026-8-19': '七夕',
    '2026-9-25': '中秋节',
    '2026-10-18': '重阳节',
  };

  const fullDateStr = `${year}-${month + 1}-${day}`;
  return lunarHolidays[fullDateStr] || null;
};
