"use client";

import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { AMELIA_BOOKING_URL, SITE } from "@/lib/constants";

export default function AmeliaBooking() {
  if (!AMELIA_BOOKING_URL) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-10 text-center shadow-lg border border-purple-100">
          <Calendar className="w-14 h-14 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            نظام الحجز قريباً
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            أضف رابط Amelia في إعدادات Vercel:
            <br />
            <code className="text-purple-600 text-xs mt-2 block">
              NEXT_PUBLIC_AMELIA_BOOKING_URL
            </code>
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("مرحباً، أبغى أحجز استشارة")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            احجز عبر واتساب
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-t border-gray-200">
      <iframe
        src={AMELIA_BOOKING_URL}
        title="حجز موعد — Mo7y Studio"
        className="w-full border-0"
        style={{ minHeight: "calc(100dvh - 12rem)" }}
        allow="payment; fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="text-center text-xs text-gray-400 py-3">
        الحجز يتم عبر نظام Amelia — كل المواعيد تظهر في لوحة التحكم
      </p>
    </div>
  );
}
