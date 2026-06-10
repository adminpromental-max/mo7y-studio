"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { growthSteps } from "@/data/businessGrowth";

export default function BusinessGrowthPresentation() {
  return (
    <>
      {/* مقدمة */}
      <section className="py-16 sm:py-20 bg-white border-b border-purple-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            رحلة متكاملة من أول فكرة لحد الإطلاق — نمشي معك خطوة بخطوة كشريك
            استشاري يربط بين الاستراتيجية والتنفيذ والنمو الرقمي.
          </p>
        </div>
      </section>

      {growthSteps.map((step, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={step.id}
            id={step.id}
            className={`min-h-[85vh] flex items-center py-16 sm:py-24 scroll-mt-24 ${
              isEven ? "bg-white" : "bg-gradient-to-b from-purple-50/40 to-white"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
                {/* صورة معبّرة */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65 }}
                  className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${step.accent} opacity-30 mix-blend-multiply`}
                    />
                  </div>
                  <span
                    className={`absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.accent} text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl`}
                  >
                    {step.number}
                  </span>
                </motion.div>

                {/* النص */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                  className={`text-center lg:text-right ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="text-sm font-semibold text-purple-600 mb-2 block">
                    {step.subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                    {step.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3 text-right">
                    {step.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 justify-center lg:justify-start"
                      >
                        <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-20 sm:py-24 bg-purple-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            جاهز تبني مشروعك على أساس صح؟
          </h2>
          <p className="text-white/85 text-lg mb-8 leading-relaxed">
            احجز استشارة مع Mo7y Studio — نسمع فكرتك ونحدد معك أفضل خطوة
            تبدأ منها
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-colors shadow-xl"
          >
            احجز استشارتك المجانية
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
