"use client";

import { BarChart2, Briefcase, CheckCircle2, Search, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { KanbanColumn } from "@/components/JobCard";
import type { Job, Status } from "@/lib/types";
import { COLUMNS } from "@/lib/types";

const jobs: Job[] = [
  {
    id: "1",
    company: "Nova Labs",
    role: "Senior Frontend Engineer",
    status: "applied",
    dateApplied: "2026-06-24",
    deadline: "Jun 30",
  },
  {
    id: "2",
    company: "Northstar",
    role: "Product Designer",
    status: "applied",
    dateApplied: "2026-06-23",
    deadline: "Jul 1",
  },
  {
    id: "3",
    company: "Acme Analytics",
    role: "Data Analyst",
    status: "interview",
    dateApplied: "2026-06-19",
    deadline: "Jul 3",
  },
  {
    id: "4",
    company: "Platformly",
    role: "Platform Engineer",
    status: "interview",
    dateApplied: "2026-06-20",
    deadline: "Jul 2",
  },
  {
    id: "5",
    company: "Orbit Stack",
    role: "Staff Full Stack Engineer",
    status: "offer",
    dateApplied: "2026-06-10",
    deadline: "Jul 5",
  },
  {
    id: "6",
    company: "Brightside",
    role: "QA Engineer",
    status: "rejected",
    dateApplied: "2026-06-08",
    deadline: "Closed",
  },
];

export default function DashboardPage() {
  const stats = useMemo(
    () => [
      { label: "Total Applications", value: jobs.length.toString(), icon: Briefcase, color: "#6C63FF" },
      { label: "Interviews Scheduled", value: jobs.filter((job) => job.status === "interview").length.toString(), icon: BarChart2, color: "#3B82F6" },
      { label: "Offers Received", value: jobs.filter((job) => job.status === "offer").length.toString(), icon: CheckCircle2, color: "#22C55E" },
      { label: "Response Rate", value: "71%", icon: TrendingUp, color: "#F59E0B" },
    ],
    []
  );

  const jobsByStatus = useMemo(
    () =>
      COLUMNS.reduce<Record<Status, Job[]>>(
        (accumulator, status) => {
          accumulator[status] = jobs.filter((job) => job.status === status);
          return accumulator;
        },
        { applied: [], interview: [], offer: [], rejected: [] }
      ),
    []
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">My Applications</h1>
          <p className="text-sm text-[#94A3B8] mt-0.5">{jobs.length} total applications, updated just now</p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#94A3B8]" style={{ backgroundColor: "#1A1D27", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Search size={14} />
          <span>Search applications...</span>
        </div>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl p-5 flex items-center gap-4"
              style={{ backgroundColor: "#1A1D27", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${stat.color}18`, color: stat.color }}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F1F5F9]">{stat.value}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobsByStatus[status]}
            onCardClick={(job) => {
              window.alert(`${job.company} - ${job.role}`);
            }}
          />
        ))}
      </section>
    </main>
  );
}
