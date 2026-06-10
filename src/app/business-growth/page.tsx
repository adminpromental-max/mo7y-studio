import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BusinessGrowthPresentation from "@/components/BusinessGrowthPresentation";

export const metadata: Metadata = {
  title: "تطوير الأعمال | Mo7y Studio",
  description:
    "من الفكرة للإطلاق — رحلة بناء ونمو مشروعك مع Mo7y Studio",
};

export default function BusinessGrowthPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="bg-purple-600 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/#services"
              className="inline-block text-white/70 hover:text-white text-sm mb-4"
            >
              ← العودة للرئيسية
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              تطوير الأعمال
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              من أول فكرة لحد الإطلاق — نمشي معك خطوة بخطوة
            </p>
          </div>
        </div>
        <BusinessGrowthPresentation />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
