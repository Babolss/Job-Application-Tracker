import { useState } from "react";
import { BarChart2, Briefcase } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import type { View } from "../lib/types";

export function Navbar({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (v: View) => void;
}) {
  const C = {
    bg: "#FFFBE6",
    surface: "#FFFFFF",
    input: "#FFFBE6",
    text: "#0A0A0A",
    gray: "#666666",
    purple: "#6C63FF",
    yellow: "#FFD600",
    mint: "#00C897",
    coral: "#FF6B6B",
    black: "#000000",
    ink: "#000000",
    bd: "3px solid #000",
    bd2: "2px solid #000",
    sh: "4px 4px 0px #000",
    shSm: "2px 2px 0px #000",
    shLg: "6px 6px 0px #000",
    cream: "#FFFBE6",
    white: "#FFFFFF",
  };

  const navItems = [
    {
      id: "dashboard" as View,
      label: "Dashboard",
      icon: <Briefcase size={15} />,
    },
    { id: "stats" as View, label: "Stats", icon: <BarChart2 size={15} />},
  ];

  const [hov, setHov] = useState<View | null>(null);

  return (
    <nav
      style={{
        background: C.surface,
        borderBottom: `4px solid ${C.ink}`,
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky" as const,
        top: 0,
        zIndex: 100,
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            fontWeight: 900,
            fontSize: "1.45rem",
            letterSpacing: "-1px",
            color: C.text,
          }}
        >
          TRACK<span style={{ color: C.purple }}>IFY</span>
        </span>
      </button>

      

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        <div className="flex items-center gap-3">
        {navItems.map((item) => {
          const active = view === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className=""
              onMouseEnter={() => setHov(item.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: active ? C.purple : hov === item.id ? C.bg : "transparent",
                color: active ? "#fff" : C.text,
                border: active ? C.bd : `2px solid transparent`,
                padding: "6px 12px",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "background 0.1s, color 0.1s",
              }}
            >
              <span style={{ color: active ? "#FFFFFF" : "#94A3B8" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: {
                backgroundColor: "#FFFBE6",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                borderRadius: "4px",
              },
              userButtonPopoverActionButton: {
                fontWeight: 700,
                borderRadius: "2px",
                color: "#0A0A0A",
              },
              userButtonPopoverActionButton__signOut: {
                color: "#FF6B6B",
              },
              userButtonPopoverActionButtonText: {
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                color: "#0A0A0A",
              },
              userButtonPopoverActionButtonText__signOut: {
                color: "#FF6B6B",
              },
              userButtonPopoverActionButtonIcon: {
                color: "#0A0A0A",
              },
              userButtonPopoverActionButtonIcon__signOut: {
                color: "#FF6B6B",
              },
              userButtonPopoverFooter: {
                borderTop: "2px solid #000000",
              },
              userPreviewMainIdentifier: {
                fontWeight: 900,
                color: "#0A0A0A",
              },
              userPreviewSecondaryIdentifier: {
                color: "#666666",
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
