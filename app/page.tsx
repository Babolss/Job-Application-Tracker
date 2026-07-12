import { Briefcase } from "lucide-react";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { BrutalBtn } from "@/components/ui/BrutalBtn";
import { neobrutalism } from "@clerk/ui/themes";

export default function Home() {
  return (
    <div className="bg-[#FFFBE6] overflow-hidden font-inter min-h-screen flex flex-col">
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
      <nav className="bg-white border-b-4 border-black px-8 h-16 flex items-center justify-between sticky top-0 z-100">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6C63FF, #4F46E5)" }}
          >
            <Briefcase size={14} className="text-white" />
          </div>
          <span className="font-black text-2xl tracking-[-1px] text-[#0A0A0A]">
            TRACK<span className="text-[#6C63FF">IFY</span>
          </span>
        </div>
        <ClerkProvider>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <BrutalBtn color={"bg-white"}>Sign In</BrutalBtn>
              </SignInButton>
              <SignUpButton>
                <BrutalBtn>Sign Up</BrutalBtn>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton 
              appearance={{
          theme: neobrutalism,
          
        }}/>
            </Show>
          </div>
        </ClerkProvider>
      </nav>

      {/* Hero */}
      <main className="">
        {/* Pill badge */}

        {/* Hero */}
        <section
          className="hero-section"
          style={{
            padding: "72px 32px 64px",
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#6C63FF",
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                padding: "6px 14px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#FFD600",
                  border: `2px solid #000000`,
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.09em",
                  color: "#fff",
                }}
              >
                Free Job Tracker
              </span>
            </div>
            <h1
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
                lineHeight: 1.0,
                letterSpacing: "-3px",
                margin: "0 0 24px",
                color: "#0A0A0A",
              }}
            >
              YOUR JOB
              <br />
              SEARCH,{" "}
              <span
                style={{
                  background: "#FFD600",
                  border: "3px solid #000",
                  padding: "0 8px",
                  display: "inline-block",
                  transform: "rotate(-1.5deg)",
                  boxShadow: "4px 4px 0px #000",
                  color: "#000",
                }}
              >
                BRUTALLY
              </span>
              <br />
              ORGANIZED.
            </h1>

            <p
              style={{
                fontWeight: 500,
                fontSize: "1.05rem",
                color: "#666666",
                lineHeight: 1.7,
                margin: "0 0 36px",
                maxWidth: "400px",
              }}
            >
              Stop losing track of applications in spreadsheets. Trackify gives
              you a kanban board, real-time stats, and zero fluff — just
              results.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap" as const,
              }}
            >
              <ClerkProvider>
                <SignUpButton>
                  <BrutalBtn color="bg-white p-[15px 32px] text-[1rem]">
                    Get Started Free
                  </BrutalBtn>
                </SignUpButton>
                <SignInButton>
                  <BrutalBtn s="p-[15px 32px] text-[1rem]">
                    Sign In →
                  </BrutalBtn>
                </SignInButton>
              </ClerkProvider>
            </div>

            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "36px",
                flexWrap: "wrap" as const,
              }}
            >
              {[
                ["2,400+", "Jobs tracked"],
                ["84%", "Avg response rate clarity"],
                ["Free", "Always"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "1.4rem",
                      margin: 0,
                      color: "#000",
                    }}
                  >
                    {v}
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.07em",
                      margin: "2px 0 0",
                      color: "#666666",
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: mock dashboard */}
          <div style={{ position: "relative" as const }}>
            <div
              style={{
                position: "absolute" as const,
                inset: 0,
                background: "#000000",
                transform: "translate(10px, 10px)",
              }}
            />
            <div
              style={{
                background: "#FFFFFF",
                border: "3px solid #000000",
                padding: "24px",
                position: "relative" as const,
              }}
            >
              <div
                style={{
                  borderBottom: `3px solid ${"#000000"}`,
                  marginBottom: "18px",
                  paddingBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: "1rem",
                    letterSpacing: "-0.5px",
                    color: "#000",
                  }}
                >
                  TRACK<span style={{ color: "#6C63FF" }}>IFY</span>
                </span>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    background: "#6C63FF",
                    border: "3px solid #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    color: "#fff",
                  }}
                >
                  A
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                {(
                  [
                    ["8", "#6C63FF", "#fff", "Total"],
                    ["2", "#FFD600", "#000", "Interviews"],
                    ["1", "#00C897", "#000", "Offers"],
                    ["63%", "#ffffff", "#000000", "Rate"],
                  ] as const
                ).map(([v, bg, fg, l]) => (
                  <div
                    key={l}
                    style={{
                      background: bg,
                      border: "3px solid #000000",
                      padding: "10px 8px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        margin: 0,
                        color: fg,
                      }}
                    >
                      {v}
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "0.6rem",
                        textTransform: "uppercase" as const,
                        margin: "2px 0 0",
                        color: fg,
                        opacity: 0.75,
                      }}
                    >
                      {l}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {(
                  [
                    [
                      "Applied",
                      "#6C63FF",
                      "#fff",
                      ["Stripe", "Notion", "Framer"],
                    ],
                    ["Interview", "#FFD600", "#000", ["Vercel", "Loom"]],
                  ] as const
                ).map(([col, bg, fg, items]) => (
                  <div key={col}>
                    <div
                      style={{
                        background: bg,
                        border: "3px solid #000000",
                        padding: "5px 8px",
                        marginBottom: "6px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "0.62rem",
                          textTransform: "uppercase" as const,
                          color: fg,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {col}
                      </span>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "0.62rem",
                          color: fg,
                        }}
                      >
                        {(items as readonly string[]).length}
                      </span>
                    </div>
                    {(items as readonly string[]).map((company) => (
                      <div
                        key={company}
                        style={{
                          background: "#FFFFFF",
                          border: "3px solid #000000",
                          borderLeft: `4px solid ${bg}`,
                          padding: "7px 8px",
                          marginBottom: "5px",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 800,
                            fontSize: "0.72rem",
                            margin: 0,
                            color: "#0A0A0A",
                          }}
                        >
                          {company}
                        </p>
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: "0.62rem",
                            color: "#6B7280",
                            margin: "2px 0 0",
                          }}
                        >
                          Software Engineer
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="mt-8 text-xs text-[#94A3B8]/40">
          Trusted by 12,000+ job seekers in active searches
        </p>
      </main>
    </div>
  );
}
