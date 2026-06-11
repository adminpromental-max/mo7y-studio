import { NextResponse } from "next/server";
import { verifyPassword, isAdminConfigured } from "@/lib/admin-session";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminConfigured())) {
    return NextResponse.json(
      { success: false, message: "لوحة التحكم غير مفعّلة — أضف ADMIN_PASSWORD في Vercel" },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ success: false, message: "بيانات غير صالحة" }, { status: 400 });
  }

  if (!(await verifyPassword(password))) {
    return NextResponse.json({ success: false, message: "كلمة المرور غير صحيحة" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ success: true });
}
