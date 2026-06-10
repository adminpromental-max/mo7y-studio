"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Booking() {
  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-gray-50 to-purple-50/30 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            احجز استشارة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            جاهز تنمو مشروعك؟
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            احجز استشارتك مع Mo7y Studio — نتناقش في احتياجك ونخطط للخطوة الجاية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30"
            >
              <Calendar className="w-5 h-5" />
              احجز موعدك
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("مرحباً، أبغى أحجز استشارة مع Mo7y Studio")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              واتساب
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
