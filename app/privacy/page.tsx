import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tea Country Holidays",
  description:
    "Learn how Tea Country Holidays collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>We collect the following types of information:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            <strong>Personal details:</strong> Name, email address, phone
            number, and travel preferences provided when you fill a booking
            inquiry, contact form, or create an account.
          </li>
          <li>
            <strong>Travel information:</strong> Destination preferences, travel
            dates, number of travellers, and any special requirements shared
            with us.
          </li>
          <li>
            <strong>Usage data:</strong> Pages visited, time spent on the site,
            and browser/device information collected automatically via cookies
            and analytics tools.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Process and confirm travel bookings and inquiries</li>
          <li>
            Communicate with you about your trip via WhatsApp, email, or phone
          </li>
          <li>Send relevant travel offers, updates, and promotions (only with your consent)</li>
          <li>Improve our website and services based on usage patterns</li>
          <li>Comply with legal obligations under applicable Indian law</li>
        </ul>
        <p className="mt-2">
          We do not sell, rent, or trade your personal information to any third
          party for their marketing purposes.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Share Your Information",
    content: (
      <p>
        We share your information only with third-party service providers
        directly involved in fulfilling your booking — including hotels,
        transport operators, airlines, and local guides — and only to the extent
        necessary to complete your travel arrangements. All such parties are
        required to handle your information securely and only for the purpose it
        was shared.
      </p>
    ),
  },
  {
    title: "4. Cookies",
    content: (
      <p>
        Our website uses cookies to improve your browsing experience and analyse
        site traffic. Cookies are small text files stored on your device. You
        can choose to disable cookies in your browser settings, though this may
        affect the functionality of certain parts of the website. By continuing
        to use our site, you consent to our use of cookies.
      </p>
    ),
  },
  {
    title: "5. Data Storage & Security",
    content: (
      <p>
        Your data is stored securely using Supabase infrastructure. We implement
        industry-standard security measures to protect your personal information
        from unauthorised access, disclosure, or misuse. However, no data
        transmission over the internet is completely secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <p>
        We retain your personal information for as long as necessary to fulfil
        the purposes described in this policy or as required by applicable law.
        You may request deletion of your account and associated data at any time
        by contacting us at the details below.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for marketing communications at any time</li>
        </ul>
        <p className="mt-2">
          To exercise any of these rights, please contact us at
          info@teacountryholidays.com.
        </p>
      </>
    ),
  },
  {
    title: "8. Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites such as social
        media platforms or partner services. We are not responsible for the
        privacy practices of those websites and encourage you to review their
        respective privacy policies.
      </p>
    ),
  },
  {
    title: "9. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with a revised date. Continued use of our website
        after changes are posted constitutes acceptance of the updated policy.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#fafaf7] min-h-screen">
      {/* Header */}
      <section className="bg-[#1a3c2e] py-16 px-4 text-center">
        <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
          Privacy Policy
        </h1>
        <p className="text-green-200 mt-3 text-sm">
          Last updated: June 2026
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-14 text-gray-700">

        <p className="mb-8 text-base leading-relaxed">
          Tea Country Holidays (operated by SSB Media Pvt. Ltd.) is committed to
          protecting your privacy. This policy explains what personal information
          we collect, how we use it, and how we keep it safe when you use our
          website or book a service with us.
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
          For any privacy-related concerns, contact us at{" "}
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
          <Link href="/terms" className="text-[#1a3c2e] underline">
            View our Terms &amp; Conditions →
          </Link>
        </div>
      </section>
    </main>
  );
}
