import type { Metadata } from "next"
import { Suspense } from "react"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import LoginContent from "./login-content"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Join Tea Country Holidays | Login & Register",
  description: "Sign in or create a free account with Tea Country Holidays to manage your bookings, browse custom tour packages, and plan your trips.",
  keywords: ["login", "sign up", "register", "travel portal login", "Tea Country account"],
  alternates: {
    canonical: "/login",
  },
}

export default function AuthPage() {
  return (
    <main className={`${cormorant.variable} ${dmSans.variable} min-h-screen`}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  )
}
