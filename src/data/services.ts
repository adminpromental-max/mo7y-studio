import {
  Camera,
  Video,
  Film,
  Layers,
  Globe,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const mainServices: Service[] = [
  {
    id: "visual-content",
    title: "صناعة المحتوى البصري",
    description:
      "نبتكر الأفكار، نكتب السيناريو، ونصوّر وننتج محتوى احترافي يخدم علامتك التجارية — للشركات والأفراد.",
    icon: Layers,
  },
  {
    id: "photo",
    title: "تصوير فوتوغرافي",
    description:
      "صور احترافية تبرز تفاصيل منتجاتك ومطاعمك وكافيهاتك وفعالياتك — جاهزة للسوشيال ميديا والتسويق الرقمي.",
    icon: Camera,
  },
  {
    id: "video",
    title: "تصوير فيديو",
    description:
      "إنتاج فيديو 4K من الفكرة والتخطيط للتصوير والمونتاج والمعالجة — محتوى جاهز للنشر يعزز حضورك الرقمي.",
    icon: Video,
  },
  {
    id: "montage",
    title: "مونتاج احترافي",
    description:
      "مونتاج ومعالجة بصرية تشمل تصحيح الألوان والموشن جرافيك والمؤثرات — محتوى جاهز للنشر بأعلى جودة.",
    icon: Film,
  },
  {
    id: "web",
    title: "تصميم المواقع",
    description:
      "مواقع إلكترونية ومتاجر رقمية وصفحات هبوط تعزز حضورك، تحسّن تجربة المستخدم، وتحوّل الزوار لعملاء.",
    icon: Globe,
  },
  {
    id: "growth",
    title: "النمو الرقمي للمشاريع",
    description:
      "استراتيجيات تسويق مبنية على دراسة السوق وتحليل المنافسين وسلوك الجمهور — نحوّل حضورك الرقمي لنتائج ملموسة.",
    icon: TrendingUp,
  },
];

export const extraServiceChips = [
  "استراتيجية محتوى",
  "تصوير مطاعم",
  "تصوير كافيهات",
  "Reels & Shorts",
  "موشن جرافيك",
  "متاجر إلكترونية",
  "صفحات هبوط",
  "إعلانات ممولة",
  "SEO",
  "Brand Film",
];
