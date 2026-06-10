"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section id="partners" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            شركاء النجاح
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            عملنا مع علامات مميزة
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            فخورين بثقة عملائنا في مختلف القطاعات داخل المملكة
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-center h-20 sm:h-24 px-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-purple-50 hover:border-purple-200 transition-all"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="max-h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                />
              ) : (
                <span className="text-sm sm:text-base font-bold text-gray-400 group-hover:text-purple-600 text-center leading-tight transition-colors">
                  {partner.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
