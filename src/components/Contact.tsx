"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const whatsappMessage = encodeURIComponent(
  "مرحباً، أود الاستفسار عن خدمات استوديو محيي"
);

export default function Contact() {
  const cards = [
    {
      icon: Phone,
      title: "الهاتف",
      value: SITE.phone,
      href: `tel:+${SITE.whatsapp}`,
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      value: SITE.phone,
      href: `https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`,
      external: true,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: MapPin,
      title: "الموقع",
      value: SITE.address,
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      value: SITE.hours.weekdays,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            نحن هنا لمساعدتك
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            لا تتردد في التواصل معنا لأي استفسار أو طلب عرض سعر
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {cards.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`bg-gray-50 rounded-2xl p-6 text-center transition-colors group h-full ${
                  item.href
                    ? "hover:bg-purple-50 cursor-pointer"
                    : "hover:bg-purple-50/50"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                    item.title === "واتساب"
                      ? "bg-green-100 group-hover:bg-green-500"
                      : "bg-purple-100 group-hover:bg-purple-600"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      item.title === "واتساب"
                        ? "text-green-600 group-hover:text-white"
                        : "text-purple-600 group-hover:text-white"
                    }`}
                    fill={item.title === "واتساب" ? "currentColor" : undefined}
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600" dir={item.title === "الهاتف" || item.title === "واتساب" ? "ltr" : undefined}>
                  {item.value}
                </p>
              </motion.div>
            );

            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {content}
              </a>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
