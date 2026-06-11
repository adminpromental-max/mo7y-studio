import { NextResponse } from "next/server";
import { changeAdminPassword } from "@/lib/admin-session";
import { isAdminAuthenticated, clearAdminSession, setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "غير مصرح" }, { status: 401 });
  }

  let current = "";
  let next = "";
  try {
    const body = await request.json();
    current = body.current ?? "";
    next = body.next ?? "";
  } catch {
    return NextResponse.json({ success: false, message: "بيانات غير صالحة" }, { status: 400 });
  }

  const result = await changeAdminPassword(current, next);
  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  await clearAdminSession();
  await setAdminSession();

  return NextResponse.json({ success: true, message: "تم تغيير كلمة المرور بنجاح" });
}
