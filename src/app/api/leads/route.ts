import { NextResponse } from "next/server";
import { readCmsStore, writeCmsStore, newId } from "@/lib/cms";
import { isAmeliaConfigured, sendQuizLeadToAmelia } from "@/lib/amelia";

interface LeadPayload {
  name: string;
  phone: string;
  region: string;
  quizResult?: string;
  quizServices?: string;
}

async function notifyWeb3Forms(body: LeadPayload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { ok: false, skipped: true };

  const { name, phone, region, quizResult, quizServices } = body;
  const message = [
    `📋 عميل محتمل من الكويز`,
    `👤 الاسم: ${name}`,
    `📱 واتساب: ${phone}`,
    `📍 المنطقة: ${region}`,
    quizResult ? `🎯 نتيجة الكويز: ${quizResult}` : null,
    quizServices ? `🛠 الخدمات المقترحة: ${quizServices}` : null,
    `🎁 كود الخصم المعروض: MO7Y20`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `🎯 عميل كويز جديد — ${name} | ${region}`,
      from_name: name,
      phone,
      region,
      message,
    }),
  });

  const data = await res.json();
  return { ok: res.ok && data.success, skipped: false };
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "بيانات غير صالحة" }, { status: 400 });
  }

  const { name, phone, region, quizResult, quizServices } = body;

  if (!name?.trim() || !phone?.trim() || !region?.trim()) {
    return NextResponse.json(
      { success: false, message: "يرجى تعبئة جميع الحقول" },
      { status: 400 }
    );
  }

  const trimmed = {
    name: name.trim(),
    phone: phone.trim(),
    region: region.trim(),
    quizResult,
    quizServices,
  };

  // Amelia API — فقط لو Elite ومفعّل
  if (isAmeliaConfigured()) {
    await sendQuizLeadToAmelia(trimmed);
  }

  await notifyWeb3Forms(trimmed);

  try {
    const store = await readCmsStore();
    store.leads.unshift({
      id: newId("lead"),
      ...trimmed,
      source: "quiz",
      createdAt: new Date().toISOString(),
    });
    await writeCmsStore(store);
  } catch {
    return NextResponse.json(
      { success: false, message: "تعذّر حفظ البيانات" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, code: "MO7Y20" });
}
