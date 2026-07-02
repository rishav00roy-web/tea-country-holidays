import type { Metadata } from "next";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ – Northeast India Travel Questions Answered | Tea Country Holidays",
  description:
    "Answers to the most common questions about Northeast India travel — permits, best time to visit, safety, costs, and booking with Tea Country Holidays.",
  alternates: {
    canonical: "/faq",
  },
  keywords: [
    "Northeast India travel FAQ",
    "do I need a permit Northeast India",
    "best time to visit Northeast India",
    "is Northeast India safe",
    "Northeast India tour cost",
    "how to book Northeast India holiday",
  ],
};

const faqs = [
  {
    question: "What is the best time to visit Northeast India?",
    answer:
      "October to April is the best time to visit Northeast India. The weather is cool and dry, ideal for wildlife safaris, trekking, and sightseeing. December to February is peak season with clear skies and vibrant festivals. Avoid June to September — heavy monsoon rains frequently cause landslides and road closures.",
  },
  {
    question: "Do I need a permit to visit Northeast India?",
    answer:
      "It depends on the state. Assam, Meghalaya, and Tripura require no permits for Indian nationals. Arunachal Pradesh, Manipur, Mizoram, and Nagaland require an Inner Line Permit (ILP), now available online with approvals often within a few hours. Foreign nationals require a Protected Area Permit (PAP) for most states. Tea Country Holidays assists all clients with permit arrangements.",
  },
  {
    question: "Is Northeast India safe for tourists?",
    answer:
      "Yes. Northeast India is one of India's safest regions for tourists, with tight-knit communities and welcoming locals. Assam, Meghalaya, and Sikkim are particularly family-friendly and well-connected. Standard precautions apply in remote hill areas. Our local guides ensure safe, well-planned travel throughout.",
  },
  {
    question: "How do I book a holiday package with Tea Country Holidays?",
    answer:
      "Browse packages on our Holidays page, click 'Get Quote,' and our team will reach out via WhatsApp within a few hours. We'll confirm availability, customise the itinerary to your needs, and share a detailed quote. A partial advance payment confirms your booking.",
  },
  {
    question: "Can I customise my holiday itinerary?",
    answer:
      "Yes, every package is fully customisable. You can add or remove destinations, adjust the number of days, choose your accommodation type, or build an itinerary entirely from scratch. Just share your travel dates, group size, and budget and we'll put together a tailored plan.",
  },
  {
    question: "What is included in a Tea Country Holidays package?",
    answer:
      "Our packages typically include accommodation, daily breakfast and dinner, private vehicle transfers, guided sightseeing, and applicable entry fees. Airfare, travel insurance, and personal expenses are generally not included unless stated. Full inclusions are listed in your personalised quote.",
  },
  {
    question: "How much does a Northeast India tour package cost?",
    answer:
      "A 7-day Assam and Meghalaya tour for two starts from approximately ₹25,000 per person, excluding flights. Costs vary by destination, duration, group size, and accommodation type. Contact us on WhatsApp for a personalised quote — we work across all budgets.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 4 to 6 weeks in advance, especially for peak season (October to February). For groups of 10 or more, 2 to 3 months is ideal. Last-minute bookings are possible but may limit hotel availability and package options.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations 30+ days before departure: 10% charge. 15–29 days: 25%. 7–14 days: 50%. Less than 7 days: 100% of the package cost. Refunds are processed within 10–15 business days. We strongly recommend travel insurance to cover unforeseen cancellations.",
  },
  {
    question: "How do I get to Northeast India?",
    answer:
      "Guwahati's Lokpriya Gopinath Bordoloi International Airport is the main gateway, with direct flights from Delhi, Mumbai, Bangalore, and Kolkata. All eight Northeastern states have operational airports. Guwahati is also a major rail hub connected to most Indian cities.",
  },
  {
    question: "Which destinations does Tea Country Holidays cover?",
    answer:
      "We cover all eight Northeastern states — Assam, Meghalaya, Arunachal Pradesh, Sikkim, Nagaland, Manipur, Mizoram, and Tripura — plus Bhutan. Popular routes include Kaziranga, Shillong, Cherrapunji, Majuli, Tawang, and Dawki. International packages to the Maldives and Southeast Asia are also available.",
  },
  {
    question: "Do you offer honeymoon packages?",
    answer:
      "Yes. We specialise in romantic honeymoon packages across Northeast India and international destinations. Popular choices include Bhutan, Maldives, and Sikkim. Each package is fully customised with boutique stays, private transfers, and curated experiences tailored for couples.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-[#fafaf7] min-h-screen">
        {/* Header */}
        <section className="bg-[#1a3c2e] py-16 px-4 text-center">
          <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3 font-sans">
            Got Questions?
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-green-200 mt-3 max-w-xl mx-auto text-sm font-sans">
            Everything you need to know about travelling Northeast India with us
            — permits, costs, safety, and more.
          </p>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <FAQAccordion faqs={faqs} />
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#1a3c2e] py-12 px-4 text-center">
          <p className="text-white text-lg font-medium mb-2 font-serif">
            Still have questions?
          </p>
          <p className="text-green-200 text-sm mb-6 font-sans">
            Our travel experts are on WhatsApp — we usually reply within the hour.
          </p>
          <a
            href="https://wa.me/918826048272"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963f] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm font-sans"
          >
            Chat with Us on WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}
