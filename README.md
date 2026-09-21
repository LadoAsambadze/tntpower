# TNT POWER — ვებგვერდი

სამშენებლო კომპანია TNT POWER-ის (ბათუმი) საიტი. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.

## გაშვება

```bash
npm install
npm run dev
```

გახსენით http://localhost:3000

პროდაქშენ ბილდი:

```bash
npm run build
npm start
```

## სტრუქტურა

```
src/
  app/                      # გვერდები (App Router)
    page.tsx                # მთავარი
    services/               # სერვისების სია და თითოეული სერვისი ([slug])
    pricing/                # ფასები + კალკულატორი
    about/                  # ჩვენ შესახებ
    contact/                # კონტაქტი + ფორმა (actions.ts — სერვერ-აქშენი)
    icon.svg                # favicon (ყვითელი კვადრატი „TNT")
    sitemap.ts, robots.ts   # SEO
  components/
    brand/                  # BrandCircles (წრეების მოტივი), HeroVideo, VideoReel
    layout/                 # Header, Footer, Logo (ვორდმარკი), FloatingContact
    sections/               # Hero, ServicesGrid, ProblemsWeFix, Projects, PricingPreview, SocialPosts, ProcessSteps, Faq, CtaBanner …
    forms/ContactForm.tsx   # საკონტაქტო ფორმა (useActionState)
    seo/JsonLd.tsx          # schema.org სკრიპტის ჩასმა
    ui/                     # Button, Container, SectionHeading, BrandCheck, Carousel, FaqList
  data/
    site.ts                 # ტელეფონი, ელფოსტა, სლოგანი, ნავიგაცია  ← შეცვალეთ რეალურით
    services.ts             # 10 სერვისი, ფასები, აღწერები, ფოტოები
    serviceFaq.ts           # კითხვა-პასუხი თითოეული სერვისისთვის (slug-ის მიხედვით)
    problems.ts             # „იცნობთ ამ სიტუაციას?" — კონკრეტული პრობლემები → სერვისი
    process.ts              # „როგორ ვმუშაობთ" ნაბიჯები, პრობლემა→შედეგი
    faq.ts                  # ზოგადი და ფასების კითხვა-პასუხი
    projects.ts             # ნამუშევრები, ვიდეო-რილი, სოციალური პოსტები
  lib/jsonld.ts             # FAQPage / BreadcrumbList / Service სქემები
public/
  images/brand/             # ბრენდის ფოტოები და პოსტები
  images/projects/          # ნამუშევრების კადრები (before/after)
  video/                    # hero-renovation.mp4 (ფონი), tnt-reel.mp4 (პორტრეტული რილი), poster-ები
```

## რა უნდა შეიცვალოს გაშვებამდე

1. `src/data/site.ts` — რეალური ტელეფონი, WhatsApp, ელფოსტა, სოციალური ბმულები, დომენი (`url`).
2. `src/data/projects.ts` — ახალი ნამუშევრების ფოტოები (`public/images/projects/`), before/after წყვილები.
3. `src/app/contact/actions.ts` — ფორმის განაცხადი ამჟამად მხოლოდ სერვერის ლოგში იწერება. აქ დაემატება ელფოსტა / Telegram / ბაზა.

## ბრენდი

- ყვითელი: `#F2C524` (`brand-500`), თბილი მუქი: `#28231F`/`#151210` (`ink-800`/`ink-950`) — `src/app/globals.css`, `@theme` ბლოკი.
- შრიფტები ლოკალურადაა ჩაშენებული — `public/fonts/` + `@font-face` `src/app/globals.css`-ში (Google Fonts-ის სუბსეტები, ინტერნეტი არ სჭირდება): Noto Sans Georgian (ტექსტი), Noto Serif Georgian (სათაურები, `font-display`), Italiana (ტაგლაინი „Renovate your house", `font-brand`).
- მოტივები: ყვითელი ზოლი (header-ის ზემოთ, ბარათების მარჯვენა კიდე, footer), თხელი გადამკვეთი წრეები (`BrandCircles`), მუქი გადაფარვა ფოტოებზე.
