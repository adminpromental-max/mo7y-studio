import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { PortfolioItem } from "@/data/portfolio";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  region: string;
  quizResult?: string;
  quizServices?: string;
  createdAt: string;
}

export interface CmsStore {
  videos: PortfolioItem[];
  websites: PortfolioItem[];
  photos: PortfolioItem[];
  leads: LeadRecord[];
  /** كلمة مرور مشفّرة — بعد تغييرها من اللوحة */
  adminPasswordHash?: string;
}

const STORE_PATH = path.join(process.cwd(), "data/cms-store.json");

const emptyStore: CmsStore = {
  videos: [],
  websites: [],
  photos: [],
  leads: [],
};

export async function readCmsStore(): Promise<CmsStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsStore>;
    return {
      videos: parsed.videos ?? [],
      websites: parsed.websites ?? [],
      photos: parsed.photos ?? [],
      leads: parsed.leads ?? [],
      adminPasswordHash: parsed.adminPasswordHash,
    };
  } catch {
    return { ...emptyStore };
  }
}

export async function writeCmsStore(store: CmsStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}
