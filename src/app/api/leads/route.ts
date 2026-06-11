import { NextResponse } from "next/server";
import { readCmsStore, writeCmsStore, newId } from "@/lib/cms";

interface LeadPayload {
  name: string;
  phone: string;
  region: string;
  quizResult?: string;
  quizServices?: string;
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "خدمة الإرسال غير مفعّلة بعد" },
      { status: 503 }
    );
  }

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

  try {
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
    if (!data.success) {
      return NextResponse.json(
        { success: false, message: data.message || "فشل الإرسال" },
        { status: 502 }
      );
    }

    try {
      const store = await readCmsStore();
      store.leads.unshift({
        id: newId("lead"),
        name: name.trim(),
        phone: phone.trim(),
        region: region.trim(),
        quizResult,
        quizServices,
        createdAt: new Date().toISOString(),
      });
      await writeCmsStore(store);
    } catch {
      // التخزين المحلي اختياري — الإيميل هو الأساس
    }

    return NextResponse.json({ success: true, code: "MO7Y20" });
  } catch {
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء الإرسال" }, { status: 500 });
  }
}
