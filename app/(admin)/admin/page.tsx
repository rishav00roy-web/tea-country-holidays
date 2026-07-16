import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { 
  Briefcase, 
  Hotel, 
  FileText, 
  HelpCircle, 
  Star,
  AlertTriangle,
  ArrowRight 
} from "lucide-react";

export const revalidate = 0; // Disable caching so it always shows the latest counts

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts from the tables in parallel
  const [packagesRes, hotelsRes, blogsRes, faqsRes, reviewsRes] = await Promise.all([
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("hotels").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
  ]);

  const errors: string[] = [];
  if (packagesRes.error) errors.push(`Packages: ${packagesRes.error.message}`);
  if (hotelsRes.error) errors.push(`Hotels: ${hotelsRes.error.message}`);
  if (blogsRes.error) errors.push(`Blogs: ${blogsRes.error.message}`);
  if (faqsRes.error) errors.push(`FAQs: ${faqsRes.error.message}`);
  if (reviewsRes.error) errors.push(`Reviews: ${reviewsRes.error.message}`);

  const stats = [
    {
      name: "Total Packages",
      count: packagesRes.count ?? 0,
      href: "/admin/packages",
      icon: Briefcase,
      description: "Manage tours, pricing, and details",
      color: "from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200 hover:border-emerald-300",
      iconColor: "text-emerald-600 bg-emerald-100",
    },
    {
      name: "Total Hotels",
      count: hotelsRes.count ?? 0,
      href: "/admin/hotels",
      icon: Hotel,
      description: "Manage stays, ratings, and rates",
      color: "from-amber-50 to-orange-50 text-amber-800 border-amber-200 hover:border-amber-300",
      iconColor: "text-[#F4A011] bg-amber-100",
    },
    {
      name: "Total Blogs",
      count: blogsRes.count ?? 0,
      href: "/admin/blogs",
      icon: FileText,
      description: "Manage travel stories and updates",
      color: "from-blue-50 to-indigo-50 text-blue-800 border-blue-200 hover:border-blue-300",
      iconColor: "text-blue-600 bg-blue-100",
    },
    {
      name: "Total FAQs",
      count: faqsRes.count ?? 0,
      href: "/admin/faqs",
      icon: HelpCircle,
      description: "Manage help questions and answers",
      color: "from-purple-50 to-fuchsia-50 text-purple-800 border-purple-200 hover:border-purple-300",
      iconColor: "text-purple-600 bg-purple-100",
    },
    {
      name: "Total Reviews",
      count: reviewsRes.count ?? 0,
      href: "/admin/reviews",
      icon: Star,
      description: "Manage customer reviews and approval",
      color: "from-pink-50 to-rose-50 text-rose-800 border-rose-200 hover:border-rose-300",
      iconColor: "text-rose-600 bg-rose-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome to the Tea Country Holidays management console. Overview of your site content.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="p-4 bg-amber-50/70 border border-amber-200 text-amber-900 rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Database Connection / RLS Warnings</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Some counts could not be loaded because of database schema or permission issues. Falling back to 0.
          </p>
          <ul className="list-disc list-inside text-xs space-y-1 font-mono opacity-90 pl-1">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className={`block bg-gradient-to-br ${stat.color} border rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-lg ${stat.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-extrabold tracking-tight">{stat.count}</span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">{stat.name}</h3>
                <p className="text-xs opacity-75 mt-1">{stat.description}</p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold opacity-90 group-hover:opacity-100 group-hover:gap-2 transition-all">
                <span>Manage</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Start Guide Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 mt-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-gold" />
          Owner's Quick Start Guide
        </h2>
        
        <div className="space-y-6 text-sm text-slate-600">
          <div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">1. Adding your first Tour Package</h3>
            <p>
              Navigate to the <strong>Packages</strong> section. Click "Add New Package". 
              Fill in the title, destination, duration, and price. 
              <strong> Important:</strong> Check the "Is Featured" box if you want this package to appear on the front page of the website! 
              Ensure you upload a high-quality cover image.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">2. Managing Hotels & Stays</h3>
            <p>
              Under the <strong>Hotels</strong> tab, you can list partner hotels. 
              Be sure to include the correct star rating and a brief, compelling description.
              These hotels will be visible to users browsing for accommodations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">3. Publishing Blog Posts</h3>
            <p>
              Use the <strong>Blogs</strong> section to write travel guides, company news, or destination highlights.
              When writing a blog, the "Slug" is automatically generated from the title (e.g. <code>my-first-post</code>), which forms the URL. 
              Once published, it will immediately be live on the <code>/blog</code> page.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-amber-900">
            <h4 className="font-semibold flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Note on Data Sync
            </h4>
            <p className="mt-1">
              Whenever you create, edit, or delete an item from this dashboard, the changes are instantly pushed to the live website. There is no need to manually refresh or redeploy the site.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Info Section */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-[#1B4332] text-lg">Need to update other settings?</h4>
          <p className="text-slate-500 text-sm mt-0.5">
            Configure global website settings, phone numbers, email notifications, and review lists from the settings panel.
          </p>
        </div>
        <Link
          href="/admin/settings"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm text-center"
        >
          Go to Settings
        </Link>
      </div>
    </div>
  );
}
