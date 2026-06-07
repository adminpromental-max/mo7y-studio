export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  slug: "photos" | "videos";
  image: string;
  count: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  tag: string;
  aspect?: "square" | "portrait" | "landscape";
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: "photos",
    title: "معرض الصور",
    description: "كتالوج صور احترافية في مختلف المجالات",
    slug: "photos",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    count: 32,
  },
  {
    id: "videos",
    title: "معرض الفيديوهات",
    description: "فيديوهات طولية وعرضية بجودة إنتاج عالية",
    slug: "videos",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    count: 16,
  },
];

export const photoFilters = [
  { id: "all", label: "الكل" },
  { id: "cafes", label: "كافيهات" },
  { id: "restaurants", label: "مطاعم" },
  { id: "events", label: "فعاليات" },
  { id: "products", label: "منتجات" },
];

export const videoFilters = [
  { id: "all", label: "الكل" },
  { id: "vertical", label: "طولية" },
  { id: "horizontal", label: "عرضية" },
  { id: "restaurants", label: "مطاعم" },
  { id: "cafes", label: "كافيهات" },
];

export const photoItems: PortfolioItem[] = [
  {
    id: "r1",
    title: "مطعم الذوق الرفيع",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    tag: "restaurants",
  },
  {
    id: "r2",
    title: "طبق ستيك مشوي",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    tag: "restaurants",
  },
  {
    id: "r3",
    title: "أجواء المطعم",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    tag: "restaurants",
  },
  {
    id: "c1",
    title: "Latte Art",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    tag: "cafes",
  },
  {
    id: "c2",
    title: "ديكور الكافيه",
    image:
      "https://images.unsplash.com/photo-1453614512568-c40249d47910?w=600&q=80",
    tag: "cafes",
  },
  {
    id: "c3",
    title: "مشروبات باردة",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    tag: "cafes",
  },
  {
    id: "e1",
    title: "مؤتمر تقني",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    tag: "events",
  },
  {
    id: "e2",
    title: "حفل زفاف",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    tag: "events",
  },
  {
    id: "p1",
    title: "ساعة فاخرة",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    tag: "products",
  },
  {
    id: "p2",
    title: "عطر",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    tag: "products",
  },
];

export const videoItems: PortfolioItem[] = [
  {
    id: "vv1",
    title: "Reel - مطعم",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    tag: "vertical",
    aspect: "portrait",
  },
  {
    id: "vv2",
    title: "TikTok - كافيه",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    tag: "vertical",
    aspect: "portrait",
  },
  {
    id: "vv3",
    title: "Short - منتج",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    tag: "vertical",
    aspect: "portrait",
  },
  {
    id: "hv1",
    title: "فيديو تعريفي - شركة",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    tag: "horizontal",
    aspect: "landscape",
  },
  {
    id: "hv2",
    title: "إعلان تجاري",
    image:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    tag: "horizontal",
    aspect: "landscape",
  },
  {
    id: "hv3",
    title: "YouTube - مطبخ",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    tag: "horizontal",
    aspect: "landscape",
  },
  {
    id: "vr1",
    title: "Reel - مطعم",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    tag: "restaurants",
    aspect: "portrait",
  },
  {
    id: "vc1",
    title: "Reel - كافيه",
    image:
      "https://images.unsplash.com/photo-1495474472283-4d789bc02bc5?w=600&q=80",
    tag: "cafes",
    aspect: "portrait",
  },
];

export function getGalleryBySlug(slug: string) {
  return galleryCategories.find((c) => c.slug === slug);
}

export function getItemsForGallery(slug: "photos" | "videos") {
  return slug === "photos" ? photoItems : videoItems;
}

export function getFiltersForGallery(slug: "photos" | "videos") {
  return slug === "photos" ? photoFilters : videoFilters;
}
