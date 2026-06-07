import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const whatsappMessage = encodeURIComponent(
  "مرحباً، أود الاستفسار عن خدمات استوديو محيي"
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7" fill="white" />
    </a>
  );
}
