import { NextResponse } from "next/server";
import { readCmsStore, writeCmsStore, newId } from "@/lib/cms";

function pickString(obj: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "string" && val.trim()) return val.trim();
  }
  return undefined;
}

function extractBookingInfo(payload: unknown) {
  const root = (payload && typeof payload === "object" ? payload : {}) as Record<
    string,
    unknown
  >;
  const data = (root.data && typeof root.data === "object"
    ? root.data
    : root) as Record<string, unknown>;

  const booking = (data.booking && typeof data.booking === "object"
    ? data.booking
    : data.appointment && typeof data.appointment === "object"
      ? data.appointment
      : data) as Record<string, unknown>;

  const customer = (booking.customer && typeof booking.customer === "object"
    ? booking.customer
    : data.customer && typeof data.customer === "object"
      ? data.customer
      : {}) as Record<string, unknown>;

  const service = (booking.service && typeof booking.service === "object"
    ? booking.service
    : data.service && typeof data.service === "object"
      ? data.service
      : {}) as Record<string, unknown>;

  const firstName = pickString(customer, ["firstName", "first_name"]);
  const lastName = pickString(customer, ["lastName", "last_name"]);
  const customerName =
    [firstName, lastName].filter(Boolean).join(" ") ||
    pickString(customer, ["fullName", "name"]);

  return {
    customerName,
    customerPhone: pickString(customer, ["phone", "phoneNumber"]),
    customerEmail: pickString(customer, ["email"]),
    serviceName: pickString(service, ["name", "serviceName"]),
    bookingStart: pickString(booking, [
      "bookingStart",
      "appointmentStart",
      "start",
      "dateTime",
    ]),
    status: pickString(booking, ["status"]),
    action: pickString(root, ["action", "type"]) || "booking",
  };
}

export async function POST(request: Request) {
  const secret = process.env.AMELIA_WEBHOOK_SECRET;
  if (secret) {
    const header =
      request.headers.get("x-amelia-secret") ||
      request.headers.get("x-webhook-secret");
    if (header !== secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const info = extractBookingInfo(payload);

  try {
    const store = await readCmsStore();
    store.ameliaBookings.unshift({
      id: newId("booking"),
      action: info.action,
      customerName: info.customerName,
      customerPhone: info.customerPhone,
      customerEmail: info.customerEmail,
      serviceName: info.serviceName,
      bookingStart: info.bookingStart,
      status: info.status,
      raw: payload,
      createdAt: new Date().toISOString(),
    });

    if (info.customerName && info.customerPhone) {
      store.leads.unshift({
        id: newId("lead"),
        name: info.customerName,
        phone: info.customerPhone,
        region: info.serviceName || "حجز Amelia",
        quizResult: `حجز — ${info.serviceName || "موعد"}`,
        source: "amelia",
        createdAt: new Date().toISOString(),
      });
    }

    await writeCmsStore(store);
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
