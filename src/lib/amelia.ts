const DEFAULT_BASE = "https://booking.mo7y.com";

function getBaseUrl() {
  return (process.env.AMELIA_API_URL || DEFAULT_BASE).replace(/\/$/, "");
}

function getApiKey() {
  return process.env.AMELIA_API_KEY || "";
}

function apiUrl(path: string) {
  const base = getBaseUrl();
  const call = `/api/v1${path.startsWith("/") ? path : `/${path}`}`;
  return `${base}/wp-admin/admin-ajax.php?action=wpamelia_api&call=${encodeURIComponent(call)}`;
}

export function isAmeliaConfigured() {
  return Boolean(getApiKey() && getBaseUrl());
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "—" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function formatSaudiPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("966")) return `+${digits}`;
  if (digits.startsWith("0")) return `+966${digits.slice(1)}`;
  if (digits.length === 9) return `+966${digits}`;
  return phone.trim();
}

interface AmeliaCustomerPayload {
  firstName: string;
  lastName: string;
  phone: string;
  countryPhoneIso?: string;
  note: string;
}

export async function createAmeliaCustomer(payload: AmeliaCustomerPayload) {
  if (!isAmeliaConfigured()) {
    return { success: false as const, message: "Amelia غير مفعّلة" };
  }

  const res = await fetch(apiUrl("/users/customers"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Amelia: getApiKey(),
    },
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      countryPhoneIso: payload.countryPhoneIso || "sa",
      note: payload.note,
      language: "ar",
    }),
  });

  let data: { message?: string; data?: { user?: { id?: number } } } = {};
  try {
    data = await res.json();
  } catch {
    return { success: false as const, message: "استجابة غير صالحة من Amelia" };
  }

  if (!res.ok) {
    return {
      success: false as const,
      message: data.message || "فشل إضافة العميل في Amelia",
    };
  }

  return {
    success: true as const,
    customerId: data.data?.user?.id,
    message: data.message,
  };
}

export interface QuizLeadInput {
  name: string;
  phone: string;
  region: string;
  quizResult?: string;
  quizServices?: string;
}

export async function sendQuizLeadToAmelia(input: QuizLeadInput) {
  const { firstName, lastName } = splitName(input.name);
  const phone = formatSaudiPhone(input.phone);

  const note = [
    "📋 عميل من كويز الموقع",
    `📍 المنطقة: ${input.region}`,
    input.quizResult ? `🎯 نتيجة الكويز: ${input.quizResult}` : null,
    input.quizServices ? `🛠 الخدمات المقترحة: ${input.quizServices}` : null,
    "🎁 كود الخصم: MO7Y20",
    `📅 ${new Date().toLocaleString("ar-SA")}`,
  ]
    .filter(Boolean)
    .join("\n");

  return createAmeliaCustomer({
    firstName,
    lastName,
    phone,
    note,
  });
}
