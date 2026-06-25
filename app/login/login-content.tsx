"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@/lib/supabase";
import { Mail, Lock, User } from "lucide-react";

const authDestinations = [
  {
    name: "Rajasthan",
    image: "/images/photo-1599661046289-e31897846e41.jpg",
    tagline: "Land of forts, palaces, and golden desert sunsets."
  },
  {
    name: "Kashmir",
    image: "/images/photo-1587474260584-136574528ed5.jpg",
    tagline: "Paradise on earth — valleys, lakes, and snow-capped peaks."
  },
  {
    name: "Kerala",
    image: "/images/photo-1602216056096-3b40cc0c9944.jpg",
    tagline: "Backwaters, spice gardens, and tranquil hill stations."
  },
  {
    name: "Goa",
    image: "/images/photo-1512343879784-a960bf40e7f2.jpg",
    tagline: "Sun, sea, and the most vibrant culture in India."
  },
  {
    name: "Himachal",
    image: "https://images.unsplash.com/photo-1616388969587-8196f32388b4?w=1600&q=80",
    tagline: "Mountain trails, pine forests, and crisp Himalayan air."
  },
  {
    name: "Maldives",
    image: "/images/photo-1514282401047-d79a71a590e8.jpg",
    tagline: "Overwater villas, turquoise lagoons, and pure serenity."
  },
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=1600&q=80",
    tagline: "Where the desert meets the future."
  },
  {
    name: "Bali",
    image: "/images/photo-1537996194471-e657df975ab4.jpg",
    tagline: "Ancient temples, lush rice terraces, and warm sunsets."
  },
];

export default function LoginContent() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // Create Supabase client directly here to avoid any module-level
  // initialisation timing issues with the shared singleton
  const supabase = createBrowserClient();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % authDestinations.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // guard against double-submit
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
            data: {
              full_name: name,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          // Check if Supabase auto-confirmed the session (when email confirm is disabled)
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => {
              router.push(redirect);
              router.refresh();
            }, 1000);
          } else {
            setSuccess("Account created! Check your email for a confirmation link.");
          }
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
        } else {
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => {
            router.push(redirect);
            router.refresh();
          }, 1000);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      // Always release the loading state so the button never stays stuck
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setIsLoading(false);
      }
      // Note: on success Supabase redirects the browser away, so we
      // intentionally do NOT call setIsLoading(false) here — keeping the
      // button showing "Please wait..." while the redirect is in-flight
      // gives the user clear feedback that something is happening.
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred during Google sign-in.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .auth-container {
          display: flex;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background-color: #faf8f3;
          color: #1a1a2e;
        }

        .auth-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 2.5rem;
          max-width: 540px;
          margin: 0 auto;
          animation: fadeIn 0.6s ease-in-out;
        }

        .auth-right {
          flex: 1.2;
          position: relative;
          background-color: #013220;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .auth-right {
            display: none;
          }
        }

        .auth-slide {
          position: absolute;
          inset: 0;
          transition: opacity 1s ease-in-out;
          display: flex;
          align-items: flex-end;
          padding: 4rem;
        }

        .auth-image {
          object-fit: cover;
          opacity: 0.65;
        }

        .auth-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(1, 50, 32, 0.95) 0%, rgba(1, 50, 32, 0.4) 50%, rgba(1, 50, 32, 0.2) 100%);
        }

        .auth-right-content {
          position: relative;
          z-index: 10;
          color: #faf8f3;
        }

        .auth-title-serif {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .auth-tagline {
          font-size: 1.1rem;
          font-style: italic;
          letter-spacing: 0.05em;
          opacity: 0.9;
          border-left: 2px solid #D4AF37;
          padding-left: 1rem;
          line-height: 1.5;
        }

        .brand-header {
          margin-bottom: 2rem;
        }

        .brand-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #2d5a27;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s;
        }

        .brand-link:hover {
          transform: translateX(-4px);
        }

        .auth-form-card {
          width: 100%;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #2d5a27;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: rgba(26, 26, 46, 0.6);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #2d5a27;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(45, 90, 39, 0.5);
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 1px solid rgba(45, 90, 39, 0.2);
          border-radius: 0.5rem;
          background-color: #ffffff;
          color: #1a1a2e;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
          border-color: #2d5a27;
          box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          background-color: #2d5a27;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 4px 6px -1px rgba(45, 90, 39, 0.15);
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #1f3f1b;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .oauth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.5rem 0;
          color: rgba(26, 26, 46, 0.4);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .oauth-divider::before,
        .oauth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(26, 26, 46, 0.1);
        }

        .oauth-divider:not(:empty)::before {
          margin-right: .75em;
        }

        .oauth-divider:not(:empty)::after {
          margin-left: .75em;
        }

        .google-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: #ffffff;
          color: #1a1a2e;
          border: 1px solid rgba(26, 26, 46, 0.15);
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .google-btn:hover:not(:disabled) {
          background-color: #faf8f3;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .google-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .toggle-link {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: rgba(26, 26, 46, 0.6);
        }

        .toggle-link span {
          color: #2d5a27;
          font-weight: 700;
          cursor: pointer;
        }

        .toggle-link span:hover {
          text-decoration: underline;
        }

        .alert-message {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .alert-success {
          background-color: rgba(45, 90, 39, 0.1);
          color: #2d5a27;
          border: 1px solid rgba(45, 90, 39, 0.2);
        }

        .alert-error {
          background-color: rgba(232, 35, 42, 0.1);
          color: #e8232a;
          border: 1px solid rgba(232, 35, 42, 0.2);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="auth-container">
        {/* Left Side - Auth Forms */}
        <div className="auth-left">
          <div className="brand-header">
            <Link href="/" className="brand-link">
              <span>← Back to Tea Country Holidays</span>
            </Link>
          </div>

          <div className="auth-form-card">
            <h2 className="form-title">
              {mode === "signup" ? "Trusted by Travellers Across India." : "Welcome Back"}
            </h2>
            <p className="form-subtitle">
              {mode === "signup"
                ? "Create a free account to browse packages, compare tours, and book with confidence."
                : "Sign in to continue planning your next adventure with Tea Country Holidays."}
            </p>

            {error && <div className="alert-message alert-error">{error}</div>}
            {success && <div className="alert-message alert-success">{success}</div>}

            <form onSubmit={handleAuth} noValidate>
              {mode === "signup" && (
                <div className="form-group">
                  <label htmlFor="auth-name" className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      autoCorrect="on"
                      spellCheck={true}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="auth-email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="auth-password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    id="auth-password"
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="oauth-divider">or</div>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.87-4.53-5.01-4.53z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="toggle-link">
              {mode === "signup" ? (
                <span onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}>
                  Already have an account? Sign in →
                </span>
              ) : (
                <span onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}>
                  New here? Create a free account →
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Side - Image Panel with Slideshow */}
        <div className="auth-right">
          {authDestinations.map((place, idx) => (
            <div
              key={place.name}
              className="auth-slide"
              style={{
                opacity: idx === currentSlide ? 1 : 0,
                pointerEvents: idx === currentSlide ? "auto" : "none",
                zIndex: idx === currentSlide ? 10 : 0
              }}
            >
              <Image
                src={place.image}
                alt={place.name}
                fill
                unoptimized
                className="auth-image"
                priority={idx === 0}
              />
              <div className="auth-overlay" />
              <div className="auth-right-content">
                <h1 className="auth-title-serif">Discover {place.name}</h1>
                <p className="auth-tagline">{place.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
