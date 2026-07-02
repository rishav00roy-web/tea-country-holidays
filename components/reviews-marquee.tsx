"use client";

import Image from "next/image";

export interface Review {
  id: number | string;
  name: string;
  rating: number;
  date: string;
  review_text?: string;
  text?: string;
  profile_pic_url?: string;
  hasPhoto?: boolean;
  photoUrl?: string | null;
  tour: string;
}

const getImageUrl = (path: string) => {
  if (!path || path.includes('ui-avatars.com')) {
    return null;
  }
  if (path.includes('googleusercontent.com') || path.startsWith('http')) {
    return path;
  }
  
  let cleanPath = path;
  if (cleanPath.startsWith('tea-country-reviews/')) {
    cleanPath = cleanPath.replace('tea-country-reviews/', '');
  }
  
  return `https://lnrkqyxiwbkvkazyzcbe.supabase.co/storage/v1/object/public/tea-country-reviews/${cleanPath}`;
};

export function InitialsAvatar({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const initials = words.length > 1 
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : words[0][0] ? words[0][0].toUpperCase() : "";

  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 border-brand-gold/30 bg-[#013220] text-[#D4AF37] select-none shrink-0">
      {initials}
    </div>
  );
}

// Google Reviews fallback list
export const fallbackReviews: Review[] = [
  {
    id: 1,
    name: "Sanjay Bedi",
    rating: 5,
    date: "Recent",
    text: "Tea Country Holidays is one of the best travel companies for comfortable, well-organized, and memorable trips. Their team provides excellent service, personalized itineraries, and smooth coordination from start to finish.",
    tour: "Custom Tour",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 2,
    name: "Ashim Jyoti Das",
    rating: 5,
    date: "Recent",
    text: "We're back and still dreaming of our trip! Thank you Manami ba for the seamless planning and for being there every step of the way.",
    tour: "Custom Tour",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 3,
    name: "Dheeraj Gupta",
    rating: 5,
    date: "Recent",
    text: "From the initial consultation to the final itinerary, you were always responsive, knowledgeable, and accommodating. Your suggestions and recommendations were spot on. Thank you again for your outstanding service!",
    tour: "Custom Tour",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 4,
    name: "Tonmoie Sarmah",
    rating: 5,
    date: "Recent",
    text: "The experience was beyond words. The hospitality and hassle free services provided by you added the much needed flavour to my trekking experience. Looking forward to many more travels together.",
    tour: "Trekking Expedition",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 5,
    name: "Dipsikha Das",
    rating: 5,
    date: "Recent",
    text: "Thank you Manami for your wonderful and hassle free arrangements — trip to Darjeeling from pick up till dropping along with the accommodation and transportation was really a great experience.",
    tour: "Darjeeling Trip",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 6,
    name: "Harshit Singh Chouhan",
    rating: 5,
    date: "Recent",
    text: "Amazing experience with this team. My 2nd time experience in Northeast. MEGHALAYA is really awesome place and we enjoyed our trek.",
    tour: "Meghalaya Trek",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 7,
    name: "Kashmika Devi",
    rating: 5,
    date: "Recent",
    text: "From candle light dinner to special room decorations for honeymoon, it was such a memorable trip to Manali & Shimla at such a pocket friendly rate. Special thanks to Manami who was constantly in touch 24x7.",
    tour: "Manali & Shimla Honeymoon",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 8,
    name: "Vishal Khurana",
    rating: 5,
    date: "Recent",
    text: "I would like to express my sincere thanks for the amazing experience in Madurai, Rameshwaram, Kanyakumari trip. Everything was hassle free — air ticket, cab, hotels, sightseeing. The best part was your continued support throughout the trip.",
    tour: "South India Trip",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 9,
    name: "Trupti Diwalkar",
    rating: 5,
    date: "Recent",
    text: "Excellent service and very professional travel agent! Everything was well planned and smoothly managed from booking to the entire trip. Highly recommended for anyone looking for a perfect travel experience!",
    tour: "Custom Tour",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 10,
    name: "Aman Preet Singh",
    rating: 5,
    date: "Recent",
    text: "Had an absolutely fantastic time in Meghalaya with Tea Country Holidays. The trip was customized to our preference, the driver was professional, and the hotels chosen were excellent. 10/10 recommendation!",
    tour: "Shillong & Cherrapunji",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 11,
    name: "Dr. Maitreyi Baruah",
    rating: 5,
    date: "Recent",
    text: "Very professional service. Booked a luxury family tour to Tawang, Arunachal. The road conditions were challenging but the driver and guide were exceptional, making us feel completely safe and comfortable.",
    tour: "Tawang Valley Family Tour",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: 12,
    name: "Rajiv Malhotra",
    rating: 5,
    date: "Recent",
    text: "Highly impressed with their prompt coordination. They organized our corporate retreat of 40 people to Kaziranga smoothly. Excellent safari arrangements and a wonderful stay.",
    tour: "Kaziranga Corporate Group",
    hasPhoto: false,
    photoUrl: null,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const avatarSrc = review.profile_pic_url ? getImageUrl(review.profile_pic_url) : null;
  const reviewText = review.review_text || review.text;
  
  return (
    <div className="flex-shrink-0 w-[340px] bg-white dark:bg-[#12291f] rounded-2xl shadow-md border border-brand-gold/10 dark:border-brand-gold/25 p-5 mx-3 flex flex-col gap-3 hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={review.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-brand-gold/30 object-cover bg-slate-50"
            loading="lazy"
          />
        ) : (
          <InitialsAvatar name={review.name} />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-brand-evergreen dark:text-white text-sm truncate">{review.name}</p>
          <div className="flex items-center gap-2">
            <StarRating count={review.rating} />
            <span className="text-xs text-brand-ink/40 dark:text-white/40">{review.date}</span>
          </div>
        </div>
        {/* Google G logo */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Review text */}
      <p className="text-sm text-brand-ink/80 dark:text-white/80 leading-relaxed line-clamp-4">
        &quot;{reviewText}&quot;
      </p>

      {/* Tour photo if available */}
      {review.hasPhoto && review.photoUrl && (
        <div className="rounded-xl overflow-hidden aspect-video relative">
          <Image
            src={review.photoUrl}
            alt={`${review.tour} photo`}
            fill
            quality={65}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Tour tag */}
      <div className="mt-auto">
        <span className="text-xs font-semibold text-brand-gold bg-brand-varden dark:bg-[#0d1f1a] px-3 py-1 rounded-full">
          📍 {review.tour}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsMarquee({ initialReviews = fallbackReviews }: { initialReviews?: Review[] }) {
  // Duplicate for seamless infinite loop — prefix keys to avoid collisions
  const doubled = [
    ...initialReviews.map(r => ({ ...r, _key: `a-${r.id}`, isDuplicate: false })),
    ...initialReviews.map(r => ({ ...r, _key: `b-${r.id}`, isDuplicate: true })),
  ];

  return (
    <section className="py-16 bg-brand-evergreen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-brand-gold font-bold text-xs tracking-[0.2em] uppercase block mb-2">
            Google Reviews
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            What Travellers Say About Us
          </h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="font-serif text-4xl font-bold text-brand-gold">4.9</span>
            <div className="flex justify-end gap-0.5 mt-1">
              {[1,2,3,4,5].map(i=>(
                <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-1">Based on Google Reviews</p>
          </div>
          <svg viewBox="0 0 48 48" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-viewport flex overflow-hidden select-none">
        <div className="marquee-track py-2" aria-label="Customer reviews">
          {doubled.map((review) => (
            <div
              key={review._key}
              className={review.isDuplicate ? "review-card-duplicate shrink-0 snap-start" : "review-card-original shrink-0 snap-start"}
            >
              {(() => {
                const { _key, isDuplicate, ...originalReview } = review;
                return <ReviewCard review={originalReview} />;
              })()}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-brand-gold/40 text-xs mt-6 tracking-wider">
        {"\u2605"} Verified Google Reviews {"\u00B7"} TeaCountryHolidays, Guwahati, Assam
      </p>
    </section>
  );
}
