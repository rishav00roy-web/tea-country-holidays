import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tea Country Holidays",
  description:
    "Read the terms and conditions governing the use of Tea Country Holidays services, holiday packages, and bookings.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    title: "1. Bookings & Payments",
    content: (
      <>
        <p>
          All bookings are confirmed only upon receipt of the applicable advance
          payment. The advance amount varies by package and will be communicated
          at the time of quotation. The remaining balance is due as per the
          payment schedule provided.
        </p>
        <p>
          Prices quoted are valid at the time of inquiry and are subject to
          change until a booking is confirmed in writing. Tea Country Holidays
          reserves the right to revise pricing due to changes in airfare, hotel
          rates, fuel surcharges, or government taxes.
        </p>
      </>
    ),
  },
  {
    title: "2. Cancellations & Refunds",
    content: (
      <>
        <p>
          Cancellation charges apply as follows from the date of written
          cancellation:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>30 or more days before departure: 10% of total package cost</li>
          <li>15–29 days before departure: 25% of total package cost</li>
          <li>7–14 days before departure: 50% of total package cost</li>
          <li>Less than 7 days before departure: 100% of total package cost</li>
        </ul>
        <p className="mt-2">
          Refunds, where applicable, are processed within 10–15 business days
          to the original payment method. No refund is applicable for unused
          services, early departures, or no-shows.
        </p>
      </>
    ),
  },
  {
    title: "3. Changes to Itinerary",
    content: (
      <p>
        Tea Country Holidays reserves the right to alter itineraries, hotels,
        or transport arrangements due to circumstances beyond our control,
        including but not limited to weather, road conditions, political
        situations, or natural calamities. In such cases, we will endeavour to
        provide suitable alternatives of equivalent standard at no additional
        cost. No refund will be issued for alterations caused by force majeure.
      </p>
    ),
  },
  {
    title: "4. Travel Documents & Permits",
    content: (
      <p>
        It is the traveller's sole responsibility to possess valid travel
        documents, including government-issued photo ID, passports, visas,
        Inner Line Permits (ILP), and Protected Area Permits (PAP) where
        required. Tea Country Holidays will assist in providing information on
        required permits but bears no liability for denial of entry or travel
        disruption due to missing or invalid documentation.
      </p>
    ),
  },
  {
    title: "5. Travel Insurance",
    content: (
      <p>
        We strongly recommend that all travellers obtain comprehensive travel
        insurance covering medical emergencies, trip cancellation, loss of
        baggage, and personal liability. Tea Country Holidays does not provide
        travel insurance and is not liable for any loss or expense arising from
        the absence of adequate insurance coverage.
      </p>
    ),
  },
  {
    title: "6. Liability",
    content: (
      <p>
        Tea Country Holidays acts as an agent for hotels, transport operators,
        and other service providers. We are not liable for any injury, loss,
        damage, accident, delay, or irregularity that may arise during a tour
        caused by the negligence of third-party service providers, weather
        conditions, acts of God, or any circumstance beyond our reasonable
        control. Our liability, where applicable, is limited to the cost of the
        services booked through us.
      </p>
    ),
  },
  {
    title: "7. Conduct",
    content: (
      <p>
        Travellers are expected to behave in a manner respectful of local
        customs, fellow travellers, and service providers. Tea Country Holidays
        reserves the right to terminate participation in a tour without refund
        if a traveller's conduct is deemed disruptive or harmful to the group or
        third parties.
      </p>
    ),
  },
  {
    title: "8. Governing Law",
    content: (
      <p>
        These terms are governed by the laws of India. Any disputes arising from
        these terms or services provided by Tea Country Holidays shall be
        subject to the exclusive jurisdiction of the courts in Guwahati, Assam.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#fafaf7] min-h-screen">
      {/* Header */}
      <section className="bg-[#1a3c2e] py-16 px-4 text-center">
        <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
          Terms &amp; Conditions
        </h1>
        <p className="text-green-200 mt-3 text-sm">
          Last updated: June 2026
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-14 text-gray-700">

        <p className="mb-8 text-base leading-relaxed">
          By using our website or booking any service with Tea Country Holidays
          (operated by SSB Media Pvt. Ltd., G.S. Road, Christian Basti,
          Guwahati, Assam 781005), you agree to the following terms. Please read
          them carefully before proceeding.
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="text-lg font-semibold text-[#1a3c2e] mb-3 border-l-4 border-[#c9a84c] pl-3">
              {section.title}
            </h2>
            <div className="text-sm leading-relaxed space-y-2">
              {section.content}
            </div>
          </div>
        ))}

        <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-500">
          For any questions regarding these terms, contact us at{" "}
          <a
            href="mailto:info@teacountryholidays.com"
            className="text-[#1a3c2e] underline"
          >
            info@teacountryholidays.com
          </a>{" "}
          or call{" "}
          <a href="tel:+918826048272" className="text-[#1a3c2e] underline">
            +91 88260 48272
          </a>
          .
        </div>

        <div className="mt-6 text-sm">
          <Link href="/privacy" className="text-[#1a3c2e] underline">
            View our Privacy Policy →
          </Link>
        </div>
      </section>
    </main>
  );
}
