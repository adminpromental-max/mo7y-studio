import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PortfolioGallery from "@/components/PortfolioGallery";
import {
  galleryCategories,
  getGalleryBySlug,
  getItemsForGallery,
  getFiltersForGallery,
} from "@/data/portfolio";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return galleryCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return { title: "غير موجود" };
  return {
    title: `${gallery.title} | Mo7y Studio`,
    description: gallery.description,
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery || (slug !== "photos" && slug !== "videos")) notFound();

  const items = getItemsForGallery(slug);
  const filters = getFiltersForGallery(slug);
  const isVideo = slug === "videos";

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <Image
            src={gallery.image}
            alt={gallery.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للأعمال
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {gallery.title}
              </h1>
              <p className="text-white/80">{gallery.description}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PortfolioGallery
            items={items}
            filters={filters}
            isVideo={isVideo}
          />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
