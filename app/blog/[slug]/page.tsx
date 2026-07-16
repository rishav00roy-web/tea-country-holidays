import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { createPublicClient } from "@/lib/supabase-public"

export const revalidate = 3600;

export const blogPosts = [
  {
    slug: "kaziranga-national-park-one-horned-rhino",
    title: "Kaziranga National Park: Land of the One-Horned Rhino",
    image: "/images/kaziranga-park.jpg",
    date: "June 10, 2025",
    readTime: "5 min read",
    category: "Wildlife",
    content: `
Kaziranga National Park in Assam is one of India's most extraordinary 
wildlife destinations, and one of the planet's great conservation 
success stories. Nestled between the Brahmaputra floodplains and the 
Karbi Anglong hills, Kaziranga is home to more than 2,600 Indian 
one-horned rhinoceroses, representing roughly two-thirds of the 
entire world population.

## Why Kaziranga is Special

Declared a UNESCO World Heritage Site in 1985, Kaziranga is not just 
about rhinos. The park hosts the highest density of tigers among 
protected areas in the world, along with wild water buffalo, swamp 
deer, elephants, and over 500 species of birds. The landscape itself, 
a patchwork of tall elephant grass, dense tropical forests, and 
shallow wetlands, is unlike anything else in India.

## The Jeep Safari Experience

The best way to explore Kaziranga is on an early morning jeep safari. 
The park is divided into four ranges: Central (Kohora), Western 
(Bagori), Eastern (Agoratoli), and Burapahar. The Central range is 
the most popular and offers the highest chance of rhino sightings, 
often within the first 30 minutes.

Safaris begin at dawn, usually at 5:30 AM, when the animals are most 
active and the golden morning light makes photography spectacular. 
Elephant safaris are also available and give you a unique vantage 
point through the tall grass.

## Best Time to Visit

Kaziranga is open from November to April. The park closes during 
the monsoon season (May to October) due to annual flooding from 
the Brahmaputra. The best months for wildlife sightings are 
February and March, when the grass is shorter and animals are 
easier to spot.

## How to Get There

The nearest town is Kohora, located on National Highway 37 between 
Guwahati (217 km) and Jorhat (97 km). The closest airport is 
Jorhat Airport (Rowriah), with regular flights from Guwahati, 
Kolkata, and Delhi. From Jorhat, it is a comfortable 2-hour drive.

## Where to Stay

Several excellent jungle lodges and resort properties border the 
park. We recommend staying for at least two nights to catch both 
a morning and evening safari. Tea Country Holidays can arrange 
end-to-end packages including accommodation, safaris, and 
transfers from Guwahati or Jorhat.

## Plan Your Kaziranga Trip

Ready to witness one of nature's greatest spectacles? Our team 
knows Kaziranga intimately and can put together the perfect 
itinerary for families, wildlife photographers, and first-time 
visitors alike.
    `,
  },
  {
    slug: "majuli-worlds-largest-river-island",
    title: "Majuli: The World's Largest River Island",
    image: "/images/majuli-river.jpg",
    date: "June 5, 2025",
    readTime: "6 min read",
    category: "Culture",
    content: `
Floating on the mighty Brahmaputra river in Assam, Majuli is the 
world's largest river island, a place of extraordinary natural 
beauty, living culture, and a way of life that has remained 
unchanged for centuries.

## A Living Cultural Heartland

Majuli is the cradle of Assamese Neo-Vaishnavite culture. The island 
is home to dozens of Sattra monasteries, established by the 15th 
century saint-scholar Srimanta Sankardeva. These Sattras are not 
museums; they are living, breathing centres of art, dance, music, 
and spiritual practice. Visiting a Sattra during a prayer ceremony 
or mask-making session is one of the most memorable experiences 
Northeast India offers.

## The Journey Itself

Getting to Majuli is part of the experience. From Jorhat, you drive 
to the Nimati Ghat ferry point and board a country boat or ferry 
across the Brahmaputra. The crossing takes 60–90 minutes depending 
on the season and water levels. The Brahmaputra here is immense; 
crossing it at sunrise, with the mist rising off the water and 
fishermen casting nets, is an image that stays with you.

## What to Do on the Island

Once on Majuli, the best way to explore is by bicycle. The island 
has no major traffic and the lanes between paddy fields, bamboo 
groves, and traditional Mishing tribal villages are perfect for 
slow, unhurried exploration.

Key stops include Kamalabari Sattra, Auniati Sattra (famous for 
its museum of ancient artefacts), and Samaguri Sattra, the centre 
of traditional mask-making used in Bhaona theatrical performances.

## Best Time to Visit

October to March is ideal. Avoid the monsoon months when parts of 
the island flood. The island is most vibrant during the Raas 
Mahotsav festival in November, when Sattras come alive with 
all-night performances.

## How to Get There

Fly into Jorhat (1 hour from Guwahati). From Jorhat, it is 
20 km to Nimati Ghat. Tea Country Holidays can arrange 
comfortable transfers, overnight stays in traditional island 
guesthouses, and guided cultural tours of the Sattras.

## Plan Your Majuli Trip

Majuli is best experienced over 2 nights minimum. Our local team 
can arrange the full experience — ferry tickets, guesthouse stays, 
Sattra visits, cycling tours, and tribal village interactions.
    `,
  },
  {
    slug: "cherrapunji-meghalaya-where-clouds-live",
    title: "Cherrapunji & Meghalaya: Where the Clouds Live",
    image: "/images/meghalaya-bridge.jpg",
    date: "May 28, 2025",
    readTime: "7 min read",
    category: "Nature",
    content: `
Meghalaya, meaning \"Abode of the Clouds,\" is arguably the most 
visually stunning state in Northeast India. From the crystal-clear 
waters of Dawki to the extraordinary living root bridges of 
Cherrapunji and the vibrant capital Shillong, this is a destination 
that simply doesn't disappoint.

## Cherrapunji and Mawsynram

Cherrapunji (locally known as Sohra) and nearby Mawsynram together 
hold the record for the highest annual rainfall anywhere on earth. 
This extraordinary rainfall has sculpted the landscape into a 
paradise of waterfalls, deep gorges, and lush subtropical forests.

The Nohkalikai Falls, at 340 metres, the tallest plunge waterfall 
in India, is visible from a viewpoint above Cherrapunji. During 
the post-monsoon months, the falls are at their most spectacular, 
with the water crashing into a vivid green pool below.

## The Living Root Bridges

The most iconic attraction in Meghalaya is the living root bridges 
of the Khasi hills. These extraordinary structures are grown, not 
built; Khasi villagers train the roots of rubber fig trees across 
streams over decades until they form natural bridges strong enough 
to support the weight of many people.

The double-decker root bridge at Nongriat village is the most 
famous, requiring a 3,500-step descent to reach. It is worth every 
step. The walk through the rainforest, past waterfalls and clear 
rock pools, is as memorable as the bridge itself.

## Dawki and Umngot River

The Umngot River at Dawki, on the India-Bangladesh border, has 
water so clear that boats appear to float in mid-air. Photographs 
of Dawki have circulated widely, but no image quite captures the 
experience of actually being there, watching the river bed shimmer 
three metres below your boat.

## Shillong — Scotland of the East

Meghalaya's capital is a hill station with a distinct personality, 
featuring colonial architecture, a thriving live music scene, excellent 
cafes, and the extraordinary Shillong Peak viewpoint. It makes 
a perfect base for exploring the rest of the state.

## Best Time to Visit

October to May is ideal. The monsoon (June-September) brings 
extraordinary waterfalls but also difficult roads. We recommend 
late September to early October when the waterfalls are full 
and the roads have dried.

## Plan Your Meghalaya Trip

Tea Country Holidays offers curated Meghalaya packages from 
Guwahati, including Shillong, Cherrapunji, Dawki, and the 
living root bridges. Our team is based in the Northeast and 
knows every road, viewpoint, and hidden gem.
    `,
  },
  {
    slug: "ziro-valley-arunachal-best-kept-secret",
    title: "Ziro Valley, Arunachal: India's Best Kept Secret",
    image: "/images/ziro-arunachal.jpg",
    date: "May 20, 2025",
    readTime: "6 min read",
    category: "Adventure",
    content: `
There are places in India that feel genuinely undiscovered, where 
tourism exists but has not yet transformed the landscape or the 
culture. Ziro Valley in Arunachal Pradesh is one of them, and it 
will not stay that way forever.

## The Valley

At an altitude of 1,524 metres in the lower Himalayas, Ziro is a 
wide, flat valley ringed by pine-covered hills. The paddy fields 
are among the most beautiful in India — impossibly green in summer, 
golden in harvest season, and misty and mysterious in winter 
mornings. UNESCO has nominated the cultural landscape of Ziro 
for World Heritage status.

## The Apatani Tribe

The valley is home to the Apatani people, one of the most 
fascinating indigenous communities in Northeast India. The 
Apatani have developed a remarkably sophisticated system of 
wetland rice cultivation and fish farming that produces high 
yields on small land areas, a technique that has drawn the 
attention of agricultural researchers worldwide.

Older Apatani women are recognisable by their traditional facial 
tattoos and large nose plugs, a practice that was discontinued 
in the 1970s. Interactions with Apatani families in the 
villages of Hong and Hari are a highlight of any visit.

## Ziro Music Festival

Every September, Ziro hosts one of India's most celebrated 
independent music festivals, consisting of four days of live performances 
by indie, folk, and experimental artists from across India 
and abroad, set against the backdrop of the paddy fields 
and pine forests. It is a uniquely magical experience.

## Permits

Arunachal Pradesh requires an Inner Line Permit (ILP) for 
all Indian citizens, and a Protected Area Permit (PAP) for 
foreign nationals. Tea Country Holidays handles all permit 
arrangements as part of our Arunachal packages.

## How to Get There

The nearest airport is Naharlagun (near Itanagar), 
approximately 100 km from Ziro. An overnight train from 
Guwahati to Naharlagun is also a good option. From there 
it is a 3–4 hour drive through spectacular mountain scenery.

## Plan Your Ziro Trip

Our Northeast specialists can arrange ILP permits, 
accommodation in local homestays or eco-lodges, guided 
village tours, and full itineraries combining Ziro with 
Tawang, Namdapha, or other Arunachal destinations.
    `,
  },
  {
    slug: "dzukou-valley-nagaland-valley-of-flowers",
    title: "Dzukou Valley, Nagaland: The Valley of Flowers of the Northeast",
    image: "/images/dzukou-nagaland.jpg",
    date: "May 12, 2025",
    readTime: "5 min read",
    category: "Trekking",
    content: `
If the Himalayas have the Valley of Flowers, the Northeast has 
Dzukou. Sitting at 2,452 metres on the border of Nagaland and 
Manipur, Dzukou Valley transforms into a vast natural garden 
every monsoon, blanketed in Dzukou lilies, rhododendrons, 
and dozens of other wildflower species found nowhere else.

## The Trek

The most popular route begins from Viswema village, 
approximately 25 km from Kohima. The trek to the valley 
takes 3–4 hours and gains around 1,000 metres of altitude. 
The path is clear and well-marked, passing through bamboo 
forests and open ridgelines with sweeping views over the 
Naga hills.

A second route from Jakhama on the Manipur side is slightly 
longer but less crowded. Both routes converge at the valley 
floor, where a forest department rest house provides basic 
overnight accommodation.

## What Makes It Special

Dzukou is remarkable for its isolation and its silence. 
Unlike more famous trekking destinations, you are unlikely 
to encounter crowds here. The valley has no permanent 
settlements and no mobile network, offering instead miles of 
undulating meadows, gurgling streams, and the sound of wind.

The Dzukou lily (Lilium mackliniae) blooms from June to 
September and is found only in this region. Walking through 
a meadow full of these delicate pink flowers against a 
backdrop of mist-covered hills is an experience that 
trekkers consistently describe as one of the most beautiful 
they have had in India.

## Best Season

June to September for flowers. October to February for 
clear skies and dramatic winter landscapes; the valley 
occasionally receives snowfall in January.

## How to Get There

Fly or drive to Kohima, Nagaland's capital. Tea Country 
Holidays can arrange guides, permits, overnight camping 
or rest house stays, and full transportation from Dimapur 
or Guwahati.

## Plan Your Dzukou Trek

Our Northeast team has trekked Dzukou multiple times and 
can put together a complete package — transport, local 
guide, permits, meals, and accommodation. Best combined 
with a visit to Kohima and the famous Kohima War Cemetery.
    `,
  },
  {
    slug: "assam-tea-trail-journey-through-gardens",
    title: "Assam Tea Trail: A Journey Through the Gardens",
    image: "/images/assam-tea-estate.jpg",
    date: "May 5, 2025",
    readTime: "8 min read",
    category: "Culture",
    content: `
Every morning, hundreds of millions of people around the world 
pour a cup of Assam tea. Most have no idea where it comes from 
or what it looks like where it grows. The Assam Tea Trail changes 
that, providing one of the most immersive, sensory travel 
experiences India offers.

## Jorhat — The Tea Capital of the World

The Brahmaputra Valley around Jorhat contains the highest 
concentration of tea gardens anywhere on earth. Over 300 tea 
estates surround the town, producing the strong, malty, 
copper-red brew that forms the backbone of most breakfast 
tea blends worldwide.

Tea Country Holidays is based here, and we know these gardens 
intimately, including their history, their owners, and the best ways 
to experience them.

## Inside a Tea Estate

Most visitors to Assam never set foot inside a working tea 
garden. A Tea Trail experience changes that. You walk between 
rows of perfectly pruned tea bushes, watch the pluckers work 
with extraordinary speed and precision, and follow the leaf 
from the garden to the factory floor, covering withering, rolling, 
oxidising, and drying, before it becomes the tea in your cup.

The factory tours are fascinating. The machinery in some 
estates is over a century old, still running perfectly. 
The smell inside a tea factory, which is warm, slightly vegetal, 
and intensely aromatic, is unlike anything else.

## Tea Bungalow Stays

Many of Assam's historic tea estates have converted their 
colonial-era planter bungalows into boutique heritage stays. 
These are exceptional; they are large, graceful houses surrounded by 
verandas and lawns, with attentive hospitality and food that 
draws on both Indian and British colonial traditions. Waking 
up to mist over the tea gardens and a freshly brewed cup of 
estate tea is something you do not forget.

## Beyond Tea

The Jorhat region offers much more than tea. Majuli island 
(the world's largest river island) is an hour's drive and 
ferry ride away. The Gibbon Wildlife Sanctuary near 
Jorhat is one of the best places in India to see Hoolock 
gibbons in the wild. Sivasagar, once the capital of the 
Ahom kingdom that ruled Assam for 600 years, is 50 km away 
and filled with extraordinary historical monuments.

## Best Time to Visit

October to April is ideal for the tea trail. The second 
flush (May-June) is considered the finest tea of the year, so 
visiting during this period means witnessing the gardens 
at peak production.

## Plan Your Assam Tea Trail

Tea Country Holidays offers exclusive Tea Trail packages 
from Jorhat — the only travel company based right in the 
heart of the tea country. Our packages include estate 
visits, factory tours, tea bungalow stays, Majuli day 
trips, and wildlife experiences. This is our home, and 
we love sharing it.
    `,
  },
]

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  let post = blogPosts.find(p => p.slug === slug)

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (data) {
      post = {
        slug: data.slug,
        title: data.title,
        image: data.cover_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        date: new Date(data.published_at || data.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        readTime: "5 min read",
        category: data.category || "Travel",
        content: data.content,
      };
    }
  } catch (err) {
    console.error("Error fetching blog metadata:", err);
  }

  if (!post) {
    return {
      title: "Blog Post Not Found | Tea Country Holidays",
    }
  }
  return {
    title: `${post.title} | Tea Country Holidays Blog`,
    description: post.content.trim().split("\n").filter(Boolean)[0]?.substring(0, 155) + "...",
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const defaultParams = blogPosts.map(post => ({ slug: post.slug }))
  try {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("published", true)
    if (data && data.length > 0) {
      const dbParams = data.map(p => ({ slug: p.slug }))
      const slugs = new Set([...defaultParams.map(p => p.slug), ...dbParams.map(p => p.slug)])
      return Array.from(slugs).map(slug => ({ slug }))
    }
  } catch (err) {
    console.error("Error generating blog static params:", err)
  }
  return defaultParams
}

