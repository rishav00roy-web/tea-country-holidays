import Link from "next/link"

export default function LoginLoading() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] flex animate-pulse">
      {/* Left side */}
      <div className="flex-1 flex flex-col justify-center padding-auth max-w-[540px] mx-auto px-6">
        <div className="mb-8">
          <div className="h-4 bg-gray-200 rounded-md w-48" />
        </div>

        <div className="space-y-6">
          <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-8" />

          {/* Form inputs skeletons */}
          <div className="space-y-4">
            <div>
              <div className="h-3 bg-gray-200 rounded-md w-16 mb-2" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded-md w-16 mb-2" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
          </div>

          <div className="h-12 bg-gray-200 rounded-lg w-full mt-6" />
          
          <div className="h-4 bg-gray-200 rounded-md w-1/4 mx-auto mt-4" />
        </div>
      </div>

      {/* Right side - hidden on small screens */}
      <div className="hidden lg:block flex-1 bg-[#013220]/20" />
    </main>
  )
}
