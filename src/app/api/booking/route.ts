import { NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location?: string;
  notes?: string;
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      {
        success: false,
        message:
          "خدمة البريد غير مفعّلة بعد. يرجى إضافة WEB3FORMS_ACCESS_KEY في إعدادات Vercel.",
      },
      { status: 503 }
    );
  }

  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "بيانات غير صالحة" },
      { status: 400 }
    );
  }

  const { name, email, phone, service, date, time, location, notes } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !service || !date || !time) {
    return NextResponse.json(
      { success: false, message: "يرجى تعبئة جميع الحقول المطلوبة" },
      { status: 400 }
    );
  }

  const messageLines = [
    `📅 تاريخ الحجز: ${date}`,
    `⏰ الوقت: ${time}`,
    `🎬 الخدمة: ${service}`,
    `📱 الجوال: ${phone}`,
    location ? `📍 موقع الفعالية: ${location}` : null,
    notes ? `\n📝 ملاحظات:\n${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `🎥 حجز جديد — ${name} | ${service}`,
        from_name: name,
        email,
        phone,
        service,
        date,
        time,
        location: location || "—",
        message: messageLines,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: data.message || "فشل إرسال الطلب" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال طلب الحجز بنجاح",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء الإرسال، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}
