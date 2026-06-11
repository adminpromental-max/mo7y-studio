import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { readCmsStore, writeCmsStore, newId } from "@/lib/cms";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "غير مصرح" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") || "صورة جديدة");
  const tag = String(formData.get("tag") || "products");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ success: false, message: "لم يتم اختيار ملف" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".jpg";
  const safeName = `cms-${Date.now()}${ext}`;
  const dir = path.join(process.cwd(), "public/portfolio/photos/cms");
  await mkdir(dir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(dir, safeName), Buffer.from(bytes));

  const imagePath = `/portfolio/photos/cms/${safeName}`;
  const item = {
    id: newId("p"),
    title: title.trim(),
    image: imagePath,
    tag,
    aspect: "square" as const,
  };

  const store = await readCmsStore();
  store.photos.push(item);
  await writeCmsStore(store);

  return NextResponse.json({ success: true, item });
}
