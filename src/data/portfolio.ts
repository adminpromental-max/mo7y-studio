import { photoItems } from "./photoItems";

export type GallerySlug = "photos" | "videos" | "websites";

export { photoItems };

export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  slug: GallerySlug;
  image: string;
  count: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  /** صورة أو thumbnail — مسار محلي `/portfolio/...` أو رابط CDN/سيرفر */
  image: string;
  tag: string;
  aspect?: "square" | "portrait" | "landscape";
  /** رابط الفيديو — mp4 محلي أو YouTube/Vimeo */
  videoUrl?: string;
  /** رابط الموقع — لمعرض المواقع */
  siteUrl?: string;
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: "photos",
    title: "معرض الصور",
    description: "كتالوج صور احترافية في مختلف المجالات",
    slug: "photos",
    image: photoItems[0]?.image ?? "/mo7y-hero.png",
    count: photoItems.length,
  },
  {
    id: "videos",
    title: "معرض الفيديوهات",
    description: "فيديوهات طولية وعرضية بجودة إنتاج عالية",
    slug: "videos",
    image: "https://img.youtube.com/vi/8Zy51_MkOog/hqdefault.jpg",
    count: 2,
  },
  {
    id: "websites",
    title: "معرض المواقع",
    description: "مواقع ومتاجر وصفحات هبوط نفذناها لعملائنا",
    slug: "websites",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    count: 10,
  },
];

export const websiteFilters = [
  { id: "all", label: "الكل" },
  { id: "restaurant", label: "مطاعم" },
  { id: "cafe", label: "كافيهات" },
  { id: "ecommerce", label: "متاجر" },
  { id: "corporate", label: "شركات" },
  { id: "landing", label: "صفحات هبوط" },
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

export const videoItems: PortfolioItem[] = [
  {
    id: "v1",
    title: "Mo7y Studio — إنتاج فيديو",
    image: "https://img.youtube.com/vi/8Zy51_MkOog/hqdefault.jpg",
    tag: "horizontal",
    aspect: "landscape",
    videoUrl: "https://youtu.be/8Zy51_MkOog",
  },
  {
    id: "v2",
    title: "Mo7y Studio — Short",
    image: "https://img.youtube.com/vi/Mkfr99_uzPg/hqdefault.jpg",
    tag: "vertical",
    aspect: "portrait",
    videoUrl: "https://youtube.com/shorts/Mkfr99_uzPg",
  },
];

/**
 * لكل موقع: ضع screenshot في image و الرابط الحقيقي في siteUrl
 * مثال: image: "/portfolio/websites/restaurant-01.jpg"
 */
export const websiteItems: PortfolioItem[] = [
  {
    id: "ws1",
    title: "Mo7y Studio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85",
    tag: "corporate",
    aspect: "landscape",
    siteUrl: "https://mo7y.com",
  },
  {
    id: "ws2",
    title: "مطعم الذوق الرفيع",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
    tag: "restaurant",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws3",
    title: "كافيه لاونج",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85",
    tag: "cafe",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws4",
    title: "متجر أناقة",
    image: "https://images.unsplash.com/photo-1472851294607-062e8248de82?w=800&q=85",
    tag: "ecommerce",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws5",
    title: "شركة نمو للاستشارات",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    tag: "corporate",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws6",
    title: "صفحة إطلاق منتج",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85",
    tag: "landing",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws7",
    title: "مطعم بيتزا هاوس",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    tag: "restaurant",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws8",
    title: "براند كوفي",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85",
    tag: "cafe",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws9",
    title: "متجر عطور فاخرة",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85",
    tag: "ecommerce",
    aspect: "landscape",
    siteUrl: "#",
  },
  {
    id: "ws10",
    title: "ستارت أب تك",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85",
    tag: "corporate",
    aspect: "landscape",
    siteUrl: "#",
  },
];

export function getGalleryBySlug(slug: string) {
  return galleryCategories.find((c) => c.slug === slug);
}

export function getItemsForGallery(slug: GallerySlug) {
  if (slug === "photos") return photoItems;
  if (slug === "videos") return videoItems;
  return websiteItems;
}

export function getFiltersForGallery(slug: GallerySlug) {
  if (slug === "photos") return photoFilters;
  if (slug === "videos") return videoFilters;
  return websiteFilters;
}

export function isValidGallerySlug(slug: string): slug is GallerySlug {
  return slug === "photos" || slug === "videos" || slug === "websites";
}

export function isVideoEmbed(url: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

export function toEmbedUrl(url: string) {
  if (url.includes("youtube.com/shorts/")) {
    const id = url.split("shorts/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  return url;
}
