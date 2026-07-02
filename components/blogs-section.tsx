import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Kaziranga National Park — Land of the One-Horned Rhino",
    excerpt: "Home to two-thirds of the world's great one-horned rhinoceros population, Kaziranga is one of India's most extraordinary wildlife experiences.",
    image: "/images/kaziranga-park.jpg",
    date: "June 10, 2025",
    slug: "kaziranga-national-park-one-horned-rhino",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Majuli — The World's Largest River Island",
    excerpt: "Floating serenely on the Brahmaputra, Majuli is a world unlike any other — ancient monasteries, Neo-Vaishnavite culture, and breathtaking sunsets.",
    image: "/images/majuli-river.jpg",
    date: "June 5, 2025",
    slug: "majuli-worlds-largest-river-island",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Cherrapunji & Meghalaya — Where the Clouds Live",
    excerpt: "One of the wettest places on earth, Meghalaya rewards travellers with living root bridges, crystal-clear rivers, and misty valleys that feel like another world.",
    image: "/images/meghalaya-bridge.jpg",
    date: "May 28, 2025",
    slug: "cherrapunji-meghalaya-where-clouds-live",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Ziro Valley, Arunachal — India's Best Kept Secret",
    excerpt: "Tucked away in the lower Himalayas, Ziro Valley is a UNESCO World Heritage nominee — serene paddy fields, the Apatani tribe, and India's coolest music festival.",
    image: "/images/ziro-arunachal.jpg",
    date: "May 20, 2025",
    slug: "ziro-valley-arunachal-best-kept-secret",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Dzukou Valley, Nagaland — The Valley of Flowers of the Northeast",
    excerpt: "At 2,452 metres, Dzukou Valley transforms into a carpet of seasonal wildflowers every monsoon. One of India's most rewarding and least crowded treks.",
    image: "/images/dzukou-nagaland.jpg",
    date: "May 12, 2025",
    slug: "dzukou-valley-nagaland-valley-of-flowers",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Assam Tea Trail — A Journey Through the Gardens",
    excerpt: "Jorhat is the tea capital of the world. Walk through emerald estates, stay in colonial bungalows, and discover the story behind every cup of Assam tea.",
    image: "/images/assam-tea-estate.jpg",
    date: "May 5, 2025",
    slug: "assam-tea-trail-journey-through-gardens",
    readTime: "8 min read",
  },
];

export default function BlogsSection() {
  return (
    <section id="blogs" className="bg-brand-sand dark:bg-brand-dark py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 reveal">
          <div className="max-w-2xl">
            <span className="section-label inline-block text-brand-gold mb-3">
              Stories & Guides
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-brand-evergreen dark:text-brand-sand">
              Latest from the Blog
            </h2>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group bg-white dark:bg-brand-ink/75 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.12)] border border-brand-evergreen/5 dark:border-brand-sand/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full relative"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  quality={65}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-brand-evergreen/60 dark:text-brand-sand/60 text-xs font-medium uppercase tracking-wider mb-4">
                  <Calendar className="h-4 w-4" />
                  {blog.date}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-evergreen dark:text-white mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {blog.title}
                </h3>
                <p className="text-black/60 dark:text-white/60 line-clamp-3 mb-6">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-evergreen/40 dark:text-brand-sand/40 text-xs">
                    {blog.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2 text-brand-gold font-medium group-hover:gap-3 transition-all">
                    Read Story
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
