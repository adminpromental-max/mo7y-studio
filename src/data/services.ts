import { Camera, Video, Film, Sparkles, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const mainServices: Service[] = [
  {
    id: "photo",
    title: "تصوير فوتوغرافي",
    description:
      "تصوير احترافي للأفراد والمنتجات والمطاعم والكافيهات والفعاليات.",
    icon: Camera,
  },
  {
    id: "video",
    title: "تصوير فيديو",
    description:
      "إنتاج 4K — فيديوهات طولية (Reels/TikTok) وعرضية (YouTube/إعلانات).",
    icon: Video,
  },
  {
    id: "montage",
    title: "مونتاج احترافي",
    description: "مونتاج، موشن جرافيك، ومؤثرات بصرية مع Color Grading.",
    icon: Film,
  },
  {
    id: "creative",
    title: "إنتاج إبداعي",
    description: "حلول بصرية متكاملة من الفكرة إلى التسليم النهائي.",
    icon: Sparkles,
  },
];

export const extraServiceChips = [
  "تصوير مطاعم",
  "تصوير كافيهات",
  "تصوير فعاليات",
  "تصوير شركات",
  "تصوير منتجات",
  "موشن جرافيك",
  "Color Grading",
  "Reels & Shorts",
  "Brand Film",
  "YouTube",
];
