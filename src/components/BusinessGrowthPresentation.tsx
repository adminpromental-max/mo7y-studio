"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { growthSteps } from "@/data/businessGrowth";
import Partners from "./Partners";

export default function BusinessGrowthPresentation() {
  return (
    <>
      {growthSteps.map((step, index) => {
        const Icon = step.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={step.id}
            className={`min-h-[70vh] flex items-center py-16 sm:py-24 ${
              isEven ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto ${
                  isEven ? "" : "lg:[direction:ltr]"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`${isEven ? "lg:order-2" : "lg:order-1"} text-center lg:text-right`}
                >
                  <span className="text-6xl sm:text-8xl font-black text-purple-100 block mb-2 leading-none">
                    {step.number}
                  </span>
                  <span className="text-sm font-semibold text-purple-600 mb-2 block">
                    {step.subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 lg:mr-0">
                    {step.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`${isEven ? "lg:order-1" : "lg:order-2"} flex justify-center`}
                >
                  <div
                    className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br ${step.accent} shadow-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-20 h-20 sm:w-28 sm:h-28 text-white/90" />
                    <div className="absolute -inset-4 rounded-[2rem] border-2 border-purple-200/40 -z-10" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-20 bg-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            جاهز تبدأ رحلتك؟
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            احجز استشارة مجانية مع Mo7y Studio ونخطط لمشروعك سوا
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-colors shadow-xl"
          >
            احجز استشارتك
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Partners />
    </>
  );
}
