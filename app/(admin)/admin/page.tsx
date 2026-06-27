import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { 
  Briefcase, 
  Hotel, 
  FileText, 
  HelpCircle, 
  ArrowRight 
} from "lucide-react";

export const revalidate = 0; // Disable caching so it always shows the latest counts

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts from the tables in parallel
  const [packagesRes, hotelsRes, blogsRes, faqsRes] = await Promise.all([
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("hotels").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
  ]);

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