export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  let post = blogPosts.find(p => p.slug === slug)

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (data) {
      post = {
        slug: data.slug,
        title: data.title,
        image: data.cover_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        date: new Date(data.published_at || data.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        readTime: "5 min read",
        category: data.category || "Travel",
        content: data.content,
      };
    }
  } catch (err) {
    console.error("Error fetching blog post:", err);
  }

  if (!post) notFound()

  return (
    <main className="blog-typography min-h-screen bg-[#FAFAF7] dark:bg-[#0d1f1a]">

      {/* Hero image */}
      <div className="relative h-[55vh] w-full pt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t 
          from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 
          px-4 pb-10 max-w-4xl mx-auto">
          <span className="inline-block bg-[#C8860A] text-[#1a2e0f] 
            text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl 
            font-normal text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 
            text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 
        py-16">

        {/* Back link */}
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 
            text-[#2D5016] dark:text-[#C8860A] text-sm font-medium mb-10 
            hover:text-[#C8860A] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Blog body */}
        <div className="prose prose-lg max-w-none dark:prose-invert
          prose-headings:font-serif 
          prose-headings:text-[#2D5016] dark:prose-headings:text-white
          prose-headings:font-normal
          prose-h2:text-2xl
          prose-h2:mt-10
          prose-h2:mb-4
          prose-p:text-[#1a2e0f]/80 dark:prose-p:text-white/80
          prose-p:leading-relaxed
          prose-p:mb-6
          prose-strong:text-[#2D5016] dark:prose-strong:text-[#C8860A]">
          {post.content.trim().split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="font-serif text-2xl 
                  font-normal text-[#2D5016] dark:text-[#C8860A] mt-10 mb-4">
                  {block.replace('## ', '')}
                </h2>
              )
            }
            return (
              <p key={i} className="text-[#1a2e0f]/80 dark:text-white/80
                leading-relaxed mb-6">
                {block}
              </p>
            )
          })}
        </div>

        {/* CTA box */}
        <div className="mt-16 bg-[#1a2e0f] dark:bg-black/30 border dark:border-white/10 rounded-2xl p-8 
          text-[#F5F0E8] text-center">
          <h3 className="font-serif text-2xl font-normal mb-3 text-[#C8860A]">
            Ready to Plan This Trip?
          </h3>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
            Tea Country Holidays is based in the Northeast. 
            Our team knows these destinations personally 
            and can build the perfect itinerary for you.
          </p>
          <a
            href={`https://wa.me/918826048272?text=Hi%2C%20I%20read%20your%20blog%20about%20${encodeURIComponent(post.title)}%20and%20want%20to%20plan%20a%20trip.%20Please%20share%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 
              bg-[#C8860A] text-[#1a2e0f] font-semibold 
              px-8 py-3 rounded-lg 
              hover:bg-amber-400 transition-colors"
          >
            Plan This Trip via WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
