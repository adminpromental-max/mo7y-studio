"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Camera,
  Users,
  Zap,
  Heart,
  Star,
  Target,
} from "lucide-react";
import { CHARACTER_IMAGE } from "@/lib/constants";

const checkpoints = [
  {
    icon: Award,
    title: "خبرة +10 سنوات",
    description: "في مجال التصوير والإنتاج المرئي",
  },
  {
    icon: Camera,
    title: "أحدث المعدات",
    description: "كاميرات وإضاءة ومعدات احترافية",
  },
  {
    icon: Users,
    title: "فريق متخصص",
    description: "مصورين ومحررين ومبدعين محترفين",
  },
  {
    icon: Zap,
    title: "تسليم سريع",
    description: "التزام بالمواعيد وجودة عالية",
  },
];

const chips = [
  { label: "تصوير مطاعم", color: "bg-purple-100 text-purple-700" },
  { label: "تصوير كافيهات", color: "bg-amber-100 text-amber-700" },
  { label: "Reels & Shorts", color: "bg-red-100 text-red-700" },
  { label: "مونتاج 4K", color: "bg-cyan-100 text-cyan-700" },
  { label: "موشن جرافيك", color: "bg-indigo-100 text-indigo-700" },
  { label: "Color Grading", color: "bg-pink-100 text-pink-700" },
  { label: "تصوير منتجات", color: "bg-green-100 text-green-700" },
  { label: "Brand Film", color: "bg-orange-100 text-orange-700" },
  { label: "تصوير فعاليات", color: "bg-blue-100 text-blue-700" },
  { label: "YouTube", color: "bg-rose-100 text-rose-700" },
];

const stats = [
  { value: "+500", label: "مشروع منجز", icon: Target },
  { value: "+200", label: "عميل سعيد", icon: Heart },
  { value: "+10", label: "سنوات خبرة", icon: Star },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Character — mobile first, desktop left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative max-w-[340px] sm:max-w-[380px] mx-auto">
              <div className="relative aspect-[3/4] min-h-[420px] sm:min-h-[480px]">
                <Image
                  src={CHARACTER_IMAGE}
                  alt="محيي — Mo7y Studio"
                  fill
                  unoptimized
                  className="object-contain object-bottom drop-shadow-xl"
                  sizes="(max-width: 1024px) 90vw, 380px"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-6 w-full max-w-xs z-10">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 text-center border border-gray-100"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-base sm:text-lg font-bold text-purple-600">
                          {stat.value}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content — mobile second, desktop right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 text-center lg:text-right pt-8 lg:pt-0"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              تعرف علينا
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              من نحن
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              <strong className="text-gray-900">Mo7y Studio</strong> هو وجهتك
              المثالية لخدمات التصوير والإنتاج المرئي الاحترافية. نمتلك خبرة
              تتجاوز 10 سنوات في مجال التصوير والمونتاج، ونستخدم أحدث المعدات
              والتقنيات لضمان حصولك على أفضل النتائج.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {checkpoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors text-right"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${chip.color} hover:scale-105 transition-transform cursor-default`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
