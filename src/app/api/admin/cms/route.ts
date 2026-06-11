import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readCmsStore, writeCmsStore, newId } from "@/lib/cms";
import { youtubeThumb } from "@/data/videos";
import type { PortfolioItem } from "@/data/portfolio";

async function guard() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;

  const store = await readCmsStore();
  return NextResponse.json({ success: true, data: store });
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const { action, type, item, id } = body as {
    action: "add" | "delete";
    type: "videos" | "websites" | "photos";
    item?: Partial<PortfolioItem>;
    id?: string;
  };

  const store = await readCmsStore();

  if (action === "add" && item) {
    const entry: PortfolioItem = {
      id: newId(type.slice(0, 1)),
      title: item.title?.trim() || "عمل جديد",
      image: item.image?.trim() || "",
      tag: item.tag?.trim() || "all",
      aspect: item.aspect || "landscape",
      videoUrl: item.videoUrl,
      siteUrl: item.siteUrl,
    };

    if (type === "videos" && item.videoUrl) {
      entry.image = item.image?.trim() || youtubeThumb(item.videoUrl);
      entry.aspect =
        item.aspect ||
        (/shorts|vertical/i.test(item.videoUrl) ? "portrait" : "landscape");
      entry.tag = item.tag || (entry.aspect === "portrait" ? "vertical" : "horizontal");
    }

    if (type === "websites") {
      entry.siteUrl = item.siteUrl?.trim() || "#";
      entry.aspect = "landscape";
    }

    if (!entry.image) {
      return NextResponse.json(
        { success: false, message: "الصورة مطلوبة" },
        { status: 400 }
      );
    }

    store[type].push(entry);
    await writeCmsStore(store);
    return NextResponse.json({ success: true, item: entry });
  }

  if (action === "delete" && id) {
    store[type] = store[type].filter((x) => x.id !== id);
    await writeCmsStore(store);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: "طلب غير صالح" }, { status: 400 });
}
