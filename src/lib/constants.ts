export const SITE = {
  name: "Mo7y Studio",
  nameAr: "استوديو محيي",
  tagline: "شريكك في بناء ونمو علامتك التجارية",
  taglineSub: "نبني حضورك.. ونسرّع نمو أعمالك",
  description:
    "من الاستراتيجية وصناعة المحتوى للإنتاج البصري والمواقع والتسويق — كل ما يحتاجه مشروعك للنمو في مكان واحد.",
  url: "https://mo7y.com",
  whatsapp: "966554297985",
  email: "info@mo7y.com",
  phone: "+966 55 429 7985",
  address: "المملكة العربية السعودية",
  social: {
    instagram: "https://instagram.com/mo7ystudio",
    facebook: "https://facebook.com/mo7ystudio",
    youtube: "https://youtube.com/@mo7ystudio",
    twitter: "https://x.com/mo7ystudio",
  },
  hours: {
    weekdays: "السبت - الخميس: 9:00 ص - 10:00 م",
    friday: "الجمعة: 2:00 م - 10:00 م",
  },
} as const;

export const HERO_IMAGE = "/mo7y-hero.png";
export const HERO_IMAGE_FALLBACK = "/mo7y-character.png";

/** صفحة الحجز على Amelia — WordPress subdomain */
export const AMELIA_BOOKING_URL =
  process.env.NEXT_PUBLIC_AMELIA_BOOKING_URL ??
  "https://booking.mo7y.com/";
export const LOGO_IMAGE = "/logo.png";
export const CHARACTER_IMAGE = "/mo7y-character.png";

export const COLORS = {
  primary: "#6B28D9",
  primaryLight: "#8B5CF6",
  primaryDark: "#4C1D95",
  accentYellow: "#F5A623",
  accentRed: "#E63B3B",
  accentCyan: "#00B4D8",
  dark: "#1A1A2E",
  darkFooter: "#0F1729",
} as const;
