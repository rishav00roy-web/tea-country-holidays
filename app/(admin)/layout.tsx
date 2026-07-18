import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { 
  LayoutDashboard, 
  Briefcase, 
  Hotel, 
  FileText, 
  HelpCircle, 
  Star, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporarily bypass auth check for screenshot generation
  if (process.env.SCREENSHOT_MODE !== "true") {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      redirect("/login?redirect=/admin");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile || !profile.is_admin) {
      redirect("/");
    }
  }

  // Server Action to handle Sign Out
  async function handleSignOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Packages", href: "/admin/packages", icon: Briefcase },
    { name: "Hotels", href: "/admin/hotels", icon: Hotel },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-[#1B4332] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-wide text-[#F4A011]">Tea Country</span>
          <span className="text-xs uppercase tracking-widest opacity-80 text-white">Admin Panel</span>
        </div>
        <label htmlFor="sidebar-toggle" className="p-2 cursor-pointer hover:bg-[#235640] rounded transition-colors">
          <Menu className="w-6 h-6" />
        </label>
      </div>

      {/* Hidden Checkbox for Sidebar Toggle on Mobile */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Overlay to close sidebar on Mobile click outside */}
      <label 
        htmlFor="sidebar-toggle" 
        className="fixed inset-0 bg-black/60 z-40 hidden peer-checked:block md:hidden transition-opacity duration-300"
      />

      {/* Sidebar Navigation */}
      <aside className="fixed md:sticky top-0 bottom-0 left-0 z-50 w-[240px] bg-[#1B4332] text-white flex flex-col justify-between transition-transform duration-300 transform -translate-x-full peer-checked:translate-x-0 md:translate-x-0 h-screen shadow-xl border-r border-[#235640]">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#235640]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wide text-[#F4A011]">Tea Country</span>
              <span className="text-xs uppercase tracking-widest opacity-80 text-slate-300">Holidays Admin</span>
            </div>
            {/* Close button inside sidebar for mobile */}
            <label htmlFor="sidebar-toggle" className="md:hidden p-1.5 cursor-pointer hover:bg-[#235640] rounded transition-colors">
              <X className="w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white hover:bg-[#235640] transition-all duration-200 group font-medium"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#F4A011] transition-colors" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Sign Out */}
        <div className="p-4 border-t border-[#235640]">
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:text-white hover:bg-red-900/40 transition-all duration-200 font-medium text-left cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-white" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white min-h-screen p-6 md:p-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
