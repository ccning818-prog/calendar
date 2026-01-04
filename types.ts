
export interface CalendarEvent {
  id: string;
  date: string; // ISO string
  title: string;
  type: 'work' | 'personal' | 'important';
}

export interface MonthlyInsight {
  month: string;
  quote: string;
  advice: string;
}
