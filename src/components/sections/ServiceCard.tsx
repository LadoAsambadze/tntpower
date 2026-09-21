import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ServiceIcon";
import { serviceCategories, type ImagePosition, type Service } from "@/data/services";
import { cn } from "@/lib/cn";
import { getI18n } from "@/i18n/server";

const positionClass: Record<ImagePosition, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export async function ServiceCard({ service }: { service: Service }) {
  const { tr, href } = await getI18n();
  return (
    <Link
      href={href(`/services/${service.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:border-ink-900 hover:shadow-xl hover:shadow-ink-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-105",
            positionClass[service.image.position],
          )}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent"
          aria-hidden="true"
        />
        {/* კატეგორიის ლეიბლი — რედაქციული სტილი */}
        <span className="absolute top-3 left-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
          {tr(serviceCategories[service.category].label)}
        </span>
        <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-md bg-brand-500 text-ink-950">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink-950">{tr(service.title)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{tr(service.excerpt)}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <span className="text-sm font-semibold text-ink-800">{tr(service.price.label)}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4">
            {tr("დეტალურად")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
