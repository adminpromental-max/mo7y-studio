import {
  Lightbulb,
  Search,
  FileText,
  Palette,
  Megaphone,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface GrowthStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const growthSteps: GrowthStep[] = [
  {
    id: "idea",
    number: "01",
    title: "الفكرة والرؤية",
    subtitle: "نبدأ من وين أنت",
    description:
      "نفهم فكرتك، جمهورك، وأهدافك التجارية. نحوّل الرؤية لخطة واضحة تخدم نمو مشروعك من أول يوم.",
    icon: Lightbulb,
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: "market",
    number: "02",
    title: "دراسة السوق",
    subtitle: "نعرف المنافسين والجمهور",
    description:
      "نحلل السوق السعودي، المنافسين، وسلوك العملاء. البيانات تساعدنا نبني استراتيجية مبنية على واقع مشروعك.",
    icon: Search,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "plan",
    number: "03",
    title: "خطة العمل",
    subtitle: "خارطة طريق واضحة",
    description:
      "نضع خطة عمل عملية: التسعير، القنوات، الجدول الزمني، ومؤشرات النجاح — عشان تعرف وين رايح بالضبط.",
    icon: FileText,
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "brand",
    number: "04",
    title: "الهوية والمحتوى",
    subtitle: "براند يفرق",
    description:
      "نصمم هويتك البصرية وننتج محتوى احترافي — صور، فيديو، ومونتاج يعكس جودة مشروعك ويقوّي ثقة عملاءك.",
    icon: Palette,
    accent: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "marketing",
    number: "05",
    title: "التسويق الرقمي",
    subtitle: "وصول ونتائج",
    description:
      "حملات سوشيال ميديا، إعلانات ممولة، وSEO — نحوّل حضورك الرقمي لعملاء فعليين ونتائج قابلة للقياس.",
    icon: Megaphone,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "launch",
    number: "06",
    title: "الإطلاق والنمو",
    subtitle: "انطلق بقوة",
    description:
      "نطلق مشروعك بموقع احترافي وحملة إطلاق متكاملة، ونتابع معك بعد الإطلاق عشان النمو يستمر.",
    icon: Rocket,
    accent: "from-purple-600 to-violet-800",
  },
];
