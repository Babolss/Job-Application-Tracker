import { Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="font-inter min-h-screen flex flex-col" style={{ backgroundColor: "#0F1117" }}>
      {/* Background effects */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108,99,255,0.15), transparent)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center px-8 h-16">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6C63FF, #4F46E5)" }}
          >
            <Briefcase size={14} className="text-white" />
          </div>
          <span className="text-base font-bold text-[#F1F5F9] tracking-tight">
            Trackify
          </span>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center pb-24">
        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{
            backgroundColor: "rgba(108,99,255,0.12)",
            border: "1px solid rgba(108,99,255,0.3)",
            color: "#A89CFF",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#6C63FF" }}
          />
          Free for job seekers
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F1F5F9] leading-none tracking-tight mb-5">
          Trackify
        </h1>
        <p className="text-xl sm:text-2xl text-[#94A3B8] mb-4 font-normal">
          Your job search,{" "}
          <span className="font-semibold" style={{ color: "#A89CFF" }}>
            organized.
          </span>
        </p>
        <p className="text-sm text-[#94A3B8]/70 max-w-sm mb-10 leading-relaxed">
          Stop losing track of where you applied. Kanban-style tracking,
          deadline alerts, and interview notes — all in one place.
        </p>

        {/* Auth card 
        <div
          className="w-full max-w-sm rounded-2xl p-6"
          style={{
            backgroundColor: "#1A1D27",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          <h2 className="text-base font-semibold text-[#F1F5F9] mb-5 text-left">
            Sign in to continue
          </h2>

          <button
            className="w-full flex items-center justify-center gap-3 rounded-lg py-2.5 px-4 text-sm font-medium text-[#F1F5F9] transition-all hover:opacity-90 active:scale-95 mb-3"
            style={{
              backgroundColor: "#242838",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs text-[#94A3B8]">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg px-3 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50"
              style={{
                backgroundColor: "#242838",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #6C63FF, #4F46E5)" }}
            >
              Continue with Email
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="text-xs text-[#94A3B8]/50 text-center mt-4">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>*/}
      
       <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
        </ClerkProvider>
      

        <p className="mt-8 text-xs text-[#94A3B8]/40">
          Trusted by 12,000+ job seekers in active searches
        </p>
      </main>
    </div>
  );
}
