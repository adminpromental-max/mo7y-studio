import type { PortfolioItem } from "./portfolio";

/** أضف فيديو جديد هنا — أو من لوحة التحكم لاحقاً */
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
  // أضف فيديوهات جديدة هنا بنفس الشكل:
  // {
  //   id: "v3",
  //   title: "عنوان الفيديو",
  //   image: "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg",
  //   tag: "vertical", // أو horizontal / restaurants / cafes
  //   aspect: "portrait", // portrait للطولي — landscape للعرضي
  //   videoUrl: "https://youtu.be/VIDEO_ID",
  // },
];

export function youtubeThumb(url: string) {
  const shorts = url.match(/shorts\/([^?&]+)/);
  if (shorts) return `https://img.youtube.com/vi/${shorts[1]}/hqdefault.jpg`;
  const be = url.match(/youtu\.be\/([^?&]+)/);
  if (be) return `https://img.youtube.com/vi/${be[1]}/hqdefault.jpg`;
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return `https://img.youtube.com/vi/${watch[1]}/hqdefault.jpg`;
  return "";
}
