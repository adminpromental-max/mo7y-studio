import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AmeliaBooking from "@/components/AmeliaBooking";

export const metadata: Metadata = {
  title: "احجز استشارة | Mo7y Studio",
  description: "احجز موعد استشارتك مع Mo7y Studio",
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 text-sm mb-4 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            احجز استشارتك
          </h1>
          <p className="text-gray-600 mb-6">
            اختر الموعد المناسب وسنتواصل معك لتأكيد الحجز
          </p>
        </div>
        <AmeliaBooking />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
