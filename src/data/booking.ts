/** تواريخ محجوزة — أضف YYYY-MM-DD لكل يوم محجوز */
export const bookedDates: string[] = [];

/** تواريخ محدودة (قرب الامتلاء) */
export const limitedDates: string[] = [];

export const serviceOptions = [
  "تصوير فوتوغرافي",
  "تصوير فيديو",
  "تصوير مطاعم",
  "تصوير كافيهات",
  "مونتاج احترافي",
  "موشن جرافيك",
  "فيديوهات طولية",
  "فيديوهات عرضية",
  "تصوير فعاليات",
  "إنتاج إبداعي",
];

export const timeOptions = [
  "9:00 ص",
  "10:00 ص",
  "11:00 ص",
  "12:00 م",
  "1:00 م",
  "2:00 م",
  "3:00 م",
  "4:00 م",
  "5:00 م",
  "6:00 م",
  "7:00 م",
  "8:00 م",
];

export type DayStatus = "available" | "limited" | "booked" | "past";

export function getDayStatus(dateStr: string): DayStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + "T12:00:00");
  if (d < today) return "past";
  if (bookedDates.includes(dateStr)) return "booked";
  if (limitedDates.includes(dateStr)) return "limited";
  return "available";
}

export function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const AR_WEEKDAYS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
