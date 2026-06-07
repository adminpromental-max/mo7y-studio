"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Settings,
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import { serviceOptions, timeOptions } from "@/data/booking";
import { SITE } from "@/lib/constants";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedDate) {
      setError("يرجى اختيار تاريخ من التقويم");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          time: data.get("time"),
          date: selectedDate,
          location: data.get("location"),
          notes: data.get("notes"),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "فشل إرسال الطلب");
        return;
      }

      setSubmitted(true);
      form.reset();
      setSelectedDate("");
    } catch {
      setError("تعذّر الاتصال، تحقق من الإنترنت وحاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-gray-50 to-purple-50/30 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            احجز جلسة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            احجز موعدك الآن
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر التاريخ من التقويم، عبّئ بياناتك، ويصلك تأكيد فوري على بريد الاستوديو
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-emerald-100"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              تم إرسال طلب الحجز!
            </h3>
            <p className="text-gray-600 mb-6">
              شكراً لك! سيتواصل معك فريق {SITE.nameAr} قريباً لتأكيد الموعد.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("مرحباً، أرسلت طلب حجز عبر الموقع وأود التأكيد")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              تواصل عبر واتساب
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="block w-full mt-4 text-sm text-purple-600 hover:text-purple-800"
            >
              حجز موعد آخر
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="order-1 lg:order-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={User}>
                  <input
                    name="name"
                    type="text"
                    placeholder="الاسم الكامل"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field icon={Phone}>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="رقم الجوال"
                    required
                    dir="ltr"
                    className={`${inputClass} text-left`}
                  />
                </Field>
              </div>

              <Field icon={Mail}>
                <input
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  required
                  dir="ltr"
                  className={`${inputClass} text-left`}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={Settings}>
                  <select name="service" required className={selectClass} defaultValue="">
                    <option value="" disabled>
                      الخدمة المطلوبة
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field icon={Clock}>
                  <select name="time" required className={selectClass} defaultValue="">
                    <option value="" disabled>
                      الوقت المفضل
                    </option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field icon={MapPin}>
                <input
                  name="location"
                  type="text"
                  placeholder="موقع الفعالية / المكان"
                  className={inputClass}
                />
              </Field>

              <Field icon={MessageSquare} alignTop>
                <textarea
                  name="notes"
                  placeholder="ملاحظات إضافية (نوع الحدث، عدد الساعات...)"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-l from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    تأكيد الحجز
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                بالضغط على تأكيد الحجز، يصل إشعار فوري إلى بريد الاستوديو
              </p>
            </motion.form>
          </div>
        )}
      </div>
    </section>
  );
}

const inputClass =
  "w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white";

const selectClass = `${inputClass} appearance-none`;

function Field({
  icon: Icon,
  children,
  alignTop,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  alignTop?: boolean;
}) {
  return (
    <div className="relative">
      <Icon
        className={`absolute right-3 w-5 h-5 text-purple-400 pointer-events-none ${
          alignTop ? "top-4" : "top-1/2 -translate-y-1/2"
        }`}
      />
      {children}
    </div>
  );
}
