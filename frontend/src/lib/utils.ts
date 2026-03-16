import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCustomId = () => {
  return window.crypto.randomUUID == null
    ? Date.now().toString()
    : crypto.randomUUID();
};
