import { subDays, formatISO } from 'date-fns';

export const generateDates = (days: number): string[] => {
  const dates = new Array(days);
  const today = new Date();
  for (var i = 0; i < days; i++) {
    const subDay = subDays(today, i + 1);
    const date = formatISO(new Date(subDay), { representation: 'date' });
    dates[i] = date;
  }
  return dates;
};

export const logError = (message: string): void => {
  console.log('ERROR: ', message);
};
