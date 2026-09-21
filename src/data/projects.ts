/**
 * ნამუშევრები.
 * ფოტოები ჩადეთ `public/images/projects/` საქაღალდეში.
 * `before` არასავალდებულოა — თუ მითითებულია, ბარათი Before/After სახით გამოჩნდება.
 */
export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  before?: string;
}

export const projects: Project[] = [
  {
    slug: "room-renovation",
    title: "ოთახის სრული რემონტი",
    category: "ბინა · Before / After",
    description:
      "ბათქაშიდან მზა ოთახამდე: კედლების მომზადება, შეღებვა, ლამინატის დაგება — ერთი ჯგუფით, ერთი გეგმით.",
    image: "/images/projects/room-after.jpg",
    before: "/images/projects/room-before.jpg",
  },
  {
    slug: "store-lounge",
    title: "სავაჭრო სივრცის სრული მოწყობა",
    category: "კომერციული ფართი",
    description:
      "განათება, ხის პანელები, ინტერიერი და ავეჯი — მაღაზია გახსნისთვის სრულად მზა მდგომარეობაში.",
    image: "/images/projects/store-lounge.jpg",
  },
  {
    slug: "living-room-concept",
    title: "საცხოვრებელი სივრცის დიზაინ-პროექტი",
    category: "ბინა · ვიზუალიზაცია",
    description:
      "ყველაფერი იდეიდან იწყება: ვიზუალიზაცია, დაგეგმვა, ხარჯთაღრიცხვა — და შემდეგ შესრულება.",
    image: "/images/brand/living-room-wide.jpg",
  },
];

/** ვიდეო-ტური ნამუშევრების სექციისთვის (პორტრეტული რილი) */
export const projectReel = {
  src: "/video/tnt-reel.mp4",
  poster: "/video/tnt-reel-poster.jpg",
  caption: "ვიდეო-ტური: სავაჭრო სივრცე გახსნის წინ",
};

/** სოციალური ქსელების პოსტები — ბრენდის ვიზუალები */
export const socialPosts = [
  { src: "/images/brand/post-how-we-build.jpg", alt: "როგორ ვაშენებთ თქვენს ხედვას — TNT POWER" },
  { src: "/images/brand/post-renovation.jpg", alt: "სრული რემონტი — TNT POWER" },
  { src: "/images/brand/post-interior.jpg", alt: "ინტერიერის დიზაინი — TNT POWER" },
  { src: "/images/brand/post-office-design.jpg", alt: "ოფისის მოწყობა — TNT POWER" },
  { src: "/images/brand/post-cracks.jpg", alt: "გაწუხებთ ბზარები? — TNT POWER" },
  { src: "/images/brand/post-ready-to-renovate.jpg", alt: "მზად ხართ რემონტისთვის? 3 ნაბიჯი — TNT POWER" },
  { src: "/images/brand/post-everything-starts-with-idea.jpg", alt: "ყველაფერი იდეიდან იწყება — TNT POWER" },
  { src: "/images/brand/post-planning-design-execution.jpg", alt: "დაგეგმვა · დიზაინი · შესრულება — TNT POWER" },
] as const;
