import {
  getStaticItemsForGallery,
  type GallerySlug,
} from "@/data/portfolio";
import { readCmsStore } from "@/lib/cms";

export async function getItemsForGallery(slug: GallerySlug) {
  const cms = await readCmsStore();
  const staticItems = getStaticItemsForGallery(slug);

  if (slug === "photos") return [...staticItems, ...cms.photos];
  if (slug === "videos") return [...staticItems, ...cms.videos];
  return [...staticItems, ...cms.websites];
}
