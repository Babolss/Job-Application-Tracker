"use client";

import { Bell, Briefcase, LayoutDashboard, LineChart } from "lucide-react";
import type { View } from "../lib/types";

export function Navbar({
  view,
  onNavigate,
  notifCount,
}: {
  view: View;
  onNavigate: (v: View) => void;
  notifCount: number;
}) {
  const navItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: <LayoutDashboard size={14} /> },
    { id: "stats" as View, label: "Analytics", icon: <LineChart size={14} /> },
  ];

  return (
    <header
      className="h-14 flex items-center px-6 sticky top-0 z-30 gap-6"
      style={{
        backgroundColor: "rgba(15,17,23,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex items-center gap-2 shrink-0"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6C63FF, #4F46E5)" }}
        >
          <Briefcase size={14} className="text-white" />
        </div>
        <span className="text-base font-bold text-[#F1F5F9] tracking-tight">
          Trackify
        </span>
      </button>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                color: active ? "#F1F5F9" : "#94A3B8",
                backgroundColor: active ? "rgba(108,99,255,0.15)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
              }}
            >
              <span style={{ color: active ? "#6C63FF" : "#94A3B8" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 ml-auto">
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 transition-colors"
          title="Notifications"
        >
          <Bell size={16} />
          {notifCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ backgroundColor: "#EF4444" }}
            />
          )}
        </button>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
          style={{ background: "linear-gradient(135deg, #6C63FF, #8B5CF6)" }}
        >
          JS
        </button>
      </div>
    </header>
  );
}
