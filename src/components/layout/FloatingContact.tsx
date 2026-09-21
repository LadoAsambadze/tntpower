import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";

/** მუდმივი „დარეკვა / WhatsApp" ღილაკები — ძირითადად მობილურისთვის */
export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 print:hidden">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="მოგვწერეთ WhatsApp-ში"
        className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
      <a
        href={site.phoneHref}
        aria-label="დაგვირეკეთ"
        className="flex size-13 items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-lg shadow-black/25 transition-transform hover:scale-105 lg:hidden"
      >
        <Phone className="size-6" aria-hidden="true" />
      </a>
    </div>
  );
}
