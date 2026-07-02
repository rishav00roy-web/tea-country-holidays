"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fallbackTestimonials } from "@/lib/reviews-data";

export interface Testimonial {
  id?: number | string;
  name: string;
  rating: string | number;
  review_text?: string;
  review?: string;
  profile_pic_url?: string;
  photos?: string[];
  tour?: string;
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

function InitialsAvatar({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const initials = words.length > 1 
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : words[0][0] ? words[0][0].toUpperCase() : "";

  return (
    <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl border-2 border-[#C8860A] bg-[#013220] text-[#D4AF37] shadow-md select-none shrink-0 mb-4">
      {initials}
    </div>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3 justify-center">
      {Array.from({ length: count || 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#C8860A"
          className="w-4 h-4"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function FlipCard({ data, index }: { data: Testimonial; index: number }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const avatarSrc = getImageUrl(data.profile_pic_url || "");
  const [hasFailed, setHasFailed] = useState(false);

  const handleImageError = (failedUrl: string) => {
    setPhotos((prev) => prev.filter((url) => url !== failedUrl));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhotos(data.photos || []);
    }, 0);
    return () => clearTimeout(timer);
  }, [data.photos]);

  useEffect(() => {
    if (photos.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div 
      className="review-flip-card-container mx-auto w-full max-w-sm" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="review-flip-card-inner">
        {/* Front Content */}
        <div className="review-flip-card-front relative flex flex-col items-center justify-center p-6 w-full h-full">
          {photos.map((photo, i) => (
            <Image
              key={photo}
              src={photo}
              alt=""
              fill
              quality={50}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-opacity duration-1000 pointer-events-none"
              style={{
                opacity: i === currentPhotoIndex ? 0.7 : 0,
                zIndex: 1
              }}
              onError={() => handleImageError(photo)}
            />
          ))}
          
          {/* Subtle dark overlay to prevent tint and ensure contrast */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: 2 }} />
          
          {/* Content overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {avatarSrc && !hasFailed ? (
              <Image 
                src={avatarSrc} 
                alt={data.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-2 border-[#C8860A] shadow-md object-cover mb-4 bg-white"
                onError={() => setHasFailed(true)}
              />
            ) : (
              <InitialsAvatar name={data.name} />
            )}
            <h3 className="font-serif text-xl font-bold text-white drop-shadow-md text-center">{data.name}</h3>
          </div>
        </div>

        {/* Back Content */}
        <div className="review-flip-card-back z-20 flex flex-col justify-center items-center p-6 text-center bg-[#FAFAF7] dark:bg-[#12291f]">
          <StarRow count={Number(data.rating) || 5} />
          <p className="font-sans text-[13px] text-[#222] dark:text-brand-cream/90 leading-[1.6] line-clamp-5 mb-4">
            &quot;{data.review_text || data.review}&quot;
          </p>
          <p className="font-serif font-bold text-[#2D5016] dark:text-[#faf8f3] text-[15px] mb-2">{data.name}</p>
          {data.tour && (
            <span className="inline-block text-[11px] font-bold text-[#2D5016] dark:text-brand-gold bg-[#C8860A]/25 dark:bg-[#0d1f1a] px-3.5 py-1 rounded-full uppercase tracking-wider">
              {data.tour}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MasonryTestimonials({ initialTestimonials = fallbackTestimonials }: { initialTestimonials?: Testimonial[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7] dark:bg-[#0d1f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label inline-block text-[#C8860A] mb-3">
            CUSTOMER STORIES
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D5016] dark:text-white">
            Travellers Love Us
          </h2>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialTestimonials.map((t, i) => (
            <FlipCard key={t.id || i} data={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
