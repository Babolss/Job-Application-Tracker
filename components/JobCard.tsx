"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { STATUS_CONFIG, COLUMNS, formatDate } from "../lib/types";
import type { Job, Status } from "../lib/types";
import { DeadlineBadge } from "./shared";

// ─── JobCard (Kanban tile) ────────────────────────────────────────────────────

export function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  const cfg = STATUS_CONFIG[job.status];
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl p-4 transition-all duration-150 group"
      style={{
        backgroundColor: "#1A1D27",
        borderLeft: `3px solid ${cfg.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#1E2233";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1D27";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9] leading-tight">
            {job.company}
          </p>
          <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{job.role}</p>
        </div>
        <ArrowRight
          size={14}
          className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-[#94A3B8] flex items-center gap-1">
          <Calendar size={10} />
          {formatDate(job.dateApplied)}
        </span>
        <DeadlineBadge deadline={job.deadline} />
      </div>
    </button>
  );
}

// ─── KanbanColumn ─────────────────────────────────────────────────────────────

export function KanbanColumn({
  status,
  jobs,
  onCardClick,
}: {
  status: Status;
  jobs: Job[];
  onCardClick: (job: Job) => void;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div
      className="flex flex-col rounded-xl"
      style={{ backgroundColor: "#161820", minHeight: 480 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: cfg.color }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            {cfg.label}
          </span>
        </div>
        <span
          className="text-xs font-medium rounded-full px-2 py-0.5"
          style={{ color: cfg.color, backgroundColor: cfg.bg }}
        >
          {jobs.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-3 flex-1">
        {jobs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-center text-[#94A3B8]/50 leading-relaxed px-4">
              No applications here yet —{"\n"}add one to get started
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onCardClick(job)} />
          ))
        )}
      </div>
    </div>
  );
}

// Re-export COLUMNS so DashboardPage doesn't need a separate import
export { COLUMNS };
