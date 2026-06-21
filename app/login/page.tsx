import type { Metadata } from "next"
import LoginContent from "./login-content"

export const metadata: Metadata = {
  title: "Join Tea Country Holidays | Login & Register",
  description: "Sign in or create a free account with Tea Country Holidays to manage your bookings, browse custom tour packages, and plan your trips.",
  keywords: ["login", "sign up", "register", "travel portal login", "Tea Country account"],
}

export default function AuthPage() {
  return <LoginContent />
}
