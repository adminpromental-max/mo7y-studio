export const SITE = {
  name: "Mo7y Studio",
  nameAr: "استوديو محيي",
  tagline: "نحول لحظاتك إلى ذكريات خالدة",
  description:
    "خدمات تصوير ومونتاج احترافية بأحدث المعدات وأفضل الخبرات",
  url: "https://mo7y.com",
  whatsapp: "966500000000",
  email: "info@mo7y.com",
  phone: "+966 50 000 0000",
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

/** Assets in public/ */
export const HERO_IMAGE = "/camera-hero.png";
export const LOGO_IMAGE = "/logo.png";
export const CHARACTER_IMAGE = "/mo7y-character.png";
export const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1606986628038-453617814375?w=800&q=80";

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
