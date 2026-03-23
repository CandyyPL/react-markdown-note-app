import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDatetime = (dateString: string): string => {
  const d = new Date(dateString);
  const locale = 'en-US';

  const weekday = d.toLocaleDateString(locale, { weekday: 'long' });
  const day = d.getDate();
  const month = d.toLocaleDateString(locale, { month: 'short' });

  const hrs = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');

  return `${weekday}, ${day} ${month} ${hrs}:${mins}`;
};

export const BACKEND_URL = 'http://localhost:8080';
