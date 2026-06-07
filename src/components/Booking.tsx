"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Settings,
  Clock,
  Calendar,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const serviceOptions = [
  "تصوير فوتوغرافي",
  "تصوير فيديو",
  "تصوير مطاعم",
  "تصوير كافيهات",
  "مونتاج احترافي",
  "موشن جرافيك",
  "فيديوهات طولية",
  "فيديوهات عرضية",
  "تصوير فعاليات",
  "إنتاج إبداعي",
];

const timeOptions = [
  "9:00 ص",
  "10:00 ص",
  "11:00 ص",
  "12:00 م",
  "1:00 م",
  "2:00 م",
  "3:00 م",
  "4:00 م",
  "5:00 م",
  "6:00 م",
  "7:00 م",
  "8:00 م",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            احجز جلسة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            احجز موعدك الآن
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر الخدمة والتاريخ المناسب وسنتواصل معك لتأكيد الحجز
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                تم إرسال طلب الحجز!
              </h3>
              <p className="text-gray-600">
                سنتواصل معك قريباً لتأكيد الموعد
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    required
                    className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                    className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                  className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <Settings className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <select
                    required
                    className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all appearance-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      الخدمة المطلوبة
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <select
                    required
                    className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all appearance-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      الوقت المفضل
                    </option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="date"
                  required
                  className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute right-3 top-4 w-5 h-5 text-purple-400" />
                <textarea
                  placeholder="ملاحظات إضافية..."
                  rows={3}
                  className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                تأكيد الحجز
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
