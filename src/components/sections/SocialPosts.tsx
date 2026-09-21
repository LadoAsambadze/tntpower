import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { socialPosts } from "@/data/projects";
import { site } from "@/data/site";
import { getI18n } from "@/i18n/server";

/** ბრენდის სოციალური პოსტების ლენტა */
export async function SocialPosts() {
  const { tr } = await getI18n();
  const instagram = site.social.find((s) => s.label === "Instagram")?.href ?? "#";

  return (
    <section className="bg-paper py-14 sm:py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={tr("სოციალური ქსელები")}
            title={tr("გამოგვყევით სოციალურ ქსელებში")}
            description={tr("პროექტების ისტორიები, „რამდენი ღირს?“ პასუხები და Before / After — ისე, როგორც რეალურად ვმუშაობთ.")}
          />
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 self-start text-sm font-semibold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4 md:self-auto"
          >
            Instagram
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10">
          <Carousel
            label={tr("სოციალური პოსტები")}
            perView="[--per-view:1.7] sm:[--per-view:3] lg:[--per-view:4] xl:[--per-view:5]"
            gap="[--gap:1rem]"
          >
            {socialPosts.map((post) => (
              <a
                key={post.src}
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Image
                  src={post.src}
                  alt={tr(post.alt)}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 60vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
