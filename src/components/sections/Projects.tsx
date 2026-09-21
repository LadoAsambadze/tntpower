import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/brand/Reveal";
import { VideoReel } from "@/components/brand/VideoReel";
import { BeforeAfterSlider } from "@/components/brand/BeforeAfterSlider";
import { projectReel, projects, type Project } from "@/data/projects";

const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-ink-900 text-white">
      <div className="relative aspect-[4/5]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-brand-400">
          {project.category}
        </p>
        <h3 className="font-display mt-1 text-xl font-semibold leading-tight">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">{project.description}</p>
      </div>
    </article>
  );
}

/**
 * ნამუშევრები — ზემოთ ერთი დიდი Before / After სლაიდერი (გამორჩეული პროექტი),
 * ქვემოთ ვიდეო-რილი და დანარჩენი პროექტები გადაფურცვლად ლენტაზე.
 */
export function Projects() {
  const featured = projects.find((p) => p.before);
  const rest = projects.filter((p) => !p.before);

  return (
    <section className="bg-ink-50 py-14 sm:py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="ნამუშევრები"
            title="სივრცე, რომელსაც თქვენთვის ვქმნით"
            description="ცარიელი ფართი → დასრულებული ობიექტი. ერთი გეგმა, ერთი ჯგუფი, ერთი პასუხისმგებლობა."
          />
          <Button href="/contact" variant="dark" className="shrink-0 self-start md:self-auto">
            თქვენი პროექტი შემდეგია
          </Button>
        </div>

        {featured?.before && (
          <Reveal className="mt-10">
            <BeforeAfterSlider
              before={featured.before}
              after={featured.image}
              alt={featured.title}
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            />
            <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
              <div>
                <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-ink-500">
                  {featured.category}
                </p>
                <h3 className="font-display mt-1 text-2xl font-semibold text-ink-950 sm:text-3xl">
                  {featured.title}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-600 sm:text-right">
                {featured.description}
              </p>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-10" delay={100}>
          <Carousel label="ნამუშევრები" perView="[--per-view:1.15] sm:[--per-view:2] lg:[--per-view:3]">
            <VideoReel
              src={projectReel.src}
              poster={projectReel.poster}
              caption={projectReel.caption}
              aspect="aspect-[4/5]"
              className="h-full rounded-2xl"
            />
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
