import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function BlogSlugLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full bg-[#1a2e0f] animate-pulse" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        {/* Back Link Skeleton */}
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Header metadata */}
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded-md w-24" />
            <div className="h-4 bg-gray-200 rounded-md w-20" />
            <div className="h-4 bg-gray-200 rounded-md w-24" />
          </div>
          
          {/* Title */}
          <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-10" />

          {/* Paragraphs */}
          <div className="space-y-4 pt-4">
            <div className="h-4 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-5/6" />
            <div className="h-4 bg-gray-200 rounded-md w-4/5" />
          </div>

          <div className="space-y-4 pt-6">
            <div className="h-4 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-11/12" />
            <div className="h-4 bg-gray-200 rounded-md w-5/6" />
          </div>
        </div>

        {/* CTA box skeleton */}
        <div className="mt-16 bg-[#1a2e0f]/10 rounded-2xl p-8 space-y-4">
          <div className="h-8 bg-gray-200 rounded-md w-1/2 mx-auto" />
          <div className="h-4 bg-gray-200 rounded-md w-3/4 mx-auto" />
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto mt-4" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
