// utils/getCurrentPeriod.ts

export function getCurrentPeriod(): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  if (totalMinutes >= 510 && totalMinutes < 595) return 'Pre-Market Setup';         // 8:30am – 9:55am
  if (totalMinutes >= 600 && totalMinutes < 745) return 'Midday Discipline';        // 10:00am – 12:25pm
  if (totalMinutes >= 750 && totalMinutes < 880) return 'Final 15 Review';          // 12:30pm – 2:40pm
  return 'Post-Market Reflection';                                                  // 2:45pm – 8:25am
}
